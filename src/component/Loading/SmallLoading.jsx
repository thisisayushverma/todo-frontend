import React from 'react'
import loadingIcon from '../../assets/icon-loader.gif'

function SmallLoading() {
  return (
    <div className='flex justify-center items-center'>
        <div className='h-8 w-8 rounded-full border-[#e4e5f1] border-b-3 animate-spin'>
        </div>
    </div>
  )
}

export default SmallLoading
