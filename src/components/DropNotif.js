import { getSender, getUserInfo } from "../config/ChatLogic"
import { ChatState } from "../context/chatProvider"

export default function DropNotif({setNotif}) {
  const { notification, setNotification,user,setSelectedChat,setSenderChat,setChatBox} = ChatState()

  return (
    <div className="fixed top-24 right-10 w-56 max-h-96 overflow-y-auto bg-secondary rounded-xl shadow-lg z-[999]">
      {!notification.length && "No New Messages"}
      {notification.map((notif) => {
        return <button key={notif._id} className="border-2 border-slate-400 py-3 rounded-xl my-3 text-sm w-10/12" onClick={(e) => {
          setNotif(false)          
          setSelectedChat(notif.chat)
          setSenderChat(notif.sender)
          setChatBox(true)
          setNotification(notification.filter((n)=> n !== notif))
        }}>{notif.chat.isGroupChat ? `New Message from ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}</button>
      })}
    </div>
  )
}