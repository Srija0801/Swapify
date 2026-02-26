import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/layouts/Icon";
import SkillSearch from "../components/skills/SkillSearch";
import SkillList from "../components/skills/SkillList";
import TeacherList from "../components/teachers/Teacherlist";
import { skillApi } from "../api/skillApi.js";

export default function BrowseSkills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);



   useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await skillApi.getAllSkills();
    
      const normalized = data.map(s => ({
        id: s._id || s.id,
        name: s.skill || s.skill_name || "",
      }));
      setSkills(normalized);
    } catch (err) {
      console.error("Error loading skills", err);
    }
  };

  const loadTeachers = async (skill) => {
    try {
      setSelectedSkill(skill);
      setLoading(true);
      const data = await skillApi.getTeachersForSkill(skill.id);
      setTeachers(data);
    } catch (err) {
      console.error("Error loading teachers", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = skills.filter(skill =>
    skill?.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <>
      <Icon/>

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <SkillSearch search={search} setSearch={setSearch} />
          <SkillList
            skills={filteredSkills}
            selectedSkill={selectedSkill}
            onSelect={loadTeachers}
          />
        </div>

        <div className="md:col-span-2">
          {selectedSkill ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Teachers of {selectedSkill.name}
              </h2>
              <TeacherList teachers={teachers} loading={loading} />
            </>
          ) : (
            <p className="text-center text-gray-500">
              Select a skill to see teachers
            </p>
          )}
        </div>
      </div>
    </>
  );
}
