import Bredcumb from '@/src/components/Bredcumb'
import SocialMediaChannels from '@/src/components/SocialMediaChannels'
import React from 'react'

const Integrations = () => {
  return (
    <div>
        <div>
          <Bredcumb />
          <p className="text-[#606060] font-inter mt-2">
           Connect your social channels, CRM, and tools, API
          </p>
        </div>

        <div className='mt-8'>
<p className='font-inter text-[#0F172B] font-semibold'>Social Media Channels</p>
        <SocialMediaChannels/>
        </div>

      
    </div>
  )
}

export default Integrations
