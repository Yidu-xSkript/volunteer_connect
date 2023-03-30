import { useEffect, useState } from "react";
import { ChevronRightIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthLayout from "../../Layout/Auth";
import AxiosService from "../../services/axios.services";
import empty from "../../assets/empty.svg";

function Applicants() {
    const [applicants, setApplicants] = useState([])
    const [selectedApplicant, setSelectedApplicant] = useState(0);

    const { _api } = AxiosService()

    function handleApprovalStatus(state, id) {
        _api.patch(`/application/${id}/update`, { 'status': state }).then(res => {
            setApplicants([...res.data])
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (applicants.length === 0)
            _api.get('/application')
                .then(res => setApplicants([...res.data]))
                .catch(err => console.log(err))
    }, [])

    return (
        <AuthLayout>
            <div className="block xl:flex px-5 py-10 sm:p-20 xl:space-x-7 space-y-7 xl:space-y-0">
                {applicants.length > 0 && <div className="w-full xl:w-2/5 h-96 overflow-y-auto border border-gray-300 shadow rounded-3xl">
                    {applicants.map((applicant, index) => (
                        <div key={index}>
                            <div className={`hover:bg-gray-50 p-5 space-x-3 w-full cursor-pointer flex items-center`} onClick={() => setSelectedApplicant(index)}>
                                <img src={applicant?.user.image} className="sm:w-24 sm:h-24 w-16 h-16 object-cover border border-gray-500 shadow rounded-full" alt={applicant?.user.name} />
                                <div className="flex w-full justify-between items-center">
                                    <div className="space-y-2">
                                        <h5 className="text-lg">{applicant?.user.name}</h5>
                                        <p className="text-sm text-gray-500">{applicant?.mission.name} | <span className={`${applicant.status === null ? 'text-yellow-600' : applicant.status ? 'text-green-600' : 'text-red-600'}`}>{applicant.status === null ? 'Pending Approval' : applicant.status ? 'Approved' : 'Denied'}</span></p>
                                    </div>
                                    <ChevronRightIcon className="w-6" />
                                </div>
                            </div>
                            {applicants.length - 1 === index && <hr className="h-px bg-gray-100 border-0 w-full" />}
                        </div>
                    ))}
                </div>}
                {!isNaN(selectedApplicant) && applicants.length > 0 && <div className="h-full xl:w-3/4 w-full border border-gray-300 shadow rounded-3xl">
                    <div className={`p-5 flex space-x-7 items-center ${applicants[selectedApplicant].status === true ? 'bg-green-100' : applicants[selectedApplicant].status === false ? 'bg-red-100' : ''} rounded-t-3xl`}>
                        <img src={applicants[selectedApplicant]?.user.image} className="sm:w-24 sm:h-24 w-16 h-16 border rounded-full object-cover border-gray-500 shadow" alt={applicants[selectedApplicant]?.user.name} />
                        <div className="flex sm:flex-row flex-col w-full items-center justify-between">
                            <h5 className="sm:text-2xl text-lg text-center font-bold">{applicants[selectedApplicant]?.user.name}</h5>
                            <div className="space-x-3 flex">
                                <CheckIcon className="w-12 p-2 border border-gray-200 bg-white rounded-full shadow hover:bg-primary hover:text-white cursor-pointer duration-100" title="Approve" onClick={() => handleApprovalStatus(true, applicants[selectedApplicant].id)} />
                                <XMarkIcon className="w-12 p-2 border border-gray-200 bg-white rounded-full shadow hover:bg-red-500 hover:text-white cursor-pointer duration-100" title="Deny" onClick={() => handleApprovalStatus(false, applicants[selectedApplicant].id)} />
                            </div>
                        </div>
                    </div>
                    <hr className="h-px bg-gray-100 border-0 w-full" />
                    <div className="p-5 space-y-5">
                        <h4 className="text-lg font-semibold">About</h4>
                        <p className="sm:text-sm text-xs text-gray-600">
                            {applicants[selectedApplicant]?.user.biography}
                        </p>
                    </div>
                    <hr className="h-px bg-gray-100 border-0 w-full" />
                    <div className="flex flex-col sm:flex-row p-5 sm:space-x-7">
                        <p className="sm:text-base text-sm"><strong className="font-semibold">email</strong>: {applicants[selectedApplicant]?.user.email}</p>
                        <p className="sm:text-base text-sm"><strong className="font-semibold">Phone Number</strong>: {applicants[selectedApplicant]?.user.phone_no}</p>
                    </div>
                    <hr className="h-px bg-gray-100 border-0 w-full" />
                    <div className="p-10">
                        <a target="_blank" rel="noreferrer" href={applicants[selectedApplicant]?.user.resume} className="px-4 py-2 border border-gray-200 shadow hover:shadow-xl duration-300 shadow-gray-100 rounded-full">Download Resume</a>
                    </div>
                </div>}
                {applicants.length === 0 && <div className="rounded-3xl border border-gray-300 shadow p-10 grid grid-cols-4 w-full">
                    <img src={empty} alt="No Content Found." className="col-span-1" />
                    <div className="flex flex-col items-center justify-center col-span-3 space-y-6">
                        <h3 className="uppercase tracking-[0.6rem] font-bold text-4xl">Empty!</h3>
                        <p className="text-2xl font-light text-gray-500 capitalize">No one has applied to any missions yet!</p>
                    </div>
                </div>}
            </div>
        </AuthLayout>
    );
}

export default Applicants;