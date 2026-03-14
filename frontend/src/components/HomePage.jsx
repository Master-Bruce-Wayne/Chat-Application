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
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl h-[85vh] flex overflow-hidden bg-slate-900/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl text-white">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage