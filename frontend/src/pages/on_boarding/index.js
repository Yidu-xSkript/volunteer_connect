import { useState } from "react";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

function OnBoarding() {
  const wizards = [
    "Welcome",
    "Basic Information",
    "Resume"
  ]
  const [selectedPill, setPill] = useState(0)
  const handleSetPill = (i) => {
    if (i >= 0 && i < wizards.length) setPill(i)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-auth h-full absolute top-0 bottom-0 block">
        <div className="p-16">
          {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}
          <h1 className="text-5xl font-bold z-10 relative mb-32">Logo</h1>
          {wizards.map((w, i) => (
            <div key={i} className="flex items-start space-x-4 my-2">
              <div className="flex flex-col items-center">
                <span className={`h-8 w-8 rounded-full border border-black ${selectedPill === i ? 'bg-primary' : 'bg-transparent'}`} />
                {i < wizards.length - 1 && <span className="border h-10 border-black mt-2" />}
              </div>
              <h3 className={`text-2xl select-none font-semibold ${selectedPill === i ? 'text-black' : 'text-gray-400'}`}>{w}</h3>
            </div>
          ))}
        </div>
        <div className="absolute select-none bottom-10 left-0 p-8 shadow bg-white border border-gray-100 uppercase tracking-[0.5rem] font-semibold text-3xl rounded-tr-full rounded-br-full">
          {wizards[selectedPill]}
        </div>
      </div>
      <div className='w-1/3 h-full' />
      <div className="w-2/3 p-16">
        {/* Nav */}
        <div className="flex justify-between items-center">
          <ChevronLeftIcon className="w-16 p-5 hover:bg-[#F5F9F9] rounded-full cursor-pointer" onClick={handleSetPill(selectedPill - 1)}/>
          <div className="text-xl font-semibold">
            <span className="text-gray-400">{selectedPill + 1}/</span><span className="text-primary">{wizards.length}</span>
          </div>
        </div>
        {/* Wizard Content */}
        
      </div>
    </div>
  )
};

export default OnBoarding;