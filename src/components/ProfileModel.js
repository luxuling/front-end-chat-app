
export default function ProfileModel({ user, dis ,setProfileCard}) {
  return (
    <div className={`absolute top-0 bottom-0 h-full w-full z-[999] lg:flex lg:justify-center lg:items-center ${dis} transition-all ease-in-out duration-300`}>
      <div className="h-full lg:w-96 lg:h-auto bg-white lg:shadow-md shadow-slate-900 lg:rounded-md">
      <div className="flex justify-start ml-3 py-4">
          <button className="material-symbols-outlined bg-third p-2 rounded-lg mr-5 text-white" onClick={() => {
            setProfileCard(false)
          }}>arrow_back</button>
        </div>
        <div className="w-full flex justify-center mt-3">
        <div style={{backgroundImage: `url(${user.pic})`}} className="w-32 h-32 rounded-full bg-cover bg-center"></div>
        </div>
        <div className="text-center w-full mt-3 font-semibold text-2xl underline uppercase">
          <h1>{user.name}</h1>
        </div>
        <div className="text-center w-full font-sm mt-2">
          <h3>{user.email}</h3>
        </div>
        
      </div>
    </div>
  )
}