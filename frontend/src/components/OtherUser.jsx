import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice.js';

const OtherUser = ({user}) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store => store.user);
    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

    const selectedUserHandler = async(user) => {
        dispatch(setSelectedUser(user));
    }

  return (
    <div>
        <div
            onClick={() => selectedUserHandler(user)}
            className={`flex gap-3 items-center rounded-xl p-3 mx-2 cursor-pointer transition-all ${
              selectedUser?._id === user?._id
                ? "bg-indigo-500/15 border border-indigo-500/30 border-l-2 border-l-indigo-400"
                : "bg-transparent hover:bg-white/5 border border-transparent"
            }`}
        >
            {/* Avatar with online indicator */}
            <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/10">
                    <img src={user?.profilePhoto} alt={user?.fullName} className="w-full h-full object-cover" />
                </div>
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-slate-900 block" />
                )}
            </div>

            {/* Name + status */}
            <div className="flex flex-col min-w-0 flex-1">
                <p className="text-white font-medium text-sm truncate">{user?.fullName}</p>
                <p className={`text-xs truncate ${isOnline ? "text-green-400" : "text-slate-500"}`}>
                    {isOnline ? "Online" : "Offline"}
                </p>
            </div>
        </div>
        <div className="border-b border-white/5 my-0 mx-4" />
    </div>
  )
}

export default OtherUser