import React from 'react'

const OtherUser = (props) => {
    const user=props.user;

  return (
    <div>
        <div className='flex gap-2 items-center hover:bg-zinc-100 rounded p-2 cursor-pointer'>
            <div className='avatar avatar-online'>
                <div className='w-12 rounded-full'>
                    <img src={user?.profilePhoto} alt="" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                    <p>{user?.fullName}</p>
                </div>
            </div>
        </div>

        <div className='divider bg-gray-300 my-0 py-0 h-[1px]'></div>
    </div>
  )
}

export default OtherUser