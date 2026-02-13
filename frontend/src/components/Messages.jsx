import React, { useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'

const Messages = () => {
  const {selectedUser} = useSelector(store=>store.user);
  useGetMessages(selectedUser);
  
  return (
    <div className='px-4 flex-1 overflow-auto'>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default Messages