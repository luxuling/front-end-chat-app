import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./Login"
import SignUp from "./SignUp"

export default function Home() {
  const [login, setLogin] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      navigate("/chats")
    }
  },[navigate])
  function btnSwitch(event) {
    event.preventDefault()
    if (login) {
      setLogin(false)
    } else {
      setLogin(true)
    }
  }
  
  return (
    <div className="lg:px-10 w-screen h-screen flex justify-center lg:bg-primary mx-auto font-Mulish">
      <div className="h-full w-full lg:w-1/2 lg:h-full px-5 py-5">
        <div className="text-third font-bold text-3xl w-full rounded-lg h-auto py-3 lg:bg-third lg:text-white lg:w-96 lg:mx-auto lg:font-medium">
          <h1 className="text-center">Talk-Talking Awok</h1>
        </div>
        <div className="lg:rounded-lg w-full h-[90%] py-3 mt-2 px-4 lg:bg-white lg:w-96 mx-auto flex flex-col">   
          <div className="py-1 px-2 h-10 flex justify-between">
            {login ?
              <>
                <button className="w-24 bg-third px-2 py-1 h-10 rounded-md text-secondary" onClick={btnSwitch}>Login</button>
                <button className="w-24 bg-third bg-opacity-50 px-2 py-1 h-10 rounded-md text-secondary" onClick={btnSwitch}>Sign Up</button>
              </>
              :
              <>
                <button className="w-24 bg-third bg-opacity-50 px-2 py-1 h-10 rounded-md text-secondary" onClick={btnSwitch}>Login</button>
                <button className="w-24 bg-third  px-2 py-1 rounded-md h-10 text-secondary" onClick={btnSwitch}>Sign Up</button>
              </>
            }
          </div>
          {login ? 
            <Login/>
            :
            <SignUp />
          }
        <footer className="mt-auto text-center text-sm text-third">
          <h3><span className="text-pink-500">❤</span> Desaign By Yama && Develop By LixuLing <span className="text-pink-500">❤</span></h3>
        </footer>
        </div>
      </div>
    </div>
  )
}