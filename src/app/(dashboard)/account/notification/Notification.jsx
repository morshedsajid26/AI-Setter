import NotificationAlert from '@/src/components/NotificationAlert'
import React from 'react'

const Notification = () => {
  return (
    <div>
         <div className='bg-white p-6 rounded-2xl mb-8'>
        <p className='font-inter text-[#0A0A0A]'>
            Notification Preferences
        </p>

        <p className='text-[#717182] font-inter mb-6 mt-1.5'>
            Choose what notifications you want to receive
        </p>

        <div className='space-y-4' >

            <NotificationAlert
            title={`New leads`}
            subtitle={`Get notified when a high-value lead is identified`}
            />
            <NotificationAlert
            title={`Bookings`}
            subtitle={`Alerts for new bookings and changes`}
            />
            <NotificationAlert
            title={`Sync failures`}
            subtitle={`Notify when CRM sync fails`}
            />
            <NotificationAlert
            title={`Weekly reports`}
            subtitle={`Receive weekly performance summaries`}
            />
            <NotificationAlert
            title={`Email notifications`}
            subtitle={`Send notifications to your email`}
            />
        </div>

       

      </div>
      

      <div className='bg-white p-6 rounded-2xl'>
        <p className='font-inter text-[#0A0A0A]'>
            Danger Zone
        </p>

        <p className='text-[#717182] font-inter mb-6 mt-1.5'>
            Irreversible account actions
        </p>

        <button className='border border-[#FFC9C9] rounded-lg w-full text-center py-2 text-[#E7000B] font-inter cursor-pointer'>
            Delete Account
        </button>

      </div>
    </div>
  )
}

export default Notification
