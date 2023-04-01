import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

function Application ({image, name, mission_title, total_applied, amount_of_volunteers, est_time, approval_status}) {
    return (
        <div className="select-none hover:shadow-lg duration-500 rounded-2xl w-full sm:space-y-2 flex sm:flex-row flex-col sm:space-x-7 p-5 items-center border border-gray-200 shadow">
            <img className="border w-16 lg:w-24 rounded-2xl border-gray-300" src={image} alt="Logo" />
            <div className="flex w-full sm:w-auto flex-grow justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-base lg:text-lg">{name}</h2>
                    <hr className="block sm:hidden my-2" />
                    <div className="flex sm:flex-row flex-col sm:items-center items-start sm:space-x-2">
                        <h3 className="text-sm lg:text-lg">{mission_title}</h3>
                        <p className="hidden sm:block">•</p>
                        <small className="text-xs text-gray-400">Total Applicants {amount_of_volunteers}</small>
                        <p className="hidden sm:block">•</p>
                        <small className="text-xs text-gray-400">Est. Time {est_time} hrs/day</small>
                    </div>
                </div>
                <div className={`space-x-2 flex items-center pl-1 lg:pr-2 pr-1 py-1 rounded-full border ${approval_status === null ? 'bg-yellow-50 border-yellow-600' : approval_status === false ? 'bg-red-50 border-red-600' : 'bg-green-50 border-green-600'}`}>
                    {approval_status === null ? <div className="rounded-full p-3 bg-yellow-500" /> : approval_status === true ? <CheckIcon className={`w-6 p-1 bg-green-600 text-white rounded-full`} /> : <XMarkIcon className={`w-6 p-1 bg-red-600 text-white rounded-full`} /> }
                    <h6 className="hidden lg:block capitalize">{approval_status === null ? '' : 'Application'} {approval_status === null ? 'In Review' : approval_status === true ? 'Approved' : 'Denied'}</h6>
                </div>
            </div>
        </div>
    );
}

export default Application;