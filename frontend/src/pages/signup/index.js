// import logo from '../../assets/logo.svg'
import afr from '../../assets/afr-vc.svg'
import authCircle from '../../assets/vc-auth-circle-1.svg'
import authCircleWhite from '../../assets/auth-circle-white.svg'
import { Link } from "react-router-dom";
import Input from '../../components/form/input';
import Dropdown from '../../components/form/dropdown';
import Button from '../../components/form/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function Signup() {
  const [passwordVisibility, setPasswordVisibility] = useState("password")
  const handlePasswordVisibility = () => {
    setPasswordVisibility(passwordVisibility === "password" ? "text" : "password")
  }
  const roleOptions = [{id: 1, name: 'Volunteer'}, {id: 2, name: 'Organization'}]
  return (
    <>
      <div className='flex z-0'>
        <div className='bg-auth w-1/2 h-full absolute top-0 bottom-0 p-16'>
          {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}
          <img src={authCircle} className="w-64 z-0 absolute -top-20 -left-20 pointer-events-none select-none" alt="circle-bg" />
          <img src={authCircle} className="w-[26rem] z-0 absolute -top-36 right-0 pointer-events-none select-none" alt="circle-bg" />
          <img src={authCircle} className="w-[30rem] z-0 absolute bottom-0 -left-32 pointer-events-none select-none" alt="circle-bg" />
          <img src={authCircleWhite} className="w-[36rem] z-0 absolute bottom-0 -right-32 pointer-events-none select-none" alt="circle-bg" />
          <h1 className="text-5xl font-bold z-10 relative">Logo</h1>
          <div className='mt-20'>
            <h1 className='text-primary font-heading text-6xl tracking-wide'>Welcome</h1>
            <h1 className='text-gray-800 font-heading text-6xl tracking-wide mt-5'>To Volunteer Connect</h1>
          </div>
          <img src={afr} className="w-[85%] absolute bottom-0 pointer-events-none select-none" alt="signup-vc-img" />
        </div>
        <div className='w-1/2 h-full'></div>
        <div className='w-1/2 h-full p-16'>
          <p className='text-gray-400 text-right'>Already a member? <Link to='/login' className="font-semibold text-gray-800">Sign in</Link></p>
          <div className="mt-20 flex flex-col items-center justify-center">
            <h1 className="font-heading text-5xl text-center mb-20">Sign up to connect</h1>
            <Input type={"text"} placeholder={"Name"} required={true} />
            <Input type={"email"} placeholder={"Email"} required={true} />
            <Input type={passwordVisibility} placeholder={"Password"} icon={
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handlePasswordVisibility}>
                {passwordVisibility === "password" ?<EyeIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' /> : <EyeSlashIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' />}
              </div>
            } required={true} />
            <Dropdown options={roleOptions} />
            <Button className={'rounded-full mt-20 w-2/3'} text={'Get Started'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;