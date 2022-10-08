import { useEffect, useRef } from "react"
import { isLastMessage, isSameSender, isSameSenderMargin, isSameSenderMarginOneChat, isSameUser } from "../config/ChatLogic"
import { ChatState } from '../context/chatProvider'
export function ScrollAbleChat({ messages }) {
  const { user,selectedChat } = ChatState() 
  const messagesEndRef = useRef(null)
  useEffect(() => {
   messagesEndRef.current?.scrollIntoView()
  }, [messages])
  
  return (
    <div className="overflow-y-auto">
      {selectedChat === undefined ? (
        ""
      )
        :
        (
          selectedChat.isGroupChat ? (
            messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id} className="px-3">
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <div style={{backgroundImage: `url(${m.sender.pic})`}} className="w-10 h-10 rounded-full bg-cover bg-center"></div>
            )}
            <span
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                padding: "5px 15px",
                maxWidth: "75%",
              }}
              className={`${m.sender._id === user._id ? "rounded-tl-3xl rounded-b-3xl bg-secondary" : "rounded-tr-3xl rounded-b-3xl bg-third text-white"
            }`}
            >
              {m.content}
            </span>
          </div>
        ))
          )
            :
            (
              messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id} className="px-3">
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <></>
            )}
            <span
              style={{
                marginLeft: isSameSenderMarginOneChat(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                padding: "5px 15px",
                maxWidth: "75%",
              }}
              className={`${m.sender._id === user._id ? "rounded-tl-3xl rounded-b-3xl bg-secondary" : "rounded-tr-3xl rounded-b-3xl bg-third text-white"
            }`}
            >
              {m.content}
            </span>
          </div>
        ))
            )
     )}
      <div ref={messagesEndRef}></div>
    </div>
  )
}