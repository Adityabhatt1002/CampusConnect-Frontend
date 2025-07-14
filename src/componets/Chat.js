import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import FileUploadButton from "./Docs";
const socket = io(process.env.REACT_APP_API_URL, { withCredentials: true });

const ChatPage = ({ group }) => {
  const [uploading, setUploading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    messageId: null,
  });
  const [deleteError,setDeleteError]=useState("");

  const handleDelete = async (messageId) => {
    console.log("🗑️ Trying to delete:", messageId);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/messages-delete/${messageId}`,
        {
          withCredentials: true,
        }
      );

      // Remove from UI
      setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === messageId
          ? {
              ...msg,
              content: "This message was deleted.",
              fileUrl: null,
              fileName: null,
            }
          : msg
      )
    );
      setDeleteError("");
    } catch (err) {
      console.error("Delete failed:", err);
      setDeleteError(err.response?.data?.error || "Failed to load the msg");
    }
  };
  // ✅ Fetch messages when group changes
  useEffect(() => {
    if (!group?._id) return;

    socket.emit("joinRoom", group._id);

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/messages/${group._id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(res.data); // Already array
      } catch (err) {
        console.error("Failed to load group messages", err);
      }
    };

    fetchMessages();
  }, [group?._id]);

  // ✅ Listen for real-time messages
  useEffect(() => {
    const listener = (message) => {
      //make sure the createdAt is a valid date
      if (!message.createdAt) {
        message.createdAt = new Date();
      }

      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", listener);
    return () => socket.off("receiveMessage", listener);
  }, []);

  const handleFileUpload = async (file) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/messages/${group._id}/send-file`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const savedMessage = res.data.message;

      socket.emit("sendMessage", {
        roomId: group._id,
        message: savedMessage, // socket triggers update on others
      });
      setMessages((prev) => [...prev, savedMessage]);
    } catch (err) {
      console.error("File upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Send message
  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/messages/${group._id}/send`,
        { message: input },
        { withCredentials: true }
      );

      const savedMessage = res.data.message;

      socket.emit("sendMessage", {
        roomId: group._id,
        message: savedMessage,
      });

      setMessages((prev) => [...prev, savedMessage]);
      setInput("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date)
      ? "Unknown"
      : date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const getDateLabel = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today - messageDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

let lastDateLabel= null;

  return (
    <div className="flex flex-col h-[500px] bg-slate-900 rounded-xl p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
       {messages.map((msg, idx) => {
  const dateLabel = getDateLabel(msg.createdAt);
  const isMine = msg?.sender?._id === user?._id;
  const showDateLabel = dateLabel !== lastDateLabel;
  lastDateLabel = dateLabel;
          return (
              <React.Fragment key={msg._id}>
      {showDateLabel && (
        <div className="text-center text-gray-400 text-xs my-2">
          —— {dateLabel} ——
        </div>
      )}
            <div
              
              className={`w-full flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col max-w-[70%] text-white text-sm">
                

                <div
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (isMine) {
                      setDeleteConfirm({ open: true, messageId: msg._id });
                    }
                  }}
                  className={`px-4 py-2 rounded-xl relative ${
                    isMine ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  {msg?.content && <p>{msg.content}</p>}

                  {msg?.fileUrl?.match(/\.(jpg|jpeg|png)$/i) ? (
                    <img
                      src={msg.fileUrl}
                      alt="uploaded"
                      className="mt-2 max-w-xs rounded-lg"
                    />
                  ) : (
                    <a
                      href={msg.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 underline mt-2 block"
                    >
                      📎 {msg.fileName || "Download File"}
                    </a>
                  )}
                   <span className="absolute bottom-1 right-2 text-xs text-slate-300">
              {formatTime(msg.createdAt)}
              </span>
                </div>
              </div>
            </div>
            </React.Fragment>
          );
        })}

        {deleteConfirm.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg space-y-4">
              <p>Delete this message?</p>
              <div className="flex gap-4 justify-end">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => {
                    handleDelete(deleteConfirm.messageId);
                    setDeleteConfirm({ open: false, messageId: null });
                  }}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() =>
                    setDeleteConfirm({ open: false, messageId: null })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {deleteError && (
        <div className="mt-2 text-red-400 text-sm">{deleteError}</div>
      )}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <FileUploadButton onFileSelect={handleFileUpload} />
        {uploading && (
          <div className="flex flex-col items-center mt-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
            <p className="mt-2 text-sm text-blue-400 font-medium">
              Uploading file...
            </p>
          </div>
        )}
        <button
          disabled={uploading}
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
