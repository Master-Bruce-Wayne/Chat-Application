import React from 'react'
import {IoSend} from "react-icons/io5";

const InputSender = () => {
  return (
    <form className='w-full px-2 my-3'>
        <div className='w-full relative'>
            <input 
            type="text" 
            placeholder='Send a message...' 
            className='px-4 py-2 border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'  
            />

            <button className='absolute flex inset-y-0 end-0 items-center pr-4'>
                <IoSend className='text-white'/>
            </button>
        </div>
    </form>
  )
}

export default InputSender