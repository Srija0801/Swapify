import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/layouts/Icon';
import RequestTabs from '../components/Requests/RequestTabs';
import RequestCard from '../components/Requests/RequestCard';
import { getIncomingRequests,getOutgoingRequests,acceptRequest,rejectRequest } from '../api/requestApi';
import { useAuth } from '../AuthContext';

export default function Requests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [incomingRequests,setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activetab, setActivetab] = useState("incoming");
  const [unread,setUnread] = useState({});


  useEffect(()=>{
    if(user?._id) fetchRequests();
  },[user]);


  const fetchRequests = async() =>{
    try{
      setLoading(true);

      const incoming = await getIncomingRequests();
      const outgoing = await getOutgoingRequests();

      setIncomingRequests(incoming || []);
      setOutgoingRequests(outgoing || []);
    }catch(err){
      console.log("Error fetching requests",err);
    }finally{
      setLoading(false);
    }
  }

  const handleAccept = async(id) =>{
    await acceptRequest(id);
    fetchRequests();
  }

  const handleReject = async(id) =>{
    await rejectRequest(id);
    fetchRequests();
  }
  

  


  return (
    <>
      <Icon />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Skill Exchange Requests
          </h1>
          <p className="text-xl text-gray-600">
            Manage your learning and teaching requests
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <RequestTabs
            activetab={activetab}
            setActivetab={setActivetab}
            incomingRequests={incomingRequests || []}
            outgoingRequests={outgoingRequests || []}
          />

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
              </div>
            ) :(
            <>
                {(activetab === 'incoming' ? incomingRequests : outgoingRequests).length === 0 ? (
                  <div className="text-center py-6 text-gray-500">No requests yet</div>
                ):
             (
              <div className="space-y-4">
                {(activetab === 'incoming'
                  ? incomingRequests
                  : outgoingRequests
                ).map(request => (
                  <RequestCard
                    key={request._id}
                    request={request}
                    type={activetab}
                    currentUser={user}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onChat={id => navigate(`/chat/${request._id}`)}
                  />
                ))}
              </div>
            )}
            </>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
