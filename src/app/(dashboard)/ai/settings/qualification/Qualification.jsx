import InputField from '@/src/components/InputField'
import React from 'react'

const Qualification = () => {
  return (
    <div>
       <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-6">
              <div className="mb-6">
                <p className="font-inter">Custom Qualification Questions</p>
                <p className="font-inter text-[#717182] mt-2">
                  Define what information to gather from leads
                </p>
              </div>
      
           <div className="space-y-4">
              <InputField                 
                readOnly={true}
                inputClass={`rounded-lg`}
                label={`Question 1`}
                placeholder={`What's your biggest challenge right now?`}
              />

              <InputField                 
                readOnly={true}
                inputClass={`rounded-lg`}
                label={`Question 2`}
                placeholder={`Have you worked with a coach before?`}
              />
              <InputField                 
                readOnly={true}
                inputClass={`rounded-lg`}
                label={`Question 3`}
                placeholder={`What's your timeline for getting started?`}
              />
              </div>

              <button className='border border-black/10 w-full text-center py-2 rounded-lg mt-4 font-inter'>
               + Add Question
              </button>
            </div>


            <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-6 mt-8">
              <div className="mb-6">
                <p className="font-inter">Lead Scoring Rules</p>
                <p className="font-inter text-[#717182] mt-2">
                  Customize how leads are scored based on responses
                </p>
              </div>
      
           <div className="space-y-4">
              <div className='flex justify-between items-center py-3 px-3 rounded-lg border border-black/10'>
                <p className='font-inter '>Mentions pricing or budget</p>
                <span className='font-inter text-sm p-1 text-[#008236] bg-[#DCFCE7] rounded-lg  '>
                  +20 points
                </span>
              </div>

              <div className='flex justify-between items-center py-3 px-3 rounded-lg border border-black/10'>
                <p className='font-inter '>Asks about timeline or availability</p>
                <span className='font-inter text-sm p-1 text-[#008236] bg-[#DCFCE7] rounded-lg  '>
                  +20 points
                </span>
              </div>

              <div className='flex justify-between items-center py-3 px-3 rounded-lg border border-black/10'>
                <p className='font-inter '>Shares specific pain point</p>
                <span className='font-inter text-sm p-1 text-[#008236] bg-[#DCFCE7] rounded-lg  '>
                  +20 points
                </span>
              </div>

              
              </div>

              <button className='border border-black/10 w-full text-center py-2 rounded-lg mt-4 font-inter'>
               + Add Rule
              </button>
            </div>
    </div>
  )
}

export default Qualification
