import { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import CardAccGroup from "./CardAccgroup";
import ring from "../img/ring.gif";
import Swal from "sweetalert2";
import axios from "axios";
import AddGroubAcc from "./AddGroubAcc";
import { Toast } from "../config/Toast";
export default function GroupDetail({ dis, setGroupDetail, setChatBox }) {
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState();
  const [addNewUser, setAddNewUser] = useState(false);
  const { selectedChat, user, setSelectedChat, fetchAgain, setFetchAgain } =
    ChatState();

  const renameGroup = async () => {
    if (selectedChat.groupAdmin._id !== user._id) {
      Toast.fire({
        icon: "error",
        title: "You are not the admin",
      });
      return
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "https://rest-full-api-chat-production.up.railway.app/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: newName,
        },
        config
      );
      setSelectedChat(data);
      setLoading(false);
      setFetchAgain(!fetchAgain);
      Toast.fire({
        icon: "success",
        title: "Success to rename group",
      });
    } catch (error) {}
  };
  const leaveHandler = () => {
    Swal.fire({
      icon: "question",
      text: "are you really want to leave?",
      showCloseButton: true,
    }).then(async (e) => {
      if (!e.isConfirmed) {
        return;
      }
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          "https://rest-full-api-chat-production.up.railway.app/api/chat/removeusergroup",
          {
            chatId: selectedChat._id,
            userId: user._id,
          },
          config
        );
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
        setChatBox(false);
        Toast.fire({
          icon: "success",
          title: "Succsess to leave group",
        });
        setGroupDetail(false);
      } catch (error) {}
    });
  };
  return (
    <div
      className={`absolute top-0 bottom-0 w-full h-full bg-[rgba(10, 10, 10, 0.52)] backdrop-blur-sm z-[888] flex justify-center items-center transition-all ease-in-out duration-300 ${dis}`}>
      <div className="w-96 h-auto bg-white shadow-md shadow-slate-900 rounded-md relative">
        {!addNewUser ? (
          <AddGroubAcc
            dis={"invisible opacity-0"}
            setAddNewUser={setAddNewUser}
          />
        ) : (
          <AddGroubAcc
            dis={"visible opacity-100"}
            setAddNewUser={setAddNewUser}
          />
        )}
        <div className="py-5">
          <button
            className="material-symbols-outlined absolute top-2 left-2 text-third"
            onClick={() => setAddNewUser(true)}>
            person_add
          </button>
          <h1 className="text-center font-semibold text-xl text-third">
            {selectedChat == undefined ? "" : selectedChat.chatName}
          </h1>
          {!loading ? (
            ""
          ) : (
            <img
              src={ring}
              alt=""
              className="w-10 ml-auto absolute top-0 right-0"
            />
          )}
        </div>
        <div className="border border-third h-64 mb-5 overflow-y-auto px-5">
          {selectedChat == undefined
            ? ""
            : selectedChat.users.map((acc) => {
                return (
                  <CardAccGroup
                    key={acc._id}
                    name={acc.name}
                    email={acc.email}
                    pic={acc.pic}
                    id={acc._id}
                    setLoading={setLoading}
                  />
                );
              })}
        </div>
        <div className="flex h-10 px-4 justify-end">
          <input
            type="text"
            placeholder="Rename group?"
            className="bg-transparent px-3 border-b-2 border-third outline-none"
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            className="p-1 bg-third rounded-md text-white"
            onClick={() => renameGroup()}>
            Rename
          </button>
        </div>
        <div className="h-16 flex justify-center items-center">
          <button
            className="h-10 px-3 rounded-md bg-red-500 text-white mr-3"
            onClick={() => leaveHandler()}>
            Leave
          </button>
          <button
            className="h-10 px-3 rounded-md bg-third text-white"
            onClick={() => setGroupDetail(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
