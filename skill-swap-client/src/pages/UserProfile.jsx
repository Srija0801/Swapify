import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Icon from '../components/layouts/Icon';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/userProfile.jsx/UserHeader';
import TeachingSkills from '../components/userProfile.jsx/TeachingSkills';
import LearningSkills from '../components/userProfile.jsx/LearningSkills';
import RequestModal from '../components/userProfile.jsx/RequestModal';
import { userApi } from '../api/userApi';


export default function UserProfile() {
  const { userId } = useParams();

  const navigate = useNavigate();
  const { user:currentUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [message, setMessage] = useState('');
  const [requesting,setRequesting] = useState(false);
  const [teachingSkills,setTeachingSkills] = useState([]);
  const [learningSkills,setLearningSkills] = useState([]);

  useEffect(()=>{
    if(userId) {
      fetchUserProfile();
    }
  },[userId]);

  const fetchUserProfile = async() =>{
    setLoading(true);
    
    try{
      const profile = await userApi.getUserById(userId);
      setUserData(profile);

      const userskills = await userApi.getUserSkillsById(userId);
      
      const teaching = userskills.filter(s => s.skill_type === 'teaching')
      .map(s => ({
      id: s.skill?._id || s.skill_id || s._id,
      name: s.skill?.name || s.skill?.skill || "",
      proficiency: s.proficiency || 3,
      }));

      const learning = userskills.filter(s=>s.skill_type == 'learning').map(s=>({
        id : s.skill?._id || s.skill_id || s._id,
        name : s.skill?.name || s.skill?.skill || "",
        proficiency : s.proficiency || 3,
      }));

      setTeachingSkills(teaching);
      setLearningSkills(learning);
    }
    catch(err){
      console.error("Error fetching user Profile",err);
    }finally{
      setLoading(false);
    }
  }

 

  const handleSendRequest = async () => {
  if (!selectedSkill?.id || !userData?._id) {
    alert("Please select a skill to request");
    return;
  }

  if (!message?.trim()) {
    alert("Please enter a message");
    return;
  }

  try {
    setRequesting(true);

    await userApi.createRequest(
      userData._id,       // receiver
      selectedSkill.id,   // skill ObjectId
      message.trim()      // message
    );

    alert("Request sent successfully");
    setShowModal(false);
    setMessage("");
    setSelectedSkill(null);
  } catch (err) {
    console.error("Error sending Request", err);
    alert("Failed to send request. Check console for details.");
  } finally {
    setRequesting(false);
  }
};




   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-b-2 border-emerald-600 rounded-full"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg mb-4">User not found</p>
        <button
          onClick={() => navigate('/browse-skills')}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Icon showBack backTo="/browse-skills" />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <UserHeader
          user={userData}
          currentUserId={currentUser?._id}
          onRequest={() => setShowModal(true)}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <TeachingSkills skills={teachingSkills} />
          <LearningSkills skills={learningSkills} />
        </div>
      </div>
      
      

      {showModal && (
        <RequestModal
          skills={teachingSkills}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          message={message}
          setMessage={setMessage}
          loading={requesting}
          onSend={handleSendRequest}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
