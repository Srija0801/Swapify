import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, Star, Upload } from "lucide-react";
import { useAuth } from "../AuthContext";
import { userApi } from "../api/userApi";
import Icon from "../components/layouts/Icon";
import AvatarUpload from "../components/setupprofile/AvatarUpload";
import BioSection from "../components/setupprofile/BioSection";
import TeachingSkillsSection from "../components/setupprofile/TeachingSkillsSection";
import LearningSkillsSection from "../components/setupprofile/LearningSkillsSection";

export default function SetupProfile() {
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [allSkills, setAllSkills] = useState([]);
  const [teachingSkills, setTeachingSkills] = useState([]);
  const [learningSkills, setLearningSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showTeachingDropdown, setShowTeachingDropdown] = useState(false);
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);
  const [searchTeaching, setSearchTeaching] = useState("");
  const [searchLearning, setSearchLearning] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
  try {
    const res = await userApi.getAllSkills();
    console.log("getAllSkills response:", res);
    const list = Array.isArray(res) ? res : res?.skills || [];
    setAllSkills(list);
  } catch (err) {
    console.error("Error loading skills:", err);
  }
};

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "avatar_upload");

    try {
      setSubmitting(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddo93ak3d/auto/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message);

      setAvatarUrl(data.secure_url);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const updateProficiency = (skillId, proficiency) => {
    setTeachingSkills(
      teachingSkills.map((s) =>
        s.skill._id === skillId ? { ...s, proficiency } : s
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teachingSkills.length === 0 || learningSkills.length === 0) {
      alert("Add at least one skill to teach and one to learn.");
      return;
    }

    try {
      setSubmitting(true);

      const defaultAvatar =
        avatarUrl ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?._id}`;

      const updatedUser = await userApi.updateProfile({
        bio,
        avatar_url: defaultAvatar,
      });

      setUser(updatedUser);

      const skillsToAdd = [
        ...teachingSkills.map(({ skill, proficiency }) => ({
          skill: skill._id,
          skill_type: "teaching",
          proficiency,
        })),
        ...learningSkills.map((skill) => ({
          skill: skill._id,
          skill_type: "learning",
          proficiency: 1,
        })),
      ];

      for (const skill of skillsToAdd) {
        await userApi.addUserSkill(skill);
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Error setting up profile.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Icon />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AvatarUpload
              user={user}
              avatarUrl={avatarUrl}
              handleAvatarChange={handleAvatarChange}
            />

            <BioSection bio={bio} setBio={setBio} />

            <TeachingSkillsSection
              allSkills={allSkills}
              teachingSkills={teachingSkills}
              setTeachingSkills={setTeachingSkills}
              searchTeaching={searchTeaching}
              setSearchTeaching={setSearchTeaching}
              showTeachingDropdown={showTeachingDropdown}
              setShowTeachingDropdown={setShowTeachingDropdown}
              updateProficiency={updateProficiency}
            />

            <LearningSkillsSection
              allSkills={allSkills}
              learningSkills={learningSkills}
              setLearningSkills={setLearningSkills}
              searchLearning={searchLearning}
              setSearchLearning={setSearchLearning}
              showLearningDropdown={showLearningDropdown}
              setShowLearningDropdown={setShowLearningDropdown}
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg"
            >
              Complete Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}