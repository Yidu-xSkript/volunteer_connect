import logo from '../../assets/logo.svg'

const Footer = () => (
    <div className="flex flex-col items-center p-10 shadow-xl shadow-slate-50 border-t border-gray-200">
        <img src={logo} className="sm:w-28 w-24 relative z-10" alt="logo" />
        {/* <h1 className="sm:text-4xl text-3xl font-bold z-10 relative">Logo</h1> */}
        <h1 className="sm:text-3xl text-base uppercase am:tracking-[0.4rem] tracking-[0.35rem] font-light sm:font-thin mt-2">Connect . Impact . Unite</h1>
        <hr className="h-px bg-gray-100 border-0 w-full my-8"/>
        <p className="capitalize text-xs font-semibold">2023 Volunteer Connect. All rights reserved</p>
    </div>
);

export default Footer;