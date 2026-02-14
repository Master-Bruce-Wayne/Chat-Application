import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice.js';

const OtherUser = ({user}) => {
    const dispatch=useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);
    const selectedUserHandler = async(user) => {
        dispatch(setSelectedUser(user));
    }

  return (
    <div>
        <div onClick={()=>selectedUserHandler(user)} className={` ${(selectedUser?._id===user?._id)?'bg-zinc-100':''} flex gap-2 items-center hover:bg-zinc-100 rounded p-2 cursor-pointer`}>
            <div className={`avatar ${isOnline?'avatar-online':''} `}>
                <div className='w-12 rounded-full'>
                    <img src={user?.profilePhoto} alt="" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                    <p>{user?.fullName}</p>
                </div>
            </div>
        </div>

        <div className='divider bg-gray-300 my-0 py-0 h-[1px]'></div>
    </div>
  )
}

export default OtherUser