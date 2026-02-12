import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
    const [user,setUser]=useState({ username:"", password:"" });
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const onSubmitHandler = async(e) => {
        e.preventDefault(); 
        // console.log(user);
        try{
            const res=await axios.post('http://localhost:8000/api/v1/user/login', user, {
                headers: { 'Content-Type':'application/json' },
                withCredentials:true
            });
            // console.log(res);

            if(res.data.success) {
                navigate("/");
                dispatch(setAuthUser(res.data));
                toast.success(res.data.message || "Logged in successfully!");
            }
        } catch(err) {
            // console.log(err);
            toast.error(err.response.data.message || "Failed to login");
        } finally{
            setUser({ username:"", password:"" });
        }
    };

  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-black'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input 
                    value={user.username}
                    onChange={(e)=> setUser({...user, username:e.target.value})}
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="text" 
                    placeholder='Username' />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input 
                    value={user.password}
                    onChange={(e)=> setUser({...user,password:e.target.value})}
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="password" 
                    placeholder='Password' />
                </div>
                
                <Link to='/register'>
                    Don't have an account? 
                    <span className='text-blue-600'>{" "}Signup</span>
                </Link>

                <div>
                    <button type='submit' className=' px-2 btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login