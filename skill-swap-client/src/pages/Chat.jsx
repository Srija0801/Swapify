import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send, CheckCircle, XCircle } from "lucide-react";
import Icon from "../components/layouts/Icon";
import { useAuth } from "../AuthContext";
import { chatApi } from "../api/chatApi";
import { socket } from "../../socket";

export default function Chat() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [exchange, setExchange] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [onlineStatus, setOnlineStatus] = useState({
    isOnline: false,
    lastSeen: null,
  });

  const messagesEndRef = useRef(null);

  /* -------------------- INIT CHAT -------------------- */
  useEffect(() => {
    if (requestId && user) {
      initializeChat();
    }
  }, [requestId, user]);

  const initializeChat = async () => {
    try {
      setLoading(true);

      const exchangeData = await chatApi.getOrCreateExchange(requestId);
      setExchange(exchangeData);

      const other = exchangeData.users.find(
  (u) =>
    (u._id ? u._id.toString() : u.toString()) !== user._id.toString()
);



      if (!other) throw new Error("Other user not found");

      setOtherUser(other);
      
      
      setOnlineStatus({
        lastSeen:other.lastSeen || null,
        isOnline:other.isOnline || false,
      });

      const msgs = await chatApi.getMessages(exchangeData._id);
      setMessages(msgs);
    } catch (err) {
      console.error("Chat init error:", err);
    } finally {
      setLoading(false);
    }
  };


  /* -------------------- SOCKET: USER ONLINE -------------------- */
  useEffect(() => {
    if (!user?._id) return;

    const handleConnect = () => {
      console.log("client socket connected");
      socket.emit("userOnline", user._id);
    };

     socket.on("connect", handleConnect);

  // If already connected (page refresh case)
     if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [user]);


  /* -------------------- SOCKET: JOIN EXCHANGE -------------------- */
  useEffect(() => {
    if (exchange?._id) {
      socket.emit("joinExchange", exchange._id);
    }
  }, [exchange]);

  /* -------------------- SOCKET: ONLINE STATUS -------------------- */
  useEffect(() => {
    const handleStatus = (data) => {
      if (data.userId.toString() === otherUser?._id.toString()) {
        setOnlineStatus({
          isOnline: data.isOnline,
          lastSeen: data.lastSeen,
        });
      }
    };

    socket.on("userStatus", handleStatus);
    return () => socket.off("userStatus", handleStatus);
  }, [otherUser]);

  /* -------------------- SOCKET: NEW MESSAGE -------------------- */
  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, []);




  /* -------------------- AUTO SCROLL -------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------------------- SEND MESSAGE -------------------- */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageContent.trim() || !exchange) return;

    setSending(true);
    socket.emit("sendMessage", {
      exchange: exchange._id,
      sender: user._id,
      content: messageContent,
    });

    setMessageContent("");
    setSending(false);
  };

  /* -------------------- EXCHANGE ACTIONS -------------------- */
  const handleCompleteExchange = async () => {
    await chatApi.completeExchange(exchange._id);
    setExchange({ ...exchange, status: "completed" });
  };

  const handleCancelExchange = async () => {
    await chatApi.cancelExchange(exchange._id);
    setExchange({ ...exchange, status: "cancelled" });
  };

  /* -------------------- GUARDS -------------------- */
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading user...</div>;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading chat...</div>;
  }

  if (!exchange || !otherUser) {
    return <div className="min-h-screen flex items-center justify-center">Chat not found</div>;
  }



  
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Icon />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">

        <div className="bg-white rounded-t-xl shadow p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={otherUser.avatar_url || "/default-avatar.png"}
              className="w-12 h-12 rounded-full"
              alt=""
            />
            <div>
              <h2 className="font-bold">{otherUser.name}</h2>
              <p className="text-sm text-gray-500">
                {onlineStatus.isOnline
                  ? "Online" : onlineStatus.lastSeen 
                  ? `Last seen ${new Date(onlineStatus.lastSeen).toLocaleString()}` : "Last seen unavailable"
                  }
              </p>
            </div>
          </div>

          {exchange.status === "active" && (
            <div className="flex space-x-2">
              <button
                onClick={handleCompleteExchange}
                className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelExchange}
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

       
        <div className="flex-1 bg-white overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.sender === user._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === user._id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

       
        {exchange.status === "active" ? (
          <form
            onSubmit={handleSendMessage}
            className="bg-white p-4 border-t flex space-x-3"
          >
            <input
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="bg-gray-100 p-4 text-center font-medium">
            Exchange {exchange.status}
          </div>
        )}
      </div>
    </div>
  );
}
