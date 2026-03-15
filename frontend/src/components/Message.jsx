import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { CheckCheck } from 'lucide-react'

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(store => store.user);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Smooth auto-scroll on new messages
    useEffect(() => {
        scroll.current?.scrollIntoView({behavior:"smooth"});
    }, [message]);

  const isSent = message.senderId === authUser?._id;

  return (
    <div ref={scroll} className={`flex gap-2.5 mb-4 ${isSent ? "flex-row-reverse" : "flex-row"}`}>

        {/* Avatar */}
        <div className="shrink-0 self-end">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                <img
                    alt=""
                    src={isSent ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

        {/* Bubble + meta */}
        <div className={`flex flex-col max-w-[72%] ${isSent ? "items-end" : "items-start"}`}>
            <div
                className={`px-4 py-2.5 text-white text-sm leading-relaxed ${
                    isSent
                        ? "bg-indigo-600/40 border border-indigo-400/30 rounded-2xl rounded-br-sm shadow-[0_2px_12px_rgba(99,102,241,0.25)]"
                        : "bg-white/8 border border-white/10 text-slate-100 rounded-2xl rounded-bl-sm"
                }`}
            >
                {message?.message}
            </div>

            {/* Timestamp + read status */}
            <div className="flex items-center gap-1 mt-1">
                <time className="text-[11px] text-slate-500">{formatTime(message?.createdAt)}</time>
                {isSent && (
                    <CheckCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-indigo-400" />
                )}
            </div>
        </div>
    </div>
  )
}

export default Message