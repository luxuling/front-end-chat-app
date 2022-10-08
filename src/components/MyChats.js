import axios from "axios"
import { useEffect, useState } from "react"
import { ChatState } from "../context/chatProvider"
import {getPic, getSender,  getUserInfo } from "../config/ChatLogic"
import AddNewGroup from "./AddGroup"
import Loading from "./loading/Loading"
import ChatBox from "./ChatBox"

export default function MyChat({fetchAgain}) {
  const [userLogged, setUserLoged] = useState()
  const { chats, setChats,setSelectedChat,setChatName,setSenderChat,chatbox, setChatBox,senderChat} = ChatState()
  const [loading, setLoading] = useState(false)
  const [addGroup, setAddGroup] = useState(false)
 

  console.log(chats)
  const fecthing = async () => {
    setLoading(true)
    try {
      const userInfo = await JSON.parse(localStorage.getItem("user"))
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config)
      const res = await data
      setChats(res)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fecthing()
    setUserLoged(JSON.parse(localStorage.getItem("user")));
  },[fetchAgain]);
  const startChat = (chat) => {
    setSelectedChat(chat)
    setChatName(getSender(userLogged, chat.users))
    setSenderChat(getUserInfo(userLogged, chat.users))
    setChatBox(true)
  }
  return (
    <section className="h-[90%] w-full flex">
    <div className="bg-transparent lg:bg-white lg:h-[98%] mt-auto h-full w-full lg:rounded-md p-5 lg:w-1/3 relative">
      {!addGroup ? <AddNewGroup dis={"invisible opacity-0"} setAddGroup={setAddGroup} /> : <AddNewGroup dis={"visible opacity-100"} setAddGroup={setAddGroup}/>}
      <div className="flex justify-start mb-4">
        <div>
          <h1 className="font-semibold text-center text-2xl text-third underline">Room Chat</h1>
        </div>
        <div className="ml-auto">
          <button className="material-symbols-outlined flex p-2 text-third transition-all ease-in-out duration-200 hover:bg-third hover:text-white rounded-lg" onClick={()=> setAddGroup(true)}>group_add</button>
        </div>
      </div>
      <div className="overflow-y-auto w-full h-[90%] rounded-lg">
        {loading ? <Loading/> :
      chats.map((chat) => {
        return (<button key={chat._id} className="w-full h-16 bg-secondary mt-5 rounded-lg p-1 cursor-pointer focus:bg-third text-start px-3" onClick={()=>startChat(chat)}>
          { !chat.isGroupChat ?
            <div className="flex">
              <div style={{ backgroundImage: `url(${getPic(userLogged, chat.users)})` }} className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-third cursor-pointer"></div>
              <div className="flex flex-col ml-3">
                <h1 className="font-semibold">{getSender(userLogged, chat.users)}</h1>
              <p className="text-sm text-slate-600">{chat.latestMessage === undefined? "":`${chat.latestMessage.sender.name}: ${chat.latestMessage.content}` }</p>
              </div>
              
            </div>
            :
            <div className="flex">
              <span className="material-symbols-outlined text-slate-400 text-3xl w-10 h-10 rounded-full bg-cover bg-center border-2 border-third cursor-pointer text-center">groups</span>
              <div className="flex flex-col ml-3">
              <h1 className="font-semibold">{chat.chatName}</h1>
              <p className="text-sm text-slate-600">{chat.latestMessage === undefined? "":`${chat.latestMessage.sender.name}: ${chat.latestMessage.content}` }</p>
              </div>
            </div>
          }
        </button>)
      })
      }
      </div>
      </div>
      {!chatbox ? <ChatBox dis={"invisible opacity-0"} setChatBox={setChatBox}/> : <ChatBox dis={"visible opacity-100"} setChatBox={setChatBox} />}
      </section>
  )
}