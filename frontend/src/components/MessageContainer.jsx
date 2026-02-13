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
      {
        selectedUser !== null ?
          <div className='w-full flex flex-col'>
            <div className='flex gap-5 items-center bg-zinc-800 text-white p-2'>
              <div className='avatar online'>
                <div className='w-8 rounded-full'>
                  <img src={(selectedUser?.profilePhoto)} />
                </div>
              </div>
              <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                  <p>{selectedUser?.fullName}</p>
                </div>
              </div>
            </div>

            <div className='flex-1 overflow-auto'>
              <Messages className='flex-1'/>
            </div>

            <InputSender/>
          </div>
          : 
            <div>
              <p>Let's start a conversation!</p>
            </div>
      }
    </>
  )
}

export default MessageContainer