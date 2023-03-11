import NotFound404 from '../../assets/404.svg'
import Button from '../../components/form/button';
import authCircle from '../../assets/vc-auth-circle-1.svg'
import { Link } from 'react-router-dom';
const NotFound = () => (
    <div>
        <img src={authCircle} className="w-64 z-0 absolute -top-20 -left-20 pointer-events-none select-none" alt="circle-bg" />
        <img src={authCircle} className="w-[26rem] z-0 absolute -top-48 right-0 pointer-events-none select-none" alt="circle-bg" />
        <img src={authCircle} className="w-[34rem] z-0 absolute bottom-0 -left-56 pointer-events-none select-none" alt="circle-bg" />
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto space-y-10">
            <img src={NotFound404} className="w-1/2" alt="Not Found" />
            <div className='space-y-3'>
                <h1 className='text-7xl font-bold text-center'>Something Went</h1>
                <h1 className='text-7xl uppercase font-thin tracking-[2rem] text-center'>Wrong!</h1>
            </div>
            {/* The button text depends on if there is a valid token in redux */}
            <Link to="/">
                <Button text={"Back to homepage"} className={'rounded-full px-20'} />
            </Link>
        </div>
    </div>
);
export default NotFound;