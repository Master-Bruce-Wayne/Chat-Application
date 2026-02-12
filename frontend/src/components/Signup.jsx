import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-black'>
            <h1 className='text-3xl font-bold text-center'>Signup</h1>
            <form action="">
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input 
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="text" 
                    placeholder='Full Name' />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input 
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="text" 
                    placeholder='Username' />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input 
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="password" 
                    placeholder='Password' />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input 
                    className='w-full p-3 rounded-md input input-bordered h-10 bg-white'
                    type="password" 
                    placeholder='Confirm Password' />
                </div>

                <div className='flex items-center my-4'>
                    <div className='flex items-center'>
                        <p>Male: </p>
                        <input type="checkbox" defaultChecked className="checkbox checkbox-neutral mx-2" />
                    </div>
                    <div className='flex items-center'>
                        <p>Female: </p>
                        <input type="checkbox" defaultChecked className="checkbox checkbox-neutral mx-2" />
                    </div>
                </div>
                
                <Link to='/login'>
                    Already have an account? 
                    <span className='text-blue-600'>{" "}Login</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default Signup