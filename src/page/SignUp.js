import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../config/Toast";
import ring from "../img/ring.gif"

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [correct, setCorrect] = useState(false);
  const [pic, setPic] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  async function submitHandler() {
    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: "Please fill the form",
      });
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: "Your password is incorrect",
      });
      return;
    }
    try {
      setLoading(true)
      const config = {
        Headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://rest-full-api-chat-production.up.railway.app/api/user",
        { name, email, password, pic },
        config
      );

      localStorage.setItem("user", JSON.stringify(data));
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      }).then(() => {
        setLoading(false)
        navigate("/chats");
        window.location.reload();
      })
        
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: err
      }).then(() => {
        setLoading(false)
      });
    }
  }

  function picHandler(insertPic) {
    if (insertPic === undefined) {
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: "Please input yout picture",
      });
    }

    const imgType =
      insertPic.type === "image/jpg" ||
      insertPic.type === "image/png" ||
      insertPic.type === "image/jpeg";
    if (imgType) {
      const data = new FormData();
      data.append("file", insertPic);
      data.append("upload_preset", "chat-app-awok");
      data.append("cloud_name", "lixuling");
      fetch("https://api.cloudinary.com/v1_1/lixuling/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: "Please input file .jpg or .png",
      });
      return;
    }
  }

  function showPass(event) {
    event.preventDefault();
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }

  function showPass2(event) {
    event.preventDefault();
    const password = document.getElementById("confirm-password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }

  return (
    <div className="py-5" id="sign-up">
      <form action="">
        <label htmlFor="" className="text-slate-900">
          Username <span className="text-pink-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Input your name"
          className="mt-2 py-2 px-3 outline-none bg-secondary border-b-2 focus:border-third w-full mb-3 rounded-md"
          onChange={(props) => {
            setName(props.target.value);
          }}
        />
        <label htmlFor="" className="text-slate-900">
          Email address <span className="text-pink-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id=""
          placeholder="Input your email"
          className="mt-2 py-2 px-3 outline-none bg-secondary border-b-2 focus:border-third w-full rounded-md mb-3"
          onChange={(props) => {
            setEmail(props.target.value);
          }}
        />
        <label htmlFor="" className="text-slate-900">
          Password <span className="text-pink-500">*</span>
        </label>
        <div className="flex justify-between w-full">
          <div className="flex bg-secondary w-full items-center mt-2 rounded-md mb-3 overflow-hidden">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Input your password"
            className="mt-2 py-1 outline-none border-b-2 focus:border-third w-11/12 bg-transparent px-3"
            onChange={(props) => {
              setPassword(props.target.value);
            }}
          />
          <button
              className="material-symbols-outlined text-third mr-2"
              onClick={showPass}>
              visibility
            </button>
          </div>
        </div>
        {/* confirm password */}
        <label htmlFor="" className="text-slate-900">
          Confirm Password <span className="text-pink-500">*</span>
        </label>
        <div className="flex justify-between w-full">
          <div className="flex bg-secondary w-full items-center mt-2 rounded-md mb-3 overflow-hidden">
          <input
            type="password"
            name="consfirm-password"
            id="confirm-password"
            placeholder="Input your password"
            className={
              correct === false
                ? "mt-2 py-1 outline-none bg-secondary border-b-2 w-11/12 focus:border-pink-500 px-3"
                : "mt-2 py-1 outline-none bg-secondary border-b-2 w-11/12 focus:border-third px-3"
            }
            onChange={(props) => {
              if (password !== props.target.value) {
                setCorrect(false);
              } else {
                setCorrect(true);
                setConfirmPassword(props.target.value);
              }
            }}
          />
          <button
              className="material-symbols-outlined text-third mr-2"
              onClick={showPass2}>
              visibility
            </button>
          </div>
        </div>
        {/* pic profile */}
        <label htmlFor="profile" className="capitalize w-full">
          pick your profile
        </label>
        <input
          type="file"
          name="pic"
          id="profile"
          className="w-full file:mr-4 file:py-1 file:px-4 mt-2
      file:rounded-full file:border-2
      file:border-solid
      file:border-third
      file:text-sm file:font-semibold
      file:bg-transparent file:text-third
      hover:file:bg-third file:transition-all file:ease-in-out file:duration-200 hover:file:text-white"
          onChange={(pics) => picHandler(pics.target.files[0])}
        />
      </form>
      <div>
        <button
          className="bg-third px-2 py-1 h-10 rounded-md w-full text-secondary mt-3"
          onClick={submitHandler}>
          {loading === true ? <><img src={ring} alt="" className="w-7 mx-auto"/></> : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
