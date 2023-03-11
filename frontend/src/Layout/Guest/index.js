import afr from '../../assets/afr-vc.svg'
import authCircle from '../../assets/vc-auth-circle-1.svg'
import authCircleWhite from '../../assets/auth-circle-white.svg'
import { Link, useLocation } from "react-router-dom";

function GuestLayout({ children }) {
    const location = useLocation().pathname;
    return (
        <div className='flex z-0'>
            <div className='bg-auth w-1/2 h-full absolute top-0 bottom-0 p-16'>
                {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}
                <img src={authCircle} className="w-64 z-0 absolute -top-20 -left-20 pointer-events-none select-none" alt="circle-bg" />
                <img src={authCircle} className="w-[26rem] z-0 absolute -top-36 right-0 pointer-events-none select-none" alt="circle-bg" />
                <img src={authCircle} className="w-[30rem] z-0 absolute bottom-0 -left-32 pointer-events-none select-none" alt="circle-bg" />
                <img src={authCircleWhite} className="w-[36rem] z-0 absolute bottom-0 -right-32 pointer-events-none select-none" alt="circle-bg" />
                <h1 className="text-5xl font-bold z-10 relative">Logo</h1>
                <div className='mt-20'>
                    <h1 className='text-primary font-heading text-6xl tracking-wide'>Welcome {location === '/login' ? 'back' : ''}</h1>
                    <h1 className='text-gray-800 font-heading text-6xl tracking-wide mt-5'>{location === '/signup' ? 'To Volunteer Connect' : 'We\'re excited you\'re here' }</h1>
                </div>
                <img src={afr} className="w-[85%] absolute bottom-0 pointer-events-none select-none" alt="signup-vc-img" />
            </div>
            <div className='w-1/2 h-full'></div>
            <div className='w-1/2 h-full p-16'>
                {location === '/signup' && <p className='text-gray-400 text-right'>Already a member? <Link to='/login' className="font-semibold text-gray-800">Sign in</Link></p>}
                {location === '/login' && <p className='text-gray-400 text-right'>Don't have an account? <Link to='/signup' className="font-semibold text-gray-800">Sign up</Link></p>}
                <div className="mt-20 flex flex-col items-center justify-center">
                    <h1 className="font-heading text-5xl text-center mb-20">Sign {location === '/signup' ? 'up' : 'in'} to connect</h1>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GuestLayout;