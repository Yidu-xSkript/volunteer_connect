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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {}

  return (
    <GuestLayout>
      <Input type={"email"} onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"} required={true} uClass='w-full sm:w-2/3' className={'bg-[#F5F9F9]'} />
      <Input type={passwordVisibility} onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"} icon={
        <div onClick={handlePasswordVisibility}>
          {passwordVisibility === "password" ? <EyeIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' /> : <EyeSlashIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' />}
        </div>
      } required={true} uClass='w-full sm:w-2/3' className={'bg-[#F5F9F9]'} />
      <Button action={handleSubmit} className={'rounded-full mt-20 w-full sm:w-2/3'} text={'Sign In'} />
    </GuestLayout>
  );
};

export default Login;