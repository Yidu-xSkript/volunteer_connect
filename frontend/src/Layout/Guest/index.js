import afr from '../../assets/afr-vc.svg'
import authCircle from '../../assets/vc-auth-circle-1.svg'
import authCircleWhite from '../../assets/auth-circle-white.svg'
import { Link, useLocation } from "react-router-dom";

function GuestLayout({ children }) {
    const location = useLocation().pathname;
    return (
        <div className='flex z-0'>
            <div className='hidden lg:block bg-auth w-1/2 h-full absolute top-0 bottom-0 2xl:p-16 p-0'>
                {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}
                <div className='md:p-10'>
                    <img src={authCircle} className="w-40 xl:w-56 2xl:w-64 z-0 absolute -top-20 -left-20 pointer-events-none select-none" alt="circle-bg" />
                    <img src={authCircle} className="w-[18rem] md:w-[15rem] xl:w-[22rem] 2xl:w-[26rem] z-0 absolute -top-36 right-0 pointer-events-none select-none" alt="circle-bg" />
                    <img src={authCircle} className="w-[20rem] md:w-[18rem] xl:w-[25rem] 2xl:w-[30rem] z-0 absolute bottom-0 -left-32 pointer-events-none select-none" alt="circle-bg" />
                    <img src={authCircleWhite} className="w-[22rem] md:w-[20rem] xl:w-[30rem] 2xl:w-[36rem] z-0 absolute bottom-0 -right-32 md:-right-10 pointer-events-none select-none" alt="circle-bg" />
                    <h1 className="text-2xl xl:text-4xl font-bold z-10 relative">Logo</h1>
                    <div className='mt-20'>
                        <h1 className='text-primary font-heading text-5xl xl:text-6xl 2xl:text-[4.2rem] tracking-wide'>Welcome {location === '/login' ? 'back' : ''}</h1>
                        <h1 className='text-gray-800 font-heading text-5xl xl:text-6xl 2xl:text-[4.2rem] tracking-wide mt-5'>{location === '/signup' ? 'To Volunteer Connect' : 'We\'re excited you\'re here' }</h1>
                    </div>
                </div>
                <img src={afr} className="w-[100%] xl:w-[85%] absolute bottom-0 pointer-events-none select-none" alt="signup-vc-img" />
            </div>
            <div className='hidden lg:block w-1/2 h-full'></div>
            <div className='w-full lg:w-1/2 h-full px-5'>
                {location === '/signup' && <p className='absolute right-10 top-10 text-gray-400 text-right'>Already a member? <Link to='/login' className="font-semibold text-gray-800">Sign in</Link></p>}
                {location === '/login' && <p className='absolute right-10 top-10 text-gray-400 text-right'>Don't have an account? <Link to='/signup' className="font-semibold text-gray-800">Sign up</Link></p>}
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="font-heading text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl text-center mb-20">Sign {location === '/signup' ? 'up' : 'in'} to connect</h1>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GuestLayout;