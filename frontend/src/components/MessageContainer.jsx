import React, { useEffect, useState } from 'react'
import InputSender from './InputSender.jsx'
import Messages from './Messages.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice.js'
import { MessageSquareDashed } from 'lucide-react'

const MessageContainer = () => {
  const [isActive, setIsActive] = useState(false);
  const {authUser, selectedUser, onlineUsers} = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(authUser === null) dispatch(setSelectedUser(null));
    if(selectedUser !== null) { setIsActive(onlineUsers.includes(selectedUser._id)); }
    else setIsActive(false);
  }, [selectedUser, onlineUsers])

  return (
    <>
      {selectedUser !== null ? (
        <div className="w-full h-full flex flex-col min-h-0 overflow-hidden">

            {/* Chat header */}
            <div className="flex gap-3 items-center bg-black/20 border-b border-white/10 px-5 py-3.5 shrink-0">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-500/40">
                  <img src={selectedUser?.profilePhoto} alt={selectedUser?.fullName} className="w-full h-full object-cover" />
                </div>
                {/* Status dot */}
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-slate-900 block transition-colors ${isActive ? "bg-green-400" : "bg-slate-500"}`} />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{selectedUser?.fullName}</p>
                <p className={`text-xs font-medium transition-colors ${isActive ? "text-green-400" : "text-slate-400"}`}>
                  {isActive ? "Active now" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-auto min-h-0">
              <Messages />
            </div>

            <InputSender />
        </div>
      ) : (
        /* Empty state */
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center gap-4">
          <div className="p-6 rounded-full bg-white/3 border border-white/5">
            <MessageSquareDashed strokeWidth={1} className="w-20 h-20 text-white opacity-10" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Hi, {authUser?.fullName?.split(" ")[0]} 👋
            </h1>
            <p className="text-slate-400 text-base sm:text-lg mt-2">
              Select a conversation to start chatting
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageContainer