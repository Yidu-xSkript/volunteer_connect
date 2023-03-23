// import logo from '../../assets/logo.svg'
import Input from '../../components/form/input';
import Button from '../../components/form/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import GuestLayout from '../../Layout/Guest';
import axios from 'axios';
import API from '../../utils/API';
import useToken from '../../hooks/useToken'
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router';

function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState("password")
  const handlePasswordVisibility = () => {
    setPasswordVisibility(passwordVisibility === "password" ? "text" : "password")
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { auth_api_url } = API()
  const { setToken, token, removeToken } = useToken()
  const { setUser, removeUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      'email': email,
      'password': password
    }
    setIsLoading(true)
    await axios.post(`${auth_api_url}/signin`, data)
      .then(res => {
        if (token) {
          removeToken()
          removeUser()
        }
        setIsLoading(false)
        setToken(res.data['token'])
        setUser(JSON.stringify(res.data['user']))
        if (res.data['user'].image === null || res.data['user'].phone_no === null || res.data['user'].bio === null) navigate('/on-boarding')
        else navigate('/')
      }).catch(err => {
        setError(err.response.data?.error)
        setIsLoading(false)
      })
  }

  return (
    <GuestLayout>
      <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        {error && <p className='text-sm shadow-lg border border-gray-300 bg-white py-3 px-5 rounded-lg absolute bottom-10 right-10 text-red-500'>{error}</p>}
        <Input type={"email"} onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email"} required={true} uClass='w-full sm:w-2/3' className={'bg-[#F5F9F9]'} />
        <Input type={passwordVisibility} onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"} icon={
          <div onClick={handlePasswordVisibility}>
            {passwordVisibility === "password" ? <EyeIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' /> : <EyeSlashIcon className='w-6 hover:text-gray-700 text-gray-400 duration-150' />}
          </div>
        } required={true} uClass='w-full sm:w-2/3' className={'bg-[#F5F9F9]'} />
        <Button isLoading={isLoading} className={'rounded-full mt-20 w-full sm:w-2/3'} text={'Sign In'} />
      </form>
    </GuestLayout>
  );
};

export default Login;