import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';

const useGetRealMsgs = () => {
    const {socket} = useSelector(store=>store.socket);
    const {messages} =useSelector(store=>store.message);
    const dispatch = useDispatch();

    useEffect(()=> {
        socket?.on("new-message", (msg) => {
            console.log(messages);
            console.log(msg);
            dispatch(setMessages([...messages,msg]));
        })
    },[socket, setMessages, messages]);
}

export default useGetRealMsgs;