import AuthLayout from "../../Layout/Auth";
import { PencilIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../../components/form/button";

function Profile() {

    const [editMode, setEditMode] = useState(false)

    const userinfo = {
        image: 'https://media.istockphoto.com/id/1288634698/photo/beautiful-caucasian-teenager-smiling-happy-standing-at-the-city.jpg?s=170667a&w=0&k=20&c=fXAqV1uAAt78wOrP5QQrrVIrOYgJ8aBZqKwpexpDfSw=',
        name: 'Yididya Goitom',
        bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        phone_number: '+251932382336',
        location: 'Ethiopia'
    }

    const [name, setName] = useState(userinfo.name)
    const [bio, setBio] = useState(userinfo.bio)
    const [phone_number, setPhoneNumber] = useState(userinfo.phone_number)
    const [location, setLocation] = useState(userinfo.location)

    return (
        <AuthLayout>
            <div className="lg:p-20 sm:p-10 p-5 space-y-5">
                <div className="border border-gray-200 rounded-3xl shadow sm:p-10 p-5 flex flex-col sm:flex-row items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-5">
                    <div className="sm:w-1/4 w-full flex flex-col items-center space-y-2">
                        <img className="w-36 h-36 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-cover border-4 rounded-full border-white pointer-events-none shadow-md" src={userinfo.image} alt={userinfo.name} />
                        <PencilIcon className="w-10 p-2 overflow-visible rounded-full shadow border border-gray-300 cursor-pointer" title="Change Profile Picture" />
                    </div>
                    <div className="sm:w-3/4 w-full space-y-5">
                        <div className="flex sm:flex-row flex-col space-y-3 sm:space-y-0 space-x-3 items-center">
                            {!editMode && <h1 className="text-2xl xl:text-6xl font-heading sm:text-4xl select-none">{userinfo.name}</h1>}
                            {editMode && <input value={name} onChange={(e) => setName(e.target.value)} className={`font-heading sm:text-4xl text-2xl xl:text-6xl lg:w-auto w-64 duration-150 focus:bg-white border-b border-gray-300 focus:outline-none`} type="text" placeholder={userinfo.name} required />}
                            <div className="flex space-x-3">
                                {!editMode && <PencilIcon className="w-10 p-2 overflow-visible rounded-full shadow border border-gray-300 cursor-pointer" title="Edit User Information" onClick={() => setEditMode(true)} />}
                                {editMode && <Button className={"rounded-full py-2"} text="Save" action={() => setEditMode(false)} />}
                                {/* Open Password Update Modal */}
                                <LockOpenIcon className="w-10 p-2 overflow-visible rounded-full shadow border border-gray-300 cursor-pointer" title="Change Password" />
                            </div>
                        </div>
                        {!editMode && <p className="text-gray-600 xl:text-base sm:text-sm text-xs select-none">{userinfo.bio}</p>}
                        {editMode && <textarea onChange={(e) => setBio(e.target.value)} value={bio} className={`w-full text-gray-900 xl:text-base sm:text-sm text-xs h-32 border-b border-gray-300 focus:outline-none`} placeholder={userinfo.bio}></textarea>}
                        <p className="text-gray-600 select-none"><span className="font-semibold text-black">Phone Number</span>: {!editMode ? userinfo.phone_number : <input value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} className={`duration-150 focus:bg-white border-b border-gray-300 focus:outline-none`} type="text" placeholder={userinfo.name} required />}</p>
                        <p className="text-gray-600 select-none"><span className="font-semibold text-black">Location</span>: {!editMode ? userinfo.location : <input value={location} onChange={(e) => setLocation(e.target.value)} className={`duration-150 focus:bg-white border-b border-gray-300 focus:outline-none`} type="text" placeholder={userinfo.name} required />}</p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Profile;