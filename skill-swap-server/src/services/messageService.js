import Exchange from "../models/Exchange.js";
import Message from "../models/Message.js";

export const getOrCreateExchange = async (request) => {
  if (request.sender.toString() === request.receiver.toString()) {
    throw new Error("Sender and receiver cannot be same");
  }

  let exchange = await Exchange.findOne({ request: request._id })
    .populate("users", "name avatar_url lastSeen isOnline");

  if (!exchange) {
    exchange = await Exchange.create({
      request: request._id,
      users: [request.sender, request.receiver],
      skill: request.skill,
      status: "active",
    });

    exchange = await exchange.populate("users", "name avatar_url lastSeen isOnline");
  }

  return exchange;
};


export const getMessage = async(exchangeId) =>{
   return await Message.find({exchange:exchangeId}).sort("createdAt");
}

export const sendMessage = async(data) =>{
    return await Message.create(data);
}

export const getUserExchanges = async(userId) =>{
    return await Exchange.find({users:userId}).populate("skill").populate("users","name avatar_url lastSeen isOnline").sort({updatedAt:-1});
}
export const completeExchange = async(exchangeId) =>{
  return await Exchange.findByIdAndUpdate(exchangeId,
    { status: "completed" },
    { new: true }
  );
}


export const cancelExchange = async(exchangeId) =>{
  return await Exchange.findByIdAndUpdate(exchangeId,
    { status: "cancelled" },
    { new: true }
  );
}