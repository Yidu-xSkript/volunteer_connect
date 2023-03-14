import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";
// import MissionModal from "../modal/mission";

function OrgMissionCard({id, title, post_human_date, description, deadline, volunteering_hours, est_time, applicants, openEditModal, openDeleteModal}) {
    // Use ID for edit & delete modal.

    return (
        <div className="rounded-3xl border border-gray-300 shadow-lg shadow-slate-100 p-10 bg-white space-y-5">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-bold text-2xl">{title}</h2>
                    <small className="text-xs text-gray-400">{post_human_date}</small>
                </div>
                <div className="flex space-x-2">
                    <PencilSquareIcon title="Edit Mission" className="w-11 rounded-full shadow p-2 border border-gray-300 bg-gray-100 cursor-pointer" onClick={openEditModal} />
                    <TrashIcon title="Delete Mission" className="w-11 rounded-full shadow p-2 border border-gray-300 bg-gray-100 cursor-pointer" onClick={openDeleteModal} />
                </div>
            </div>
            <p>{description.substring(0, 300)}...</p>
            <div>
                <p className="text-xs text-gray-400">Application Deadline: {deadline}</p>
                <p className="text-xs text-gray-400">Volunteering Hours: {volunteering_hours} {volunteering_hours > 1 ? 'hrs' : 'hr'}/day</p>
                <p className="text-xs text-gray-400">Est. Time: {est_time}</p>
                <p className="text-xs text-gray-400">Applicants: {applicants}</p>
            </div>
        </div>
    );
}

export default OrgMissionCard;