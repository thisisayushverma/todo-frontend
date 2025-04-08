import React from 'react'

function Error({message="Error!"}) {
  return (
    <div className='text-5xl flex flex-col justify-center items-center'>
        <div className=''>⚠️</div>
        <p className=' text-[#890104] font-bold'>{message}</p>
    </div>
  )
}

export default Error
