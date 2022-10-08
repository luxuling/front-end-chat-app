import {createContext, useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"

const chatContext = createContext()

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState([])
  const [selectedChat, setSelectedChat] = useState()
  const [chats, setChats] = useState([])
  const [chatName, setChatName] = useState()
  const [senderChat, setSenderChat] = useState()
  const [fetchAgain, setFetchAgain] = useState(false)
  const [chatbox, setChatBox] = useState(false)
  const [notification, setNotification] = useState([])

  const navigate = useNavigate()
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("user"))
      setUser(userInfo)
      if (userInfo) {
        navigate("/chats")
      }
    },[navigate])
 
  
  return (
    <chatContext.Provider value={{user,setUser,selectedChat, setSelectedChat,chats, setChats,chatName, setChatName,senderChat,setSenderChat,fetchAgain, setFetchAgain,notification, setNotification,chatbox, setChatBox}}>{ children }</chatContext.Provider>
  )
}

export const ChatState = ()=>{
  return useContext(chatContext)
}

export default ChatProvider