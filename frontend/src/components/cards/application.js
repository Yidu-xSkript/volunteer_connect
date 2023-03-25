import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

function Application ({image, name, mission_title, total_applied, amount_of_volunteers, est_time, approval_status}) {
    return (
        <div className="rounded-2xl w-full sm:space-y-2 flex sm:flex-row flex-col sm:space-x-7 p-5 items-center border border-gray-200 shadow">
            <img className="border w-16 lg:w-24 rounded-2xl border-gray-300" src={image} alt="Logo" />
            <div className="flex w-full sm:w-auto flex-grow justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-base lg:text-lg">{name}</h2>
                    <hr className="block sm:hidden my-2" />
                    <div className="flex sm:flex-row flex-col sm:items-center items-start sm:space-x-2">
                        <h3 className="text-sm lg:text-lg">{mission_title}</h3>
                        <p className="hidden sm:block">•</p>
                        <small className="text-xs text-gray-400">Applicants {total_applied} / {amount_of_volunteers}</small>
                        <p className="hidden sm:block">•</p>
                        <small className="text-xs text-gray-400">Est. Time {est_time}</small>
                    </div>
                </div>
                <div className={`space-x-2 flex items-center pl-1 lg:pr-2 pr-1 py-1 rounded-full border ${isNaN(approval_status) ? 'bg-yellow-50 border-yellow-600' : approval_status === 0 ? 'bg-red-50 border-red-600' : 'bg-green-50 border-green-600'}`}>
                    {isNaN(approval_status) ? <div className="rounded-full p-3 bg-yellow-500" /> : approval_status === 1 ? <CheckIcon className={`w-6 p-1 bg-green-600 text-white rounded-full`} /> : <XMarkIcon className={`w-6 p-1 bg-red-600 text-white rounded-full`} /> }
                    <h6 className="hidden lg:block capitalize">{isNaN(approval_status) ? '' : 'Application'} {isNaN(approval_status) ? 'In Review' : approval_status === 1 ? 'Approved' : 'Denied'}</h6>
                </div>
            </div>
        </div>
    );
}

export default Application;