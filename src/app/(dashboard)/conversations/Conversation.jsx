import Bredcumb from '@/src/components/Bredcumb'
import React from 'react'

const Conversation = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='bg-white col-span-3 '>
        <div>
            <Bredcumb/>
        </div>
      </div>
       <div className='bg-red-200 col-span-6 '>1</div>
        <div className='bg-white col-span-3'>1</div>
    </div>
  )
}

export default Conversation
