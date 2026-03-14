import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({message}) => {
    const scroll =useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // for scroll-behaviour (imp)
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);

  const isSent = message.senderId === authUser?._id;

  return (
    <div ref={scroll} className={`flex gap-2 mb-3 ${isSent ? "flex-row-reverse" : "flex-row"}`}>
        <div className="avatar shrink-0">
            <div className="w-9 rounded-full ring-2 ring-white/10">
                <img
                    alt=""
                    src={isSent ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                />
            </div>
        </div>
        <div className={`flex flex-col max-w-[75%] ${isSent ? "items-end" : "items-start"}`}>
            <time className="text-xs text-slate-400 mb-0.5">{formatTime(message?.createdAt)}</time>
            <div
                className={`px-4 py-2.5 text-white ${
                    isSent
                        ? "bg-indigo-600/30 border border-indigo-400/20 rounded-2xl rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-slate-200 rounded-2xl rounded-tl-none"
                }`}
            >
                {message?.message}
            </div>
        </div>
    </div>
  )
}

export default Message