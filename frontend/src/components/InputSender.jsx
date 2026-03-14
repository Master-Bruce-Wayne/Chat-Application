import React, {useState} from 'react';
import {IoSend} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { setMessages } from '../redux/messageSlice.js';

const InputSender = () => {
  const [msg,setMsg]= useState("");
  const dispatch=useDispatch();
  const {authUser,selectedUser} = useSelector(store=>store.user);
  const {messages} =useSelector(store=>store.message);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    // console.log("selected user: ",selectedUser._id);
    if(!selectedUser)  return;

    try{
      // axios.defaults.withCredentials=true;
      const res=await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUser?._id}`, {message:msg}, {
        headers: {
          'Content-Type':'application/json'
        },
        withCredentials:true
      });

      // console.log(res);
      // alert('msg sent successfully!');
      dispatch(setMessages([...messages, res?.data?.msg]));
    } catch(err) {
      console.log(err);
    } finally {
      setMsg("");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="w-full px-4 py-3 shrink-0">
        <div className="w-full relative rounded-full bg-white/5 border border-white/10 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-shadow">
            <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Send a message..."
                className="w-full pl-5 pr-12 py-3 bg-transparent text-white placeholder:text-slate-400 text-sm rounded-full focus:outline-none"
            />
            <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center pr-4 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
                <IoSend className="text-indigo-400 w-5 h-5" />
            </button>
        </div>
    </form>
  )
}

export default InputSender