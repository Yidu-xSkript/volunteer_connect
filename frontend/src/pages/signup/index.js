// import logo from '../../assets/logo.svg'
const signup = () => (
  <>
    <div className='flex z-0'>
      <div className='bg-[#E3EFF1] w-1/2 h-full absolute top-0 bottom-0 p-10'>
        {/* <img src={logo} className="w-40" alt="logo" /> */}
        <h1 className="text-6xl font-bold">Logo</h1>
        <div className='mt-20'>
          <h1 className='text-[#2D9CAE] font-heading text-6xl tracking-wide'>Welcome</h1>
          <h1 className='text-gray-800 font-heading text-6xl tracking-wide mt-5'>To Volunteer Connect</h1>
        </div>
      </div>
      <div className='w-1/2 h-full'></div>
      <div className='w-1/2 h-full p-10'>
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