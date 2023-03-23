import { XMarkIcon, MapPinIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MissionDetailSmall from "./cards/mission_detail_tiny";
import Button from "./form/button";
import Apply from "./modal/Apply";

function MissionSideBar({ showSidebar, onClick, mission }) {

    const [showApply, setShowApply] = useState(false)

    const setShowApplyModal = () => {
        setShowApply(true)
    }

    return (
        <div>
            <Apply showModal={showApply} close={() => setShowApply(false)} />
            {showSidebar && <div className="fixed top-0 right-0 w-screen h-screen bg-primary opacity-10 z-10" />}
            <div id="m_sidebar" className={`fixed overflow-y-scroll top-0 right-0 h-screen lg:w-2/3 xl:w-1/2 2xl:w-2/5 w-full bg-white shadow-2xl space-y-7 shadow-slate-50 border ease-in-out duration-1000 border-gray-200 px-10 pt-10 z-20 ${showSidebar ? "translate-x-0 block" : "translate-x-full"}`}>
                <div className="flex flex-col items-end">
                    <XMarkIcon className="w-8 cursor-pointer" onClick={onClick} />
                </div>
                <div className="flex items-center justify-center sm:hidden">
                    <img className="border w-36 rounded-2xl border-gray-300" src={mission.image} alt={mission.title} />
                </div>
                <div className="flex items-center sm:space-x-7">
                    <img className="border w-24 rounded-2xl border-gray-300 sm:block hidden" src={mission.image} alt={mission.title} />
                    <div className="space-y-3">
                        <div className="flex space-x-3 items-end">
                            <h1 className="sm:text-4xl text-3xl font-heading">{mission.title}</h1>
                        </div>

                        <div className="flex space-x-1 items-center">
                            <MapPinIcon className="w-6" />
                            <div className="flex space-x-3 items-center">
                                <p className="font-light text-gray-600">{mission.location}</p>
                                <p>•</p>
                                <p className="font-light text-gray-600">{mission.post_human_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
                    <MissionDetailSmall key={1} text={mission.volunteering_hours} title="Volunteering Hours" />
                    <MissionDetailSmall key={2} text={mission.deadline} title="Application Deadline" />
                    <MissionDetailSmall key={3} text={mission.job_location} title="Location" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <MissionDetailSmall key={4} text={mission.est_time} title="Estimated Time" />
                    <MissionDetailSmall key={5} text={mission.volunteer_amount} title="Amount of Applicants" />
                </div>
                <div className="space-y-3">
                    <h2 className="font-heading text-2xl">About your role here</h2>
                    <p className="text-sm text-gray-600">{mission.description}</p>
                </div>
                <div className="space-y-3">
                    <h2 className="font-heading text-2xl">Requirements</h2>
                    <div className="space-y-1">
                        {mission.requirements?.map((req) => (
                            <div key={req.id} className="flex items-center space-x-1">
                                <CheckIcon className="w-5 p-1 bg-primary text-white rounded-full" />
                                <p className="text-gray-600 text-sm">{req.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <h2 className="font-heading text-2xl">About Organization</h2>
                    <p className="text-sm text-gray-600">{mission.description}</p>
                    <p className="text-sm text-gray-600">Headquarters in {mission.location}</p>
                </div>
                <div className="sticky bottom-0 right-0 bg-white w-full sm:p-10 px-0 py-10">
                    <Button text={"Apply to Volunteer"} className="w-full rounded-2xl" action={setShowApplyModal} />
                </div>
            </div>
        </div>
    );
};

export default MissionSideBar;