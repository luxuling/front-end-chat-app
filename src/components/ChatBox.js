import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import GroupDetail from "./GroupDetail";
import ProfileModel from "./ProfileModel";
import { ScrollAbleChat } from "./ScrollAbleChat";
import io from "socket.io-client";
import Typing from "./animation/Typing";
import sendIcon from "../img/send.png";
import loadIcon from "../img/chatLoad.gif"
const ENDPOINT = "https://rest-full-api-chat-production.up.railway.app/";
var socket, selectedChatCompare;

export default function ChatBox({ dis, setChatBox }) {
  const [profileCard, setProfileCard] = useState(false);
  const [groupDetail, setGroupDetail] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connetedSocket, setConnetedSocket] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading,setLoading] = useState(false)

  const {
    chatName,
    senderChat,
    selectedChat,
    user,
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
    setSelectedChat,
  } = ChatState();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", JSON.parse(localStorage.getItem("user")));
    socket.on("connected", () => setConnetedSocket(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const fetchMessage = async () => {
    if (selectedChat !== undefined) {
      setLoading(true)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `https://rest-full-api-chat-production.up.railway.app/api/message/${selectedChat._id}`,
          config
        );
        setMessages(data);
        setLoading(false)
        socket.emit("join chat", selectedChat._id);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      socket.emit("stop typing", selectedChat._id);
      setNewMessage("");

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "https://rest-full-api-chat-production.up.railway.app/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  const sendMessageIcon = async (event) => {
      event.preventDefault();
      socket.emit("stop typing", selectedChat._id);
      setNewMessage("");

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "https://rest-full-api-chat-production.up.railway.app/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        throw new Error(error);
      }
  }

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const typingHandler = (event) => {
    setNewMessage(event.target.value);

    if (connetedSocket == false) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTyping = new Date().getTime();
    let timeOut = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDifferent = timeNow - lastTyping;
      if (timeDifferent >= timeOut && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timeOut);
  };
  return (
    <>
      {!profileCard ? (
        <ProfileModel
          user={senderChat == undefined ? "" : senderChat}
          dis={"invisible opacity-0"}
          setProfileCard={setProfileCard}
        />
      ) : (
        <ProfileModel
          user={senderChat == undefined ? "" : senderChat}
          dis={"visible opacity-100"}
          setProfileCard={setProfileCard}
        />
      )}

      <div
        className={`fixed flex top-0 lg:h-[613px] lg:top-[83px] flex-col bottom-3 lg:rounded-md z-[555] bg-white h-full w-full lg:w-[900px] lg:right-0 lg: ${dis} transition-all ease-in-out duration-200`}>
        {!groupDetail ? (
          <GroupDetail
            dis={"invisible opacity-0"}
            setGroupDetail={setGroupDetail}
            setChatBox={setChatBox}
          />
        ) : (
          <GroupDetail
            dis={"visible opacity-100"}
            setGroupDetail={setGroupDetail}
            setChatBox={setChatBox}
          />
        )}

        <div className="w-full flex justify-between h-14 bg-third rounded-b-xl px-4 items-center">
          <div className="w-1/3">
            <button
              className="material-symbols-outlined cursor-pointer text-third bg-white p-1 rounded-md hover:bg-third hover:text-white hover:border hover:border-white"
              onClick={() => {
                setChatBox(false);
                setSelectedChat();
              }}>
              arrow_back
            </button>
          </div>
          <div className="w-1/3 text-center font-semibold flex justify-center items-center">
            {selectedChat === undefined ? (
              ""
            ) : !selectedChat.isGroupChat ? (
              <h1 className="text-white">{chatName}</h1>
            ) : (
              <h1 className="text-white">
                {selectedChat == undefined ? "" : selectedChat.chatName}
              </h1>
            )}
          </div>
          <div className="w-1/3 flex justify-end">
            {selectedChat === undefined ? (
              ""
            ) : !selectedChat.isGroupChat ? (
              <div
                style={{ backgroundImage: `url(${senderChat.pic})` }}
                className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-third cursor-pointer"
                onClick={() => setProfileCard(true)}></div>
            ) : (
              <button
                className="material-symbols-outlined text-white"
                onClick={() => setGroupDetail(true)}>
                groups
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col h-[84%]">
          {loading === true ? <><img src={loadIcon} alt="" className="w-20 mx-auto my-auto"/></>:<ScrollAbleChat messages={messages} />}
        </div>
        <div className="w-full h-[8%] mt-1 relative">
          {isTyping == true ? <Typing /> : <></>}
          <form action="" className="h-full" onKeyDown={sendMessage}>
            <div className="flex justify-between w-full items-center px-3">
              <input
                type="text"
                placeholder="Enter the message"
                className="w-[86%] lg:w-[92%] bg-transparent outline-none px-3 border-2 h-10 rounded-xl border-third"
                onChange={typingHandler}
                value={newMessage}
              />
              <button className=" bg-third mr-3 rounded-xl px-2 h-10 w-10 flex justify-center items-center" onClick={sendMessageIcon}>
                <img src={sendIcon} alt="" className="w-5 -rotate-45" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
