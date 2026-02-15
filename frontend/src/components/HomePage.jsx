import React, { useEffect } from 'react'
import Sidebar from './Sidebar.jsx'
import MessageContainer from './MessageContainer.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector(store=>store.user);

  useEffect(() => {
    if(!authUser) { navigate('/login'); return; }
  }, [authUser]);

  return (
    <div className='flex w-full sm:w-11/12 h-[450px] sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-transparent bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 border border-gray-400 text-black'>
      <Sidebar />
      <MessageContainer/>
    </div>
  )
}

export default HomePage