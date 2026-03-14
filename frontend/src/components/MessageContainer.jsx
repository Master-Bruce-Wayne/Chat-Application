import React, { useEffect } from 'react'
import InputSender from './InputSender.jsx'
import Messages from './Messages.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice.js'

const MessageContainer = () => {
  const {authUser,selectedUser} = useSelector(store=>store.user);
  const dispatch=useDispatch();
  useEffect(()=> {
    if(authUser===null) dispatch(setSelectedUser(null));
  })

  return (
    <>
      {selectedUser !== null ? (
        <div className="w-full h-full flex flex-col min-h-0 overflow-hidden">
            <div className="flex gap-3 items-center bg-black/20 border-b border-white/10 px-4 py-3 shrink-0">
              <div className="avatar online">
                <div className="w-10 rounded-full ring-2 ring-white/10">
                  <img src={selectedUser?.profilePhoto} alt="" />
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{selectedUser?.fullName}</p>
              </div>
            </div>

            <div className="flex-1 overflow-auto min-h-0">
              <Messages />
            </div>

            <InputSender />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center flex-wrap p-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Hi, {authUser?.fullName}</h1>
          <p className="text-slate-400 text-lg sm:text-xl mt-2">Let&apos;s start some conversation!</p>
        </div>
      )}
    </>
  )
}

export default MessageContainer