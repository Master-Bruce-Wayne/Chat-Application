import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi"
import { IoLogOutOutline } from "react-icons/io5"
import OtherUsers from './OtherUsers.jsx'
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOnlineUsers, setOtherUsers, setOtherUsersOrig, setSelectedUser } from '../redux/userSlice.js';
import { setMessages } from '../redux/messageSlice.js';
import { setSocket } from '../redux/socketSlice.js';

const Sidebar = () => {
    const [searchText,setSearchText]= useState("");
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const {authUser, otherUsersOrig, onlineUsers}=useSelector(store=>store.user);
    const {messages}=useSelector(store=>store.message);
    const {socket}=useSelector(store=>store.socket);

    useEffect(() => {
        if(searchText==="") {
            dispatch(setOtherUsers(otherUsersOrig));
        }
    }, [searchText]);

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const conversationUsers = otherUsersOrig?.find((user)=> user.fullName.toLowerCase().includes(searchText.toLowerCase()));

        if(conversationUsers) {
            dispatch(setOtherUsers([conversationUsers]));
        } else{
            toast.error("Search result not found!");
        }
    }

    const handleLogout = async() => {
        try {
            const res=await axios.get("http://localhost:8000/api/v1/user/logout");
            const currOnlineUsers = onlineUsers.filter(
                uId => uId!==authUser?._id
            );

            // console.log(currOnlineUsers);
            dispatch(setOnlineUsers(currOnlineUsers));
            dispatch(setAuthUser(null)); dispatch(setSelectedUser(null));
            dispatch(setOtherUsers(null)); dispatch(setMessages(null));
            dispatch(setOtherUsersOrig(null));
            socket?.disconnect();
            dispatch(setSocket(null));
            navigate("/login");
            toast.success(res.data.message);
        } catch(err) {
            // console.log(err);
            toast.error(res.error.data.message);
        }
    }
  return (
    <div className="h-full border-r border-white/10 bg-black/20 backdrop-blur-md p-4 flex flex-col min-w-1/3 max-w-5/12 relative">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2 shrink-0">
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-slate-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                placeholder="Search..."
            />
            <button
                type="submit"
                className="rounded-full p-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
                <BiSearchAlt2 className="w-5 h-5" />
            </button>
        </form>
        <div className="border-t border-white/10 my-3 shrink-0" />

        <OtherUsers />

        <div className="mt-auto pt-4 pb-1">
            <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-red-600/80 hover:bg-red-500 border border-red-500/30 text-white transition-colors cursor-pointer"
            >
                <IoLogOutOutline className="w-5 h-5" />
                Logout
            </button>
        </div>
    </div>
  )
}

export default Sidebar