import React, { useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealMsgs from '../hooks/useGetRealMsgs'

const Messages = () => {
  useGetMessages();
  useGetRealMsgs();
  const {messages} = useSelector(store=>store.message);
  if(!messages) { return; }

  return (
    <div className="px-4 py-3 flex-1 overflow-auto min-h-0">
      {messages?.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  )
}

export default Messages