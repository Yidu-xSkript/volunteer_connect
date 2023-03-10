// import logo from '../../assets/logo.svg'
import Input from '../../components/form/input';
import Dropdown from '../../components/form/dropdown';
import Button from '../../components/form/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import GuestLayout from '../../Layout/Guest';

function Signup() {
  const [passwordVisibility, setPasswordVisibility] = useState("password")
  const handlePasswordVisibility = () => {
    setPasswordVisibility(passwordVisibility === "password" ? "text" : "password")
  }
  const roleOptions = [{ id: 1, name: 'Volunteer' }, { id: 2, name: 'Organization' }]
  return (
    <GuestLayout>
      <Input type={"text"} placeholder={"Name"} required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'}/>
      <Input type={"email"} placeholder={"Email"} required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'} />
      <Input type={passwordVisibility} placeholder={"Password"} icon={
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handlePasswordVisibility}>
          {passwordVisibility === "password" ? <EyeIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' /> : <EyeSlashIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' />}
        </div>
      } required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'} />
      <Dropdown options={roleOptions} />
      <Button className={'rounded-full mt-20 w-2/3'} text={'Get Started'} />
    </GuestLayout>
  );
};

export default Signup;