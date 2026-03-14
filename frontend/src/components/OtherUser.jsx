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
        <div
            onClick={() => selectedUserHandler(user)}
            className={`flex gap-2 items-center rounded-xl p-2 cursor-pointer transition-colors bg-white/5 hover:bg-white/10 ${
              selectedUser?._id === user?._id ? "bg-white/10 border border-white/10" : "border border-transparent"
            }`}
        >
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
                <div className="w-12 rounded-full ring-2 ring-white/10">
                    <img src={user?.profilePhoto} alt="" />
                </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user?.fullName}</p>
            </div>
        </div>
        <div className="border-b border-white/10 my-0 mx-2" />
    </div>
  )
}

export default OtherUser