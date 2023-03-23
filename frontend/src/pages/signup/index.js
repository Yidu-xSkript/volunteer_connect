// import logo from '../../assets/logo.svg'
import Input from '../../components/form/input';
import Dropdown from '../../components/form/dropdown';
import Button from '../../components/form/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import GuestLayout from '../../Layout/Guest';
import axios from "axios";
import useToken from '../../hooks/useToken';
import API from '../../utils/API';

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

  const [isLoading, setIsLoading] = useState(false)
  const { setToken } = useToken();
  const { auth_api_url } = API();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "name": name,
      "email": email,
      "password": password,
      "role": role
    }
    setIsLoading(true)
    await axios.post(auth_api_url + '/signup', data).then((res) => {
      setIsLoading(false)
      setToken(res.data['token'])
      console.log(res.data)
      // save token & user info to local storage.
    }).catch(err => {
      console.log(err)
      setIsLoading(false)
    })
  }

  return (
    <GuestLayout>
      <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <Input type={"text"} placeholder={"Name"} onChange={(e) => setName(e.target.value)} value={name} required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'} />
        <Input type={"email"} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} value={email} required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'} />
        <Input type={passwordVisibility} onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"} icon={
          <div onClick={handlePasswordVisibility}>
            {passwordVisibility === "password" ? <EyeIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' /> : <EyeSlashIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' />}
          </div>
        } required={true} uClass='w-2/3' className={'bg-[#F5F9F9]'} />
        <Dropdown value={role} options={roleOptions} onChange={(e) => setRole(e.target.value)} className={' bg-[#F5F9F9]'} />
        <Button isLoading={isLoading} className={'rounded-full mt-20 w-2/3'} text={'Get Started'} />
      </form>
    </GuestLayout>
  );
};

export default Signup;