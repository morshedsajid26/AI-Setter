import Sidebar from '@/src/components/Sidebar'
import Topbar from '@/src/components/Topbar'
import React from 'react'

const layout = ({children}) => {
  return (
   <div className='bg-[#EAEAEA]'>
       <div className="flex h-screen overflow-hidden ">
          
        
            <Sidebar/>
         

         
          <div className="flex-1 flex flex-col min-w-0 min-h-0  ">
           
            <div className=''>
              <Topbar />
            </div>

         
            <main className="flex-1 min-h-0 overflow-y-auto hide-scrollbar  pt-6 pb-[50px] px-6 ">
            <div className="w-full max-w-full overflow-x-hidden">
            {children}
            </div>
          </main>


          </div>
        </div>
    </div>
  )
}

export default layout
