import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-1'>
        <div>
        <img src={assets.exchange_icon}  className='w-12  m-auto mb-5'/>
        <h1 className='font-semibold'>Free Exchange policy</h1>
        <p className='text-gray-600 text-sm w-3/4 m-auto'>we offering fee exchange policy </p>
        </div>

           <div>
        <img src={assets.quality_icon}  className='w-12  m-auto mb-5'/>
        <h1 className='font-semibold'>7 Day Return Policy</h1>
        <p className='text-gray-600 text-sm w-3/4 m-auto'>Easy return within 7 days</p>
        </div>

           <div>
        <img src={assets.support_img}  className='w-12  m-auto mb-5'/>
        <h1 className='font-semibold'>Customer Support</h1>
        <p className='text-gray-600 text-sm w-3/4 m-auto'>we Provide 27/7 Customer Support </p>
        </div>
 
    </div>
  )
}

export default OurPolicy