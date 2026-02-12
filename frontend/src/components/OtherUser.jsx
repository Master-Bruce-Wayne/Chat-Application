import React from 'react'

const OtherUser = () => {
  return (
    <div>
        <div className='flex gap-2 items-center hover:bg-zinc-100 rounded p-2 cursor-pointer'>
            <div className='avatar avatar-online'>
                <div className='w-12 rounded-full'>
                    <img src="https://i.pinimg.com/1200x/82/54/65/825465db4b7282e95543c1b27bd372cb.jpg" alt="" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                    <p>Sujal Agarwal</p>
                </div>
            </div>
        </div>

        <div className='divider bg-gray-300 my-0 py-0 h-[1px]'></div>
    </div>
  )
}

export default OtherUser