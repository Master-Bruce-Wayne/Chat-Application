import React, { useEffect, useState } from 'react'
import { Search, LogOut, Users } from 'lucide-react'
import OtherUsers from './OtherUsers.jsx'
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOnlineUsers, setOtherUsers, setOtherUsersOrig, setSelectedUser } from '../redux/userSlice.js';
import { setMessages } from '../redux/messageSlice.js';
import { setSocket } from '../redux/socketSlice.js';

const Sidebar = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authUser, otherUsersOrig, onlineUsers} = useSelector(store => store.user);
    const {messages} = useSelector(store => store.message);
    const {socket} = useSelector(store => store.socket);

    useEffect(() => {
        if(searchText === "") {
            dispatch(setOtherUsers(otherUsersOrig));
        }
    }, [searchText]);

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const conversationUsers = otherUsersOrig?.find((user) => user.fullName.toLowerCase().includes(searchText.toLowerCase()));

        if(conversationUsers) {
            dispatch(setOtherUsers([conversationUsers]));
        } else {
            toast.error("Search result not found!");
        }
    }

    const handleLogout = async() => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/logout");
            const currOnlineUsers = onlineUsers.filter(uId => uId !== authUser?._id);

            dispatch(setOnlineUsers(currOnlineUsers));
            dispatch(setAuthUser(null)); dispatch(setSelectedUser(null));
            dispatch(setOtherUsers(null)); dispatch(setMessages(null));
            dispatch(setOtherUsersOrig(null));
            socket?.disconnect();
            dispatch(setSocket(null));
            navigate("/login");
            toast.success(res.data.message);
        } catch(err) {
            toast.error("Failed to logout");
        }
    }

  return (
    <div className="h-full border-r border-white/10 bg-black/20 backdrop-blur-md flex flex-col min-w-[240px] max-w-[320px] relative">

        {/* User profile header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 shrink-0">
            <div className="avatar shrink-0">
                <div className="w-10 rounded-full ring-2 ring-indigo-500/40">
                    <img src={authUser?.profilePhoto} alt={authUser?.fullName} />
                </div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <p className="text-white font-semibold text-sm truncate">{authUser?.fullName}</p>
                <p className="text-slate-400 text-xs truncate">@{authUser?.username}</p>
            </div>
        </div>

        {/* Search bar */}
        <div className="px-4 pt-4 pb-2 shrink-0">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                        placeholder="Search conversations..."
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-full p-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    aria-label="Search"
                >
                    <Search strokeWidth={1.5} className="w-4 h-4" />
                </button>
            </form>
        </div>

        {/* Chats section label */}
        <div className="flex items-center gap-2 px-4 pb-2 pt-1 shrink-0">
            <Users strokeWidth={1.5} className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Chats</span>
        </div>

        <div className="border-t border-white/10 shrink-0" />

        {/* Users list */}
        <OtherUsers />

        {/* Logout */}
        <div className="mt-auto px-4 py-4 border-t border-white/10 shrink-0">
            <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 hover:text-red-300 btn-glow-red transition-all cursor-pointer"
            >
                <LogOut strokeWidth={1.5} className="w-4 h-4" />
                Logout
            </button>
        </div>
    </div>
  )
}

export default Sidebar