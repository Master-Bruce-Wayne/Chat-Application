import React, { useState } from 'react'
import {BiSearchAlt2} from "react-icons/bi"
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
    <div className='border-r border-slate-500 p-4 flex flex-col min-w-1/3 max-w-5/12'>
        <form onSubmit={handleFormSubmit} className='flex items-center gap-2'>
            <input 
                type="text" 
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                className='bg-white text-black input input-bordered rounded-md' placeholder='Search...'
            />
            <button type='submit' className='btn text-white bg-zinc-500 border border-white hover:cursor-pointer'>
                <BiSearchAlt2 className='w-6 h-6 outline-none'/>
            </button>

        </form>
        <div className="divider divider-neutral"></div>

        <OtherUsers/>

        <div className='mt-2'>
            <button 
            className='btn btn-sm'
            onClick={handleLogout}
            >Logout</button>
        </div>
    </div>
  )
}

export default Sidebar