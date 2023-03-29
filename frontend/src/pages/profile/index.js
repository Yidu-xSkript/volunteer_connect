import AuthLayout from "../../Layout/Auth";
import { PencilIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../../components/form/button";
import useUser from "../../hooks/useUser";
import AxiosService from "../../services/axios.services";
import API from "../../utils/API";

function Profile() {

    const [editMode, setEditMode] = useState(false)
    const { user, setUser } = useUser()
    const _user = JSON.parse(user)
    const { _api } = AxiosService()
    const { auth_api_url } = API()
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState(_user.name)
    const [bio, setBio] = useState(_user.biography)
    const [phone_number, setPhoneNumber] = useState(_user.phone_no)
    const [location, setLocation] = useState(_user?.location)
    const [error, setError] = useState('')

    const handleProfile = (e) => {
        e.preventDefault()
        setEditMode(false)
        setIsLoading(true)

        const data = {
            "name": name,
            'bio': bio,
            'phone_no': phone_number,
            'location': location
        }

        _api.patch(`${auth_api_url}/user/${_user?.id}/update`, data)
            .then(res => {
                setUser(JSON.stringify(res.data))
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err.response)
                setIsLoading(false)
                setError(err.response?.data)
            })
    }

    return (
        <AuthLayout>
            {error && <p className='text-sm shadow-lg border border-gray-300 bg-white py-3 px-5 rounded-lg absolute bottom-10 right-10 text-red-500'>{error}</p>}
            <div className="lg:p-20 sm:p-10 p-5 space-y-5">
                <div className="border border-gray-200 rounded-3xl shadow sm:p-10 p-5 flex flex-col sm:flex-row items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-5">
                    <div className="sm:w-1/4 w-full flex flex-col items-center space-y-2">
                        <img className="w-36 h-36 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-cover border-4 rounded-full border-white pointer-events-none shadow-md" src={_user.image} alt={_user.name} />
                        <PencilIcon className="w-10 p-2 overflow-visible rounded-full shadow border border-gray-300 cursor-pointer" title="Change Profile Picture" />
                    </div>
                    <div className="sm:w-3/4 w-full space-y-5">
                        <div className="flex sm:flex-row flex-col space-y-3 sm:space-y-0 space-x-3 items-center">
                            {!editMode && <h1 className="text-2xl xl:text-6xl font-heading sm:text-4xl select-none">{_user.name}</h1>}
                            {editMode && <input value={name} onChange={(e) => setName(e.target.value)} className={`font-heading sm:text-4xl text-2xl xl:text-6xl lg:w-auto w-64 duration-150 focus:bg-white border-b border-gray-300 focus:outline-none`} type="text" placeholder={_user.role === 'volunteer' ? 'Fullname' : 'Organization Name'} required />}
                            <div className="flex space-x-3">
                                {!editMode && <PencilIcon className="w-10 p-2 overflow-visible rounded-full shadow border border-gray-300 cursor-pointer" title="Edit User Information" onClick={() => setEditMode(true)} />}
                                {editMode && <Button isLoading={isLoading} loaderClass="w-6 h-6" className={"rounded-full py-2"} text="Save" action={handleProfile} />}
                                {/* Open Password Update Modal */}
                                <LockOpenIcon className="w-10 p-2 overflow-visible rounded-full shadow border border-gray-300 cursor-pointer" title="Change Password" />
                            </div>
                        </div>
                        {!editMode && <p className="text-gray-600 xl:text-base sm:text-sm text-xs select-none">{_user.biography}</p>}
                        {editMode && <textarea onChange={(e) => setBio(e.target.value)} value={bio} className={`w-full text-gray-900 xl:text-base sm:text-sm text-xs h-32 border-b border-gray-300 focus:outline-none`} placeholder={'Tell us about yourself'}></textarea>}
                        <p className="text-gray-600 select-none"><span className="font-semibold text-black">Phone Number</span>: {!editMode ? _user.phone_no : <input value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} className={`duration-150 focus:bg-white border-b border-gray-300 focus:outline-none`} type="text" placeholder={'Phone Number'} required />}</p>
                        {_user.role === 'organization' && <p className="text-gray-600 select-none"><span className="font-semibold text-black">Location</span>: {!editMode ? _user.location : <input value={location} onChange={(e) => setLocation(e.target.value)} className={`duration-150 focus:bg-white border-b border-gray-300 focus:outline-none`} type="text" placeholder={'HQ Location'} required />}</p>}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Profile;