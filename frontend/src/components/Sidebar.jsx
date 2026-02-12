import React from 'react'
import {BiSearchAlt2} from "react-icons/bi"
import OtherUsers from './OtherUsers.jsx'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <form className='flex items-center gap-2'>
            <input 
                type="text" className='bg-white text-black input input-bordered rounded-md' placeholder='Search...'
            />
            <button type='submit' className='btn text-white bg-zinc-500'>
                <BiSearchAlt2 className='w-6 h-6 outline-none'/>
            </button>

        </form>
        <div className="divider divider-neutral"></div>
        <OtherUsers/>
    </div>
  )
}

export default Sidebar