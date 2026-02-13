import React from 'react'
import InputSender from './InputSender.jsx'
import Messages from './Messages.jsx'

const MessageContainer = () => {
  return (
    <div className='w-full p-2'>
        MessageContainer
        <Messages/>
        <InputSender/>
    </div>
  )
}

export default MessageContainer