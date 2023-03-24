import { useEffect, useState } from "react";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import welcome from '../../assets/on-boarding-welcome.svg';
import FormButton from "../../components/form/button";
import authCircle from '../../assets/vc-auth-circle-1.svg'
import UploadWidget from "../../components/form/file_upload";
import Input from "../../components/form/input";
import TextArea from "../../components/form/textarea";
import useUser from "../../hooks/useUser";
import API from "../../utils/API";
import AxiosService from "../../services/axios.services";
import AuthMiddleware from "../../utils/AuthMiddleware";
import { useNavigate } from "react-router";

function OnBoarding() {
  const { user, setUser } = useUser()
  const { auth_api_url } = API()
  const { isLoggedIn } = AuthMiddleware()

  const _user = JSON.parse(user)

  const _wizards = [
    "Welcome",
    "Basic Information",
    "Resume"
  ]
  const [wizards, setWizards] = useState(_wizards)

  useEffect(() => {
    if (isLoggedIn && _user.role === 'organization' && wizards.length === 3) {
      const index = wizards.indexOf("Resume")
      if (index > -1) {
        wizards.splice(index, 1)
        setWizards([...wizards])
      }
    }
  }, [_user])

  const [selectedPill, setPill] = useState(0)
  const incrementPill = () => {
    if (selectedPill < wizards.length - 1) setPill(selectedPill + 1)
  }
  const decrementPill = () => {
    if (selectedPill > 0) setPill(selectedPill - 1)
  }

  const [uploadedImage, setUploadedImage] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  const [name, setName] = useState(_user.name)
  const [phoneNo, setPhoneNo] = useState()
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const { _api } = AxiosService()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (data) => {
    await _api.patch(`${auth_api_url}/user/${_user?.id}/update`, data)
      .then(res => {
        setUser(JSON.stringify(res.data))
        setIsLoading(false)
        navigate('/')
      })
      .catch(err => {
        console.log(err.response)
        setIsLoading(false)
        setError(err.response?.data)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (_user.role === 'volunteer') {
      const data = {
        'name': name,
        'phone_no': phoneNo,
        'bio': bio,
        'image': uploadedImage,
        'resume': uploadedFile,
      }
      if (name.length > 0 && phoneNo.length > 0 && bio.length > 0 && uploadedFile.length > 0 && uploadedImage.length > 0) {
        await sendRequest(data)
      } else setError('Please fill in all the required inputs.')
    }
    if (_user.role === 'organization') {
      const data = {
        'name': name,
        'phone_no': phoneNo,
        'location': location,
        'bio': bio,
        'image': uploadedImage,
      }
      if (name.length > 0 && phoneNo.length > 0 && location.length > 0 && bio.length > 0 && uploadedImage.length > 0) {
        await sendRequest(data)
      } else setError('Please fill in all the required inputs.')
    }
  }

  return (
    <div className="flex">
      {error && <p className='text-sm shadow-lg border border-gray-300 bg-white py-3 px-5 rounded-lg absolute bottom-10 right-10 text-red-500'>{error}</p>}
      {/* Sidebar */}
      <div className="hidden lg:block w-1/4 bg-auth h-full absolute top-0 bottom-0">
        <img src={authCircle} className="lg:w-36 xl:w-40 2xl:w-64 z-0 absolute -top-20 -left-20 pointer-events-none select-none" alt="circle-bg" />
        <img src={authCircle} className="lg:w-40 xl:w-56 2xl:w-80 z-0 absolute -top-20 right-0 pointer-events-none select-none" alt="circle-bg" />
        <div className="xl:p-12 lg:p-5">
          {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}
          <h1 className="text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-black font-bold z-10 relative mb-32">Logo</h1>
          {wizards.map((w, i) => (
            <div key={i} className="flex items-start space-x-4 my-2">
              <div className="flex flex-col items-center">
                <span className={`w-8 h-8 2xl:w-8 2xl:h-8 lg:h-6 lg:w-6 xl:w-7 xl:h-7 rounded-full border border-black ${selectedPill >= i ? 'bg-primary' : 'bg-transparent'}`} />
                {i < wizards.length - 1 && <span className={`border h-10 mt-2 ${selectedPill > i ? 'border-primary' : 'border-black'}`} />}
              </div>
              <h3 className={`text-2xl lg:text-xl 2xl:text-2xl select-none z-10 font-semibold ${selectedPill >= i ? 'text-black' : 'text-gray-400'}`}>{w}</h3>
            </div>
          ))}
        </div>
        <div className="absolute select-none bottom-10 left-0 p-8 shadow bg-white border border-gray-100 uppercase tracking-[0.4rem] font-semibold text-2xl rounded-tr-full rounded-br-full">
          {wizards[selectedPill]}
        </div>
      </div>
      <div className='hidden lg:block w-1/4 h-full' />
      <div className="lg:w-3/4 w-full p-5 sm:p-10 md:p-16">
        <div className="lg:hidden flex items-center justify-center border-b mb-5 text-3xl uppercase font-thin text-center tracking-[0.6rem]">
          {wizards[selectedPill]}
        </div>
        {/* Nav */}
        <div className="flex justify-between items-center">
          <ChevronLeftIcon className="w-16 p-5 hover:bg-[#F5F9F9] rounded-full cursor-pointer" onClick={decrementPill} />
          <div className="text-xl font-semibold">
            <span className="text-gray-400">{selectedPill + 1}/</span><span className="text-primary">{wizards.length}</span>
          </div>
        </div>
        {/* Wizard Content */}
        <div className="flex flex-col items-center">
          {selectedPill === 0 &&
            <>
              <img src={welcome} className="lg:w-2/4 w-full" alt="Welcome" />
              <h2 className="border-b-2 border-black font-semibold lg:text-2xl xl:text-3xl md:text-xl text-sm pb-4 tracking-wide">Glad You're here, {_user?.name}!</h2>
              <h1 className="font-heading text-black text-3xl md:text-5xl text-center mt-5">Thank you <span className="text-primary">{_user?.role === 'volunteer' ? 'for donating your time.' : 'for deciding to share your cause.'}</span></h1>
            </>
          }
          {selectedPill === 1 &&
            <>
              <h1 className="font-heading text-black text-3xl text-center md:text-5xl mt-5 mb-20">Tell us about <span className="text-primary">yourself</span></h1>
              <div className="block md:inline-flex w-full justify-center space-x-0 md:space-x-10 px-0 md:px-20">
                <UploadWidget className={'h-auto md:w-1/3 w-full text-center md:py-0 py-5'} mime={['image/png', 'image/jpeg', 'image/jpg']} uploadedFile={uploadedImage} setUploadedFile={setUploadedImage} type='image' text="Upload Logo" />
                <div className="md:w-2/3 w-full">
                  <Input onChange={(e) => setName(e.target.value)} value={name} placeholder={_user.role === 'volunteer' ? 'Fullname' : 'Organization name'} required={true} type={'text'} className={'w-full border border-gray-100 shadow'} />
                  <Input onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ''))} value={phoneNo} placeholder={'Phone Number'} required={true} type='text' className={'border border-gray-100 shadow'} />
                  {_user.role === 'organization' && <Input onChange={(e) => setLocation(e.target.value)} value={location} placeholder={'HQ Location'} required={true} type={'text'} className={'border border-gray-100 shadow'} />}
                </div>
              </div>
              <div className="w-full px-0 md:px-20 my-0 md:my-10">
                <TextArea onChange={(e) => setBio(e.target.value)} value={bio} placeholder={'A little about yourself'} rows={5} className={'w-full p-5 shadow resize-none'} />
              </div>
            </>
          }
          {selectedPill === 2 &&
            <>
              <h1 className="font-heading text-black text-3xl text-center md:text-5xl mt-5">Upload Your <br className="mb-5" /><span className="text-primary">Resume</span></h1>
              <div className="w-full md:px-20 px-5 py-10">
                <UploadWidget className={'w-full text-center md:py-20 py-5'} mime={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} type='file' text="Choose your resume to upload" text2="PDF, JPEG, or PNG" />
              </div>
            </>
          }
          <FormButton isLoading={isLoading} text={selectedPill === wizards.length - 1 ? "Submit" : selectedPill === 0 ? "Get Started" : "Next"} className={"rounded-full mt-10 w-1/2"} action={selectedPill === wizards.length - 1 ? handleSubmit : incrementPill} />
        </div>
      </div>
    </div>
  )
};

export default OnBoarding;