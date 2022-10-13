import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../config/Toast";
import ring from "../img/ring.gif";
const axios = require("axios");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginHandler() {
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Ooops",
        text: "Please fill the form!!",
      });
    }
    try {
      setLoading(true);
      const config = {
        Headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://rest-full-api-chat-production.up.railway.app/api/user/login",
        { email, password },
        config
      );
      localStorage.setItem("user", JSON.stringify(data));

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      }).then(() => {
        setLoading(false);
        navigate("/chats");
        window.location.reload();
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "incorrect password",
      }).then(() => {
        setLoading(false)
      });
    }
  }

  async function guestHandler(event) {
    event.preventDefault();
    setEmail("guest@guest.com");
    setPassword("123");
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
  return (
    <div className="py-5 flex flex-col h-full">
      <form action="">
        <label htmlFor="" className="text-slate-900">
          Email address
        </label>
        <div className="flex bg-secondary items-center mt-2 mb-5 rounded-md">
          <span className="material-symbols-outlined text-third text-3xl">
            person
          </span>
          <input
            type="email"
            name="email"
            id=""
            value={email}
            placeholder="Input your email"
            className="mt-2 py-1 px-3 bg-transparent outline-none border-b-2 focus:border-third w-full"
            onChange={(props) => {
              setEmail(props.target.value);
            }}
          />
        </div>

        <label htmlFor="" className="text-slate-900">
          Password
        </label>
        <div className="flex justify-between w-full">
          <div className="flex bg-secondary w-full items-center mt-2 rounded-md">
            <span className="material-symbols-outlined text-third text-3xl">
              lock
            </span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Input your password"
              className="mt-2 py-1 px-3 outline-none border-b-2 focus:border-third  bg-transparent w-full"
              value={password}
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
      </form>
      <div className="mt-5">
        <button
          type="submit"
          className="bg-third px-2 py-1 h-10 rounded-md w-full text-secondary mt-3"
          onClick={loginHandler}>
          {loading === true ? (
            <>
              <img src={ring} alt="" className="w-7 mx-auto" />
            </>
          ) : (
            "Login"
          )}
        </button>
        <button
          className="underline-offset-2 underline rounded-lg w-full text-third capitalize mt-3"
          onClick={guestHandler}>
          Get guest account
        </button>
      </div>
      <footer className="mt-auto text-center text-sm text-third">
          <h3><span className="text-pink-500">❤</span> Desaign By Yama && Develop By LixuLing <span className="text-pink-500">❤</span></h3>
        </footer>
    </div>
  );
}
