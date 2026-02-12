import React from 'react'
import Sidebar from './Sidebar.jsx'
import MessageContainer from './MessageContainer.jsx'

const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-transparent bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 border border-gray-400 text-black'>
      <Sidebar />
      <MessageContainer/>
    </div>
  )
}

export default HomePage