import axios from "axios"
import { ChatState } from "../context/chatProvider"
import { Toast } from "../config/Toast"

export default function CardAccGroup({ name, pic, email,id,setLoading}) {
  const { user, selectedChat, setSelectedChat } = ChatState()
  const removeUser = async () => {
    if (selectedChat.groupAdmin._id !== user._id) {
      Toast.fire({
        icon: "error",
        title: "You are not the admin",
      });
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.put("https://rest-full-api-chat-production.up.railway.app/api/chat/removeusergroup", {
        chatId: selectedChat._id,
        userId: id
      }, config)
      setSelectedChat(data)
      setLoading(false)
      Toast.fire({
        icon: 'success',
        title: 'Success remove the user'
      })
    } catch (error) {
      
    }
  }
  return (
    <div
      className="bg-slate-400 rounded-md w-full h-16 mt-5 flex justify-start p-3 hover:bg-third transition-all ease-in-out duration-200">
      <div>
        <img
          src={pic}
          alt=""
          className="w-10 border-2 border-third rounded-full"
        />
      </div>
      <div className="ml-3 flex flex-col">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-xs">{`Email: ${email}`}</p>
      </div>
      <div className="flex ml-auto">
        {
          selectedChat.groupAdmin === undefined ? ""
            :
            selectedChat.groupAdmin._id === id ?
              <span className="material-symbols-outlined">admin_panel_settings</span>
              :
              <button className="material-symbols-outlined" onClick={removeUser}>person_remove</button> 
        }
        
      </div>
    </div>
  );
}