import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='max-w-7xl mx-auto  px-4 md:px-8 xl:px-0' >
      <p className='text-white mt-10 text-center mb-2 text-[12px]'>Created using NASA&apos;s public APIs</p>
     <div className='flex justify-center gap-5 items-center w-full'>
     <Link href="https://github.com/Kursatkeskin96" target='_blank' className=' text-gray-200 text-center mb-4 text-[12px] underline'>github</Link>
     <Link href="https://www.linkedin.com/in/kursatkeskinn" target='_blank' className='text-gray-200 text-center mb-4 text-[12px] underline'>linkedin</Link>
     </div>
    </div>
  )
}
