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
  const roleOptions = [{ id: 'volunteer', name: 'Volunteer' }, { id: 'organization', name: 'Organization' }]

  const [role, setRole] = useState(roleOptions[0].id)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {}

  return (
    <GuestLayout>
      <Input type={"text"} placeholder={"Name"} onChange={(e) => setName(e.target.value)} value={name} required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'}/>
      <Input type={"email"} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} value={email} required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'} />
      <Input type={passwordVisibility} onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"} icon={
        <div onClick={handlePasswordVisibility}>
          {passwordVisibility === "password" ? <EyeIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' /> : <EyeSlashIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' />}
        </div>
      } required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'} />
      <Dropdown options={roleOptions}  onChange={(e) => setRole(e.target.value)} className={' bg-[#F5F9F9]'} />
      <Button action={handleSubmit} className={'rounded-full mt-20 w-2/3'} text={'Get Started'} />
    </GuestLayout>
  );
};

export default Signup;