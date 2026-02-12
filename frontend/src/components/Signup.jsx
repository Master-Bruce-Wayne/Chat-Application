import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast';

const Signup = () => {
    const [user,setUser]=useState({
        fullName:"", username:"", password:"",
        confirmPassword:"", gender:""
    });
    const navigate =useNavigate();

    const handleGender = (gender) => {
        setUser({...user,gender:gender});
    };

    const onSubmitHandler = async(e) => {
        e.preventDefault(); 
        // console.log(user);

        try{
            const res=await axios.post('http://localhost:8000/api/v1/user/register', user, {
                headers: { 'Content-Type':'application/json' },
                withCredentials:true
            });
            // console.log(res);

            if(res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch(err) {
            console.log(err);
        } finally{
            setUser({
                fullName:"", username:"", password:"",
                confirmPassword:"", gender:""
            });
        }
    };

  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-black'>
            <h1 className='text-3xl font-bold text-center'>Signup</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input 
                    value={user.fullName}
                    onChange={(e)=> setUser({...user,fullName:e.target.value})}
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="text" 
                    placeholder='Full Name' />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input 
                    value={user.username}
                    onChange={(e)=> setUser({...user,username:e.target.value})}
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

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input 
                    value={user.confirmPassword}
                    onChange={(e)=> setUser({...user,confirmPassword:e.target.value})}
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="password" 
                    placeholder='Confirm Password' />
                </div>

                <div className='flex items-center my-4'>
                    <div className='flex items-center'>
                        <p>Male: </p>
                        <input 
                        type="checkbox" 
                        checked={user.gender === "male"}
                        onChange={()=>handleGender("male")}
                        // defaultChecked 
                        className="checkbox checkbox-neutral mx-2" />
                    </div>
                    <div className='flex items-center'>
                        <p>Female: </p>
                        <input 
                        type="checkbox" 
                        checked={user.gender === "female"}
                        onChange={()=>handleGender("female")}
                        // defaultChecked 
                        className="checkbox checkbox-neutral mx-2" />
                    </div>
                </div>
                
                <Link to='/login'>
                    Already have an account? 
                    <span className='text-blue-600'>{" "}Login</span>
                </Link>

                <div>
                    <button type='submit' className=' px-2 btn btn-block btn-sm mt-2 border border-slate-700'>SignUp</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup