import { useState } from "react";
import { ChevronRightIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../components/form/button";
import AuthLayout from "../../Layout/Auth";

function Applicants() {
    const [selectedApplicant, setSelectedApplicant] = useState();
    const applicants = [
        {
            id: 1,
            name: 'Christopher Wilson',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            email: 'yidu95@gmail.com',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            phone_number: '+251932382336',
            resume: 'https://www.oanda.com/assets/documents/1263/OGM_customer_bonus_promotion_08.07.2022.pdf',
            mission_name: 'Mission 1',
            approval_status: 1
        },
        {
            id: 2,
            name: 'William Defoe',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            email: 'defoe@gmail.com',
            image: 'https://media.istockphoto.com/id/1288634698/photo/beautiful-caucasian-teenager-smiling-happy-standing-at-the-city.jpg?s=170667a&w=0&k=20&c=fXAqV1uAAt78wOrP5QQrrVIrOYgJ8aBZqKwpexpDfSw=',
            phone_number: '+234892348588',
            resume: 'https://www.oanda.com/assets/documents/1263/OGM_customer_bonus_promotion_08.07.2022.pdf',
            mission_name: 'Mission 1',
            approval_status: 0
        },
        {
            id: 3,
            name: 'Marcus Miller',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            email: 'bass@thebossbass.com',
            image: 'https://media.istockphoto.com/id/1288634698/photo/beautiful-caucasian-teenager-smiling-happy-standing-at-the-city.jpg?s=170667a&w=0&k=20&c=fXAqV1uAAt78wOrP5QQrrVIrOYgJ8aBZqKwpexpDfSw=',
            phone_number: '+1-(235)-233456245',
            resume: 'https://www.oanda.com/assets/documents/1263/OGM_customer_bonus_promotion_08.07.2022.pdf',
            mission_name: 'Mission Title Another and longer title is title',
            approval_status: NaN
        },
        {
            id: 4,
            name: 'Christopher Wilson',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            email: 'yidu95@gmail.com',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            phone_number: '+251932382336',
            resume: 'https://www.oanda.com/assets/documents/1263/OGM_customer_bonus_promotion_08.07.2022.pdf',
            mission_name: 'Mission 1',
            approval_status: 1
        },
    ]

    function handleApprovalStatus(state) {

    }

    return (
        <AuthLayout>
            <div className="block xl:flex px-5 py-10 sm:p-20 xl:space-x-7 space-y-7 xl:space-y-0">
                <div className="w-full xl:w-2/5 h-96 overflow-y-auto border border-gray-300 shadow rounded-3xl">
                    {applicants.map((applicant, index) => (
                        <>
                            <div className={`hover:bg-gray-50 p-5 space-x-3 w-full cursor-pointer flex items-center`} onClick={() => setSelectedApplicant(index)}>
                                <img src={applicant.image} className="sm:w-24 sm:h-24 w-16 h-16 object-cover border border-gray-500 shadow rounded-full" alt={applicant.name} />
                                <div className="flex w-full justify-between items-center">
                                    <div className="space-y-2">
                                        <h5 className="text-lg">{applicant.name}</h5>
                                        <p className="text-sm text-gray-500">{applicant.mission_name} | <span className={`${isNaN(applicant.approval_status) ? 'text-yellow-600' : applicant.approval_status === 1 ? 'text-green-600' : 'text-red-600'}`}>{isNaN(applicant.approval_status) ? 'Pending Approval' : applicant.approval_status === 1 ? 'Approved' : 'Denied'}</span></p>
                                    </div>
                                    <ChevronRightIcon className="w-6" />
                                </div>
                            </div>
                            { applicants.length - 1 === index && <hr className="h-px bg-gray-100 border-0 w-full" />}
                        </>
                    ))}
                </div>
                {!isNaN(selectedApplicant) && <div className="h-full xl:w-3/4 w-full border border-gray-300 shadow rounded-3xl">
                    <div className={`p-5 flex space-x-7 items-center ${applicants[selectedApplicant].approval_status === 1 ? 'bg-green-100' : applicants[selectedApplicant].approval_status === 0 ? 'bg-red-100' : ''} rounded-t-3xl`}>
                        <img src={applicants[selectedApplicant].image} className="sm:w-24 sm:h-24 w-16 h-16 border rounded-full object-cover border-gray-500 shadow" alt={applicants[selectedApplicant].name} />
                        <div className="flex sm:flex-row flex-col w-full items-center justify-between">
                            <h5 className="sm:text-2xl text-lg text-center font-bold">{applicants[selectedApplicant].name}</h5>
                            <div className="space-x-3 flex">
                                <CheckIcon className="w-12 p-2 border border-gray-200 bg-white rounded-full shadow hover:bg-primary hover:text-white cursor-pointer duration-100" title="Approve" onClick={() => handleApprovalStatus(true)} />
                                <XMarkIcon className="w-12 p-2 border border-gray-200 bg-white rounded-full shadow hover:bg-red-500 hover:text-white cursor-pointer duration-100" title="Deny" onClick={() => handleApprovalStatus(false)} />
                            </div>
                        </div>
                    </div>
                    <hr className="h-px bg-gray-100 border-0 w-full" />
                    <div className="p-5 space-y-5">
                        <h4 className="text-lg font-semibold">About</h4>
                        <p className="sm:text-sm text-xs text-gray-600">
                            {applicants[selectedApplicant].bio}
                        </p>
                    </div>
                    <hr className="h-px bg-gray-100 border-0 w-full" />
                    <div className="flex flex-col sm:flex-row p-5 sm:space-x-7">
                        <p className="sm:text-base text-sm"><strong className="font-semibold">email</strong>: {applicants[selectedApplicant].email}</p>
                        <p className="sm:text-base text-sm"><strong className="font-semibold">Phone Number</strong>: {applicants[selectedApplicant].phone_number}</p>
                    </div>
                    <hr className="h-px bg-gray-100 border-0 w-full" />
                    <div className="p-10">
                        <Button text={"Download Resume"} className="rounded-full" />
                    </div>
                </div>}
            </div>
        </AuthLayout>
    );
}

export default Applicants;