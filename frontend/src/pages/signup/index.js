// import logo from '../../assets/logo.svg'
import afr from '../../assets/afr-vc.svg'
import authCircle from '../../assets/vc-auth-circle-1.svg'
import authCircleWhite from '../../assets/auth-circle-white.svg'
const signup = () => (
  <>
    <div className='flex z-0'>
      <div className='bg-[#E3EFF1] w-1/2 h-full absolute top-0 bottom-0 p-16'>
        {/* <img src={logo} className="w-40" alt="logo" /> */}
        <img src={authCircle} className="w-64 z-0 absolute -top-20 -left-20 pointer-events-none" alt="circle-bg" />
        <img src={authCircle} className="w-[26rem] z-0 absolute -top-36 right-0 pointer-events-none" alt="circle-bg" />
        <img src={authCircle} className="w-[30rem] z-0 absolute bottom-0 -left-32 pointer-events-none" alt="circle-bg" />
        <img src={authCircleWhite} className="w-[36rem] z-0 absolute bottom-0 -right-32 pointer-events-none" alt="circle-bg" />
        <h1 className="text-6xl font-bold z-10 relative">Logo</h1>
        <div className='mt-20'>
          <h1 className='text-[#2D9CAE] font-heading text-6xl tracking-wide'>Welcome</h1>
          <h1 className='text-gray-800 font-heading text-6xl tracking-wide mt-5'>To Volunteer Connect</h1>
        </div>
        <img src={afr} className="w-[85%] absolute bottom-0 pointer-events-none" alt="signup-vc-img" />
      </div>
      <div className='w-1/2 h-full'></div>
      <div className='w-1/2 h-full p-16'>
        <p className='text-gray-400 text-right'>Already a member? <a href={`/login`} className="font-semibold text-gray-800">Sign in</a></p>
        <div className="mt-20">
          <h1 className="font-heading text-5xl text-center">Sign up to connect</h1>
          {/* Input */}
        </div>
      </div>
    </div>
  </>
);

export default signup;