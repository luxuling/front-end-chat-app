import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const DropProfile = ({ act, setProfileCard }) => {
  const navigate = useNavigate()

  const logoutHandler = () => {
    Swal.fire({
      icon: "question",
      text: "are you really want to log out?",
      showCloseButton: true,
    }).then((e) => {
      if (!e.isConfirmed) {
        return
      }
      localStorage.removeItem("user")
      navigate("/")
    })
  
  }
  return (
    <div className={`flex flex-col justify-evenly py-5 h-28 w-32 bg-third rounded-md absolute top-24 ${act} transition-all ease-in-out duration-300 z-[777]`}>
      <button className="text-white hover:underline transition-all ease-in-out duration-200" onClick={() => {
        setProfileCard(true)
      }}>My profile</button>
      <button className="text-white hover:underline transition-all ease-in-out duration-200" onClick={() =>logoutHandler()}>Logout</button>
    </div>
  )
}

export default DropProfile