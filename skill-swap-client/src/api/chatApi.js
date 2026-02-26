import userAxios from "./userAxios";

export const chatApi ={


    getOrCreateExchange: async (requestId) => {
        const res = await userAxios.post(`/msg/exchange/${requestId}`);
        return res.data;
    },


    getMessages: async (exchangeId) => {
        const res = await userAxios.get(`/msg/${exchangeId}/messages`);
        return res.data;
    },


    sendMessage: async (exchangeId, content) => {
        const res = await userAxios.post(`/msg/${exchangeId}/messages`, {
        content
    });
        return res.data;
    },


    completeExchange: async (exchangeId) => {
        const res = await userAxios.put(`/msg/exchange/${exchangeId}/complete`);
        return res.data;
    },


    cancelExchange: async (exchangeId) => {
        const res = await userAxios.put(`/msg/exchange/${exchangeId}/cancel`);
        return res.data;
    },


}

