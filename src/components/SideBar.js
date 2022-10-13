import { useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import loadingGif from "../img/loading.gif"
import { ChatState } from "../context/chatProvider"
import CardAcc from "./CardAcc"
import ring from "../img/ring.gif"

export default function SideBarActive({ act, pos, setSidebar }) {
  const [result, setResult] = useState([])
  const [search, setSearch] = useState()
  const [loadingChat, setLoadingChat] = useState()
  const [loading, setLoading] = useState()
  const { user, setSelectedChat,fetchAgain, setFetchAgain,chats } = ChatState()
  
  const searchHandler = async (event) => {

    event.preventDefault()
    if (search === undefined) {
      Swal.fire({
        icon: "warning",
        text: "please fill the from search!!"
      })
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`https://rest-full-api-chat-production.up.railway.app/api/user?search=${search}`, config)
      setResult(data)
      setLoading(false)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error
      })
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post("https://rest-full-api-chat-production.up.railway.app/api/chat", { userId }, config)
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      if (chats.length === 0) {
        window.location.reload();
      }
      setLoadingChat(false)
      setSidebar(false)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:"YTT"
      })     
    }
  }
  

  return (
    <div className={`absolute top-0 bottom-0 h-full w-full  z-[999] flex justify-start ${act} transition-all ease-in-out duration-300`}>
      <div id="sidebar" className={`fixed ${pos} w-full lg:w-80 h-full lg:h-5/6 bg-white lg:rounded-r-md shadow-md shadow-slate-900 transition-all ease-in-out duration-200 relative p-3`}>
        <button className="material-symbols-outlined cursor-pointer text-white bg-third p-1 rounded-md mb-6 h-8 w-8 hover:bg-white hover:text-third transisition-all ease-in-out duration-200" onClick={() => {
          setSidebar(false)
      }}>arrow_back</button>
        <div className="w-full">
          <form action="">
            <div className="bg-secondary rounded-full h-10 flex">
              <input type="text" placeholder="Input Account Name" className="bg-transparent px-3 outline-none w-full " onChange={(event) => {
              setSearch(event.target.value)
            }}/>
            <button className="p-2 rounded-md ml-2 transition-all ease-in-out duration-200 outline-none overflow-hidden" onClick={searchHandler}><span className="material-symbols-outlined text-slate-400 mr-3">search</span></button>
            </div>
          </form>
        </div>
        <div className="overflow-y-auto h-[80%] relative mt-4">
            {loadingChat == true? <img src={ring} alt=""className="fixed w-10 top-0 left-[280px]"/>:""}
           {loading ? <div className="flex w-full h-4/6 justify-center items-center"><img src={loadingGif} alt="" className="w-20" /></div>
          :
          result.map((value) => {
            return <CardAcc key={value._id} name={value.name} email={value.email} pic={value.pic} accessChatHandler={() => {
              accessChat(value._id)
            }} />
           })
        }
        </div>
       
      </div>
   </div>
  )
}