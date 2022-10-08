import { useEffect, useState } from "react"
import DropNotif from "../components/DropNotif"
import DropProfile from "../components/DropProfile"
import MyChat from "../components/MyChats"
import ProfileModel from "../components/ProfileModel"
import  SideBarActive from "../components/SideBar"
import { ChatState } from "../context/chatProvider"

export default function Chat() {
  const [profile, setProfile] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [profileCard, setProfileCard] = useState(false)
  const { user, fetchAgain,notification } = ChatState()
  const [notif, setNotif] = useState(false)

  
  return (
    <section className="bg-tranparent lg:bg-primary w-full h-screen relative">
      {!profileCard ? <ProfileModel user={user} dis={"invisible opacity-0"} setProfileCard={setProfileCard} /> : <ProfileModel user={user} dis={"visible opacity-100"} setProfileCard={setProfileCard} />}
      
      {!sidebar ? <SideBarActive act={"invisible opacity-0"} pos={"-left-80"} setSidebar={setSidebar}/> : <SideBarActive act={"visible opacity-100"} pos={"left-0"} setSidebar={setSidebar}/>}
      <header className="p-5 bg-third flex justify-between items-center relative rounded-b-xl h-[10%]">
        <div className="w-1/3">
          <button id="search" className="py-1 px-2 flex justify-between items-center bg-secondary rounded-full hover:opacity-80 transition-all ease-in-out duration-200" onClick={() => {
            sidebar ? setSidebar(false): setSidebar(true)
          }}>
            <span className="text-sm text-primary opacity-50">Search User</span><span className="material-symbols-outlined text-sm ml-2">search</span>
          </button>
        </div>

        <div className="w-1/3 text-center text-white font-semibold lg:text-2xl">
        </div>

        <div className="w-1/3 flex justify-end items-center">
          <button className="flex">
            <button className="material-symbols-outlined relative mr-5 text-secondary" onClick={()=>setNotif(!notif)}>
              notifications
              {notification.length?<span class="fixed ml-2 w-4 h-4 text-xs font-semibold text-pink-500 bg-pink-200 rounded-full top-5 right-24 translate-x-2 ">{notification.length}</span>:""}
            </button>
            {notif ? <DropNotif setNotif={setNotif} /> : ""}
          </button>
        
          <button id="profile" className="flex items-start" onClick={() => {
            profile? setProfile(false) : setProfile(true)
          }}>
            <div style={{backgroundImage: `url(${user.pic})`}} className="w-8 h-8 rounded-full bg-cover bg-center border-2 border-secondary"></div>
            <span className="material-symbols-outlined text-secondary">
              keyboard_arrow_down
            </span>
          </button>
          {profile ? <DropProfile act={"visible opacity-100"} setProfileCard={setProfileCard} /> : <DropProfile act={"invisible opacity-0"} />}
        </div>
      </header>
      <MyChat fetchAgain={fetchAgain} />
    </section>
  )
}