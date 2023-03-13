import { XMarkIcon, MapPinIcon, CheckIcon } from "@heroicons/react/24/outline";
import MissionDetailSmall from "./cards/mission_detail_tiny";
import Button from "./form/button";

function MissionSideBar({ showSidebar, onClick, mission }) {
    return (
        <div>
            {showSidebar && <div className="fixed top-0 right-0 w-screen h-screen bg-primary opacity-10 z-10" />}
            <div id="m_sidebar" className={`fixed overflow-y-scroll top-0 right-0 h-screen w-2/5 bg-white shadow-2xl space-y-7 shadow-slate-50 border ease-in-out duration-1000 border-gray-200 px-10 pt-10 z-20 ${showSidebar ? "translate-x-0 block" : "translate-x-full"}`}>
                <div className="flex flex-col items-end">
                    <XMarkIcon className="w-8 cursor-pointer" onClick={onClick} />
                </div>
                <div className="flex items-center space-x-7">
                    <div className="border w-24 rounded-2xl border-gray-300">
                        <img src={mission.image} alt={mission.title} />
                    </div>
                    <div className="space-y-3">
                        <div className="flex space-x-3 items-end">
                            <h1 className="text-4xl font-heading">{mission.title}</h1>
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
                <div className="grid grid-cols-3 gap-5">
                    <MissionDetailSmall text={mission.volunteering_hours} title="Volunteering Hours" />
                    <MissionDetailSmall text={mission.deadline} title="Application Deadline" />
                    <MissionDetailSmall text={mission.job_location} title="Location" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <MissionDetailSmall text={mission.est_time} title="Estimated Time" />
                    <MissionDetailSmall text={mission.volunteer_amount} title="Amount of Applicants" />
                </div>
                <div className="space-y-3">
                    <h2 className="font-heading text-2xl">About your role here</h2>
                    <p className="text-sm text-gray-600">{mission.description}</p>
                </div>
                <div className="space-y-3">
                    <h2 className="font-heading text-2xl">Requirements</h2>
                    <div className="space-y-1">
                        {mission.requirements?.map((req) => (
                            <div className="flex items-center space-x-1">
                                <CheckIcon className="w-5 p-1 bg-primary text-white rounded-full" />
                                <p className="text-gray-600 text-sm">{req.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <h2 className="font-heading text-2xl">About Organization</h2>
                    <p className="text-sm text-gray-600">{mission.description}</p>
                </div>
                <div className="sticky bottom-0 right-0 bg-white w-full p-10">
                    <Button text={"Apply to Volunteer"} className="w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
};

export default MissionSideBar;