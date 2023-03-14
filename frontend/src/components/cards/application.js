import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

function Application ({image, name, mission_title, total_applied, amount_of_volunteers, est_time, approval_status}) {
    return (
        <div className="rounded-2xl w-full flex space-x-7 p-5 items-center border border-gray-200 shadow">
            <div className="border w-24 rounded-2xl border-gray-300">
                <img src={image} alt="Logo" />
            </div>
            <div className="flex flex-grow justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-lg">{name}</h2>
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg">{mission_title}</h3>
                        <p>•</p>
                        <small className="text-xs text-gray-400">Applicants {total_applied} / {amount_of_volunteers}</small>
                        <p>•</p>
                        <small className="text-xs text-gray-400">Est. Time {est_time}</small>
                    </div>
                </div>
                <div className={`space-x-2 flex items-center pl-1 pr-2 py-1 rounded-full border ${isNaN(approval_status) ? 'bg-yellow-50 border-yellow-600' : approval_status === 0 ? 'bg-red-50 border-red-600' : 'bg-green-50 border-green-600'}`}>
                    {isNaN(approval_status) ? <div className="rounded-full p-3 bg-yellow-500" /> : approval_status === 1 ? <CheckIcon className={`w-6 p-1 bg-green-600 text-white rounded-full`} /> : <XMarkIcon className={`w-6 p-1 bg-red-600 text-white rounded-full`} /> }
                    <h6 className="capitalize">{isNaN(approval_status) ? '' : 'Application'} {isNaN(approval_status) ? 'In Review' : approval_status === 1 ? 'Approved' : 'Denied'}</h6>
                </div>
            </div>
        </div>
    );
}

export default Application;