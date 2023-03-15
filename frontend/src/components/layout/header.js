import { Link, NavLink } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Header() {
    const [showDropdown, setShowDropdown] = useState(false)
    const handleDropdown = () => {
        setShowDropdown(!showDropdown)
    }
    const handleSignout = () => { }
    return (
        <header className="px-10 py-4 shadow-xl shadow-slate-50 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-4xl font-bold z-10 relative">Logo</h1>
            {/* <img src={logo} className="w-40 relative z-10" alt="logo" /> */}

            <div className="space-x-5">
                <NavLink className={({ isActive }) => isActive ? "text-black" : "text-gray-400 hover:text-black"} to="/">Find Missions</NavLink>
                <NavLink className={({ isActive }) => isActive ? "text-black" : "text-gray-400 hover:text-black"} to="/missions">Missions</NavLink>
                <NavLink className={({ isActive }) => isActive ? "text-black" : "text-gray-400 hover:text-black"} to="/applications">Applications</NavLink>
                <NavLink className={({ isActive }) => isActive ? "text-black" : "text-gray-400 hover:text-black"} to="/applicants">Applicants</NavLink>
            </div>

            <div className="relative">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={handleDropdown}>
                    <UserIcon className="w-10 p-2 rounded-full bg-[#F5F9F9]" />
                    <div>
                        <h4 className="font-bold text-sm">Yididya Goitom</h4>
                        <p className="text-gray-400 text-xs">email@example.com</p>
                    </div>
                </div>
                {showDropdown && <div class="absolute right-0 z-10 block bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul class="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
                        <li><Link to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
                        <li><p onClick={handleSignout} class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign out</p></li>
                    </ul>
                </div>}
            </div>
        </header>
    );
}

export default Header;