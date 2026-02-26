
import userAxios from "./userAxios";


export const getIncomingRequests = async () => {
  const res = await userAxios.get(`/requests/incoming`);
  return res.data;
};

export const getOutgoingRequests = async () => {
  const res = await userAxios.get(`/requests/outgoing`);
  return res.data;
};

export const acceptRequest = async (requestId) => {
  const res = await userAxios.put(`/requests/${requestId}/accept`);
  return res.data;
};

export const rejectRequest = async (requestId) => {
  const res = await userAxios.put(`/requests/${requestId}/reject`);
  return res.data;
};
