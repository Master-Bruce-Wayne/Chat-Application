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
    <form onSubmit={onSubmitHandler} className='w-full px-2 my-3 border border-white'>
        <div className='w-full relative'>
            <input 
            type="text" 
            value={msg}
            onChange={(e)=>setMsg(e.target.value)}
            placeholder='Send a message...' 
            className='px-4 py-2 border text-sm rounded-lg block w-full p-3 border-white bg-gray-600 text-white'  
            />

            <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4 hover:cursor-pointer'>
                <IoSend className='text-white'/>
            </button>
        </div>
    </form>
  )
}

export default InputSender