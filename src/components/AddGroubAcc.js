import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { ChatState } from "../context/chatProvider"
import Loading from "./loading/Loading"
import ring from "../img/ring.gif"
import { Toast } from "../config/Toast"

export default function AddGroubAcc({dis,setAddNewUser}) {
  const { user, selectedChat,setSelectedChat} = ChatState()
  const [search, setSearch] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)


  const searchHandler = async (query) => {
    if (!query) {
      return
    }
    
    try {
      setLoadingSearch(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`https://rest-full-api-chat-production.up.railway.app/api/user?search=${query}`, config)
      setSearch(data)
      setLoadingSearch(false)
      
    } catch (error) {
      
    }
  }



  const addHandler = async (usr) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      Toast.fire({
        icon: "error",
        title: "You are not the admin",
      });
      return
    }
    const duplicate = selectedChat.users.filter((res)=>res._id === usr._id)
    if (duplicate.length != 0) {
      Toast.fire({
        icon: 'error',
        title: 'User already in group'
      })
      return
    }
    setLoading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.put("https://rest-full-api-chat-production.up.railway.app/api/chat/addusergroup", {
        chatId: selectedChat._id,
        userId: usr._id
      }, config)
      setSelectedChat(data)
      setLoading(false)
      Toast.fire({
        icon: 'success',
        title: 'Success add new user'
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <div className={`absolute z-[999] bg-white h-full rounded-md top-0 left-0 w-full border-2 border-third transition-all ease-in-out duration-200 ${dis}`}>
      <div className="flex justify-center h-16 items-center bg-third">
      <button className="material-symbols-outlined text-secondary absolute left-0 text-3xl top-0" onClick={()=>setAddNewUser(false)}>cancel</button>
        <h1 className="text-center font-semibold text-white">Add new user</h1>
        {loading ? <img src={ring} alt="" className="absolute top-2 right-2 w-10" />
          :
          ""
        }
      </div>
      <div className="h-[10%] w-full px-3">
        <form action="" className="flex justify-end">
          <input type="text" placeholder="Input the name" className="bg-transparent outline-none p-1 border-b-2 border-third" onChange={(e)=>searchHandler(e.target.value)}/>
          <button className="material-symbols-outlined ml-3 bg-third rounded-full px-1 mt-1 text-secondary">person_search</button>
        </form>
      </div>
      <div className="border-2 h-[60%] w-full overflow-y-auto">
        {loadingSearch ? <Loading />
          :
          search.map((acc) => {
            return <div key={acc._id}
            className="bg-slate-400 rounded-md w-full h-16 mt-5 flex justify-start p-3 hover:bg-third transition-all ease-in-out duration-200">
            <div>
              <img
                src={acc.pic}
                alt=""
                className="w-10 border-2 border-third rounded-full"
              />
            </div>
            <div className="ml-3 flex flex-col">
              <h3 className="font-semibold">{acc.name}</h3>
              <p className="text-xs">{`Email: ${acc.email}`}</p>
            </div>
            <div className="flex ml-auto">
            <button className="material-symbols-outlined" onClick={()=>addHandler(acc)}>person_add</button>
              </div>
          </div>
          })
      }
      </div>
    </div>
  )
}