// import logo from '../../assets/logo.svg'
import Input from '../../components/form/input';
import Button from '../../components/form/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import GuestLayout from '../../Layout/Guest';

function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState("password")
  const handlePasswordVisibility = () => {
    setPasswordVisibility(passwordVisibility === "password" ? "text" : "password")
  }
  return (
    <GuestLayout>
      <Input type={"email"} placeholder={"Email"} required={true} />
      <Input type={passwordVisibility} placeholder={"Password"} icon={
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handlePasswordVisibility}>
          {passwordVisibility === "password" ? <EyeIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' /> : <EyeSlashIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' />}
        </div>
      } required={true} />
      <Button className={'rounded-full mt-20 w-2/3'} text={'Sign In'} />
    </GuestLayout>
  );
};

export default Login;