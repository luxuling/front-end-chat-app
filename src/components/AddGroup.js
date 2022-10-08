import axios from "axios";
import { useState } from "react";
import { ChatState } from "../context/chatProvider"
import CardAcc from "./CardAcc";
import SelectedCard from "./SelectedCard";
import ring from "../img/ring.gif"
import Loading from "./loading/Loading";
import { Toast } from "../config/Toast";

export default function AddNewGroup({dis,setAddGroup}) {
  const [groupName, setGroupName] = useState()
  const [selectedUser, setSelectedUser] = useState([])
  const [search, setSearch] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingSearch,setLoadingSearch] = useState(false)
  const { user,chats, setChats,fetchAgain,setFetchAgain } = ChatState()


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
      const { data } = await axios.get(`/api/user?search=${query}`, config)
      setSearch(data)
      setLoadingSearch(false)
    } catch (error) {
      
    }
  }

  const selectUser = (userAdd) => {
    if (selectedUser.includes(userAdd)) {
      Toast.fire({
        icon: 'error',
        title: 'User has been selected'
      })
      return
    }
    if (selectedUser.length > 4) {
      Toast.fire({
        icon: 'warning',
        title: 'Select user in another section!'
      })
      return
    }

    setSelectedUser([...selectedUser,userAdd])
  }

  const addGroup = async () => {
    setLoading(true)
    if (!groupName || !selectedUser) {
      Toast.fire({
        icon: 'error',
        title: 'Please fill the form!!'
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post("/api/chat/group", {
        name: groupName,
        users: JSON.stringify(selectedUser.map((re)=>re._id))
      }, config)
      setChats([data, ...chats])
      setAddGroup(false)
      setLoading(false)
      if (fetchAgain == false) {
        setFetchAgain(true)
      } else {
        setFetchAgain(false)
      }
      Toast.fire({
        icon: 'success',
        title: 'Succsess to create group'
      })
      setSelectedUser([])
    } catch (error) {
      throw new Error(error)
    }
  }
  const removeUser = (userId) => {
    const filtered = selectedUser.filter((value) => value._id !== userId)
    setSelectedUser(filtered)
  }
  return (
    <div
      className={`fixed left-0 top-0 bottom-0 h-full w-full z-[999] flex justify-center items-center transition-all ease-in-out duration-300 ${dis}`}>
      <div className="h-full w-full lg:w-96 lg:h-[530px] bg-white shadow-md shadow-slate-900 lg:rounded-md relative">
        <div className="flex w-full relative mb-2">
        <button className="material-symbols-outlined cursor-pointer text-white bg-third p-1 rounded-md mb-6 h-8 w-8 hover:bg-white hover:text-third transition-all ease-in-out duration-200 ml-2 mt-3 mr-5 fixed" onClick={()=>setAddGroup(false)}>arrow_back </button>
        <h1 className="text-center text-xl font-bold py-3 text-third w-full">Add Group</h1>
        </div>
        {!loading? "": <img src={ring} alt="" className="w-10 absolute top-0 right-0"/>}
        <div className="w-full h-auto p-2">
          <form action="" className="flex flex-col justify-center">
            <input
              type="text"
              placeholder="Input Group Name!!"
              className="outline-none bg-secondary py-2 px-3 rounded-md focus:border-b-2 focus:border-third mb-4"
              onChange={(e) => setGroupName(e.target.value)}/>
            <input
              type="text"
              placeholder="Input User!!"
              className="outline-none bg-secondary py-2 px-3 rounded-md focus:border-b-2 focus:border-third"
              onChange={(e) => searchHandler(e.target.value)}/>
          </form>
        </div>
        <div className="w-full h-11 flex items-center">
          {selectedUser.map((user) => {
            return <SelectedCard key={user._id} name={user.name} functionHandler={()=>removeUser(user._id)} />
          })}
        </div>
        <div className="h-96 w-full lg:h-64 overflow-y-auto px-3">
          {loadingSearch === true ? <Loading />
            :
            search.map((acc) => {
              return <CardAcc key={acc._id} name={acc.name} email={acc.email} pic={acc.pic} accessChatHandler={()=>selectUser(acc)} />
            })
            }
        </div>
        <div className="flex justify-end mr-3 mt-3">
          <button className="cursor-pointer text-white bg-third p-1 rounded-md mb-6 h-10 w-20 hover:bg-white hover:text-third hover:border-2 hover:border-third" onClick={addGroup}>Done</button>
        </div>
      </div>
    </div>
  );
}
