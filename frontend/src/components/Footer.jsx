import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Discover trend-led looks and wardrobe staples crafted for comfort, quality, and style—because getting dressed should feel as good as it looks.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>
                    <li>PRIVACY POLICY</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+94 123 456 789</li>
                    <li>contact@forever.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='text-center text-sm py-5'>Copyright 2025 @Forever.com - All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer