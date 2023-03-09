import { useState } from "react";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import welcome from '../../assets/on-boarding-welcome.svg';
import FormButton from "../../components/form/button";
import authCircle from '../../assets/vc-auth-circle-1.svg'

function OnBoarding() {
  const wizards = [
    "Welcome",
    "Basic Information",
    "Resume"
  ]
  const [selectedPill, setPill] = useState(0)
  const incrementPill = () => {
    if (selectedPill < wizards.length - 1) setPill(selectedPill + 1)
  }
  const decrementPill = () => {
    if (selectedPill > 0) setPill(selectedPill - 1)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-auth h-full absolute top-0 bottom-0 block">
        <img src={authCircle} className="w-64 z-0 absolute -top-20 -left-20 pointer-events-none select-none" alt="circle-bg" />
        <img src={authCircle} className="w-80 z-0 absolute -top-20 right-0 pointer-events-none select-none" alt="circle-bg" />
        <div className="p-16">
          {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}
          <h1 className="text-5xl text-black font-bold z-10 relative mb-32">Logo</h1>
          {wizards.map((w, i) => (
            <div key={i} className="flex items-start space-x-4 my-2">
              <div className="flex flex-col items-center">
                <span className={`h-8 w-8 rounded-full border border-black ${selectedPill >= i ? 'bg-primary' : 'bg-transparent'}`} />
                {i < wizards.length - 1 && <span className={`border h-10 mt-2 ${selectedPill > i ? 'border-primary' : 'border-black'}`} />}
              </div>
              <h3 className={`text-2xl select-none z-10 font-semibold ${selectedPill >= i ? 'text-black' : 'text-gray-400'}`}>{w}</h3>
            </div>
          ))}
        </div>
        <div className="absolute select-none bottom-10 left-0 p-8 shadow bg-white border border-gray-100 uppercase tracking-[0.4rem] font-semibold text-2xl rounded-tr-full rounded-br-full">
          {wizards[selectedPill]}
        </div>
      </div>
      <div className='w-1/4 h-full' />
      <div className="w-3/4 p-16">
        {/* Nav */}
        <div className="flex justify-between items-center">
          <ChevronLeftIcon className="w-16 p-5 hover:bg-[#F5F9F9] rounded-full cursor-pointer" onClick={decrementPill}/>
          <div className="text-xl font-semibold">
            <span className="text-gray-400">{selectedPill + 1}/</span><span className="text-primary">{wizards.length}</span>
          </div>
        </div>
        {/* Wizard Content */}
        <div className="flex flex-col items-center">
          {selectedPill === 0 &&
            <>
              <img src={welcome} className="w-2/4" alt="Welcome" />
              <h2 className="border-b-2 border-black font-semibold text-3xl pb-4 tracking-wide">Glad You're here, name!</h2>
              <h1 className="font-heading text-black text-5xl mt-5">Thank you <span className="text-primary">for donating your time.</span></h1>
            </>
          }
          {selectedPill === 1 &&
            <>
              <h1 className="font-heading text-black text-5xl mt-5">Tell us about <span className="text-primary">yourself</span></h1>

            </>
          }
          {selectedPill === 2 &&
            <>
              <h1 className="font-heading text-black text-5xl mt-5 text-center">Upload Your <br className="mb-5"/><span className="text-primary">Resume</span></h1>

            </>
          }
          <FormButton text={selectedPill === wizards.length - 1 ? "Submit" : selectedPill === 0 ? "Get Started" : "Next"} className={"rounded-full mt-10 w-1/2"} action={incrementPill} />
        </div>
      </div>
    </div>
  )
};

export default OnBoarding;