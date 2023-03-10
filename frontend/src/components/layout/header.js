import { NavLink } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";

const Header = () => (
    <header className="px-5 py-2 shadow-xl shadow-slate-400 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-5xl font-bold z-10 relative">Logo</h1>
        {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}

        <div className="space-x-3">
            <NavLink className={({isActive}) => isActive ? "text-black" : "text-gray-400"} to="/">Find Missions</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-black" : "text-gray-400"} to="/missions">Missions</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-black" : "text-gray-400"} to="/applied">Missions Applied</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-black" : "text-gray-400"} to="/applicants">Applicants</NavLink>
        </div>

        <div className="flex items-center space-x-3">
            <UserIcon className="w-12 p-2 rounded-full bg-[#F5F9F9]" />
            <div>
                <h4 className="font-bold text-sm">Yididya Goitom</h4>
                <p className="font-thin text-xs">email@example.com</p>
            </div>
        </div>
    </header>
);

export default Header;