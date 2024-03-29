import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";
// import MissionModal from "../modal/mission";
import ReactTimeAgo from "react-time-ago"

function OrgMissionCard({ mission, openEditModal, openDeleteModal }) {
    // Use ID for edit & delete modal.

    return (
        <div className="rounded-3xl border border-gray-300 shadow-lg shadow-slate-100 p-10 bg-white space-y-5">
            <div className="flex space-x-2 items-start justify-between">
                <div>
                    <h2 className="font-bold text-xl xl:text-2xl">{mission.name}</h2>
                    <small className="text-xs text-gray-400"><ReactTimeAgo date={mission.created_at} /></small>
                </div>
                <div className="flex space-x-2">
                    <PencilSquareIcon title="Edit Mission" className="w-10 lg:w-8 xl:w-11 rounded-full shadow p-2 border border-gray-300 bg-gray-100 cursor-pointer" onClick={openEditModal} />
                    <TrashIcon title="Delete Mission" className="w-10 lg:w-8 xl:w-11 rounded-full shadow p-2 border border-gray-300 bg-gray-100 cursor-pointer" onClick={openDeleteModal} />
                </div>
            </div>
            <p className="text-sm xl:text-base">{mission.description.substring(0, 300)}...</p>
            <div>
                <p className="text-xs text-gray-400">Application Deadline: {mission.deadline}</p>
                <p className="text-xs text-gray-400">Volunteering Hours: {mission.volunteeringHours} {mission.volunteeringHours > 1 ? 'hrs' : 'hr'}/day</p>
                <p className="text-xs text-gray-400">Est. Time: {mission.estTime}</p>
                <p className="text-xs text-gray-400">Applicants: {mission.max_people}</p>
            </div>
        </div>
    );
}

export default OrgMissionCard;