import React from 'react'
import {BiSearchAlt2} from "react-icons/bi"
import OtherUsers from './OtherUsers.jsx'
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async() => {
        try {
            const res=await axios.get("http://localhost:8000/api/v1/user/logout");
            navigate("/login");
            toast.success(res.data.message);
        } catch(err) {
            // console.log(err);
            toast.error(res.error.data.message);
        }
    }
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col w-1/2'>
        <form className='flex items-center gap-2'>
            <input 
                type="text" className='bg-white text-black input input-bordered rounded-md' placeholder='Search...'
            />
            <button type='submit' className='btn text-white bg-zinc-500 border border-white'>
                <BiSearchAlt2 className='w-6 h-6 outline-none'/>
            </button>

        </form>
        <div className="divider divider-neutral"></div>

        <OtherUsers/>

        <div className='mt-2'>
            <button 
            className='btn btn-sm'
            onClick={handleLogout}
            >Logout</button>
        </div>
    </div>
  )
}

export default Sidebar