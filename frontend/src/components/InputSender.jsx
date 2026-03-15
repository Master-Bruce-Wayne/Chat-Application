import React, {useState} from 'react';
import { Paperclip, SendHorizontal } from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { setMessages } from '../redux/messageSlice.js';

const InputSender = () => {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const {authUser, selectedUser} = useSelector(store => store.user);
  const {messages} = useSelector(store => store.message);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    if(!selectedUser) return;

    try{
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,
        {message: msg},
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      dispatch(setMessages([...messages, res?.data?.msg]));
    } catch(err) {
      console.log(err);
    } finally {
      setMsg("");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="w-full px-4 py-3 shrink-0 border-t border-white/5">
        <div className="w-full flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 focus-within:ring-1 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/30 transition-all px-3 py-1">

            {/* Attachment icon (UI only) */}
            <button
                type="button"
                className="flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Attach file"
            >
                <Paperclip strokeWidth={1.5} className="w-4.5 h-4.5" />
            </button>

            {/* Message input */}
            <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 py-2.5 bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none"
            />

            {/* Send button */}
            <button
                type="submit"
                className={`flex items-center justify-center p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    msg.trim()
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                        : "text-slate-500 hover:text-slate-400 hover:bg-white/5"
                }`}
                aria-label="Send message"
            >
                <SendHorizontal strokeWidth={1.5} className="w-4.5 h-4.5" />
            </button>
        </div>
    </form>
  )
}

export default InputSender