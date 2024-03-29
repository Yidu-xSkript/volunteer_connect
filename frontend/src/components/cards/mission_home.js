import { MapPinIcon } from "@heroicons/react/24/solid";
import ReactTimeAgo from "react-time-ago";

const MissionHomeCard = ({image, title, post_human_date, volunteering_hours, est_time, deadline, volunteer_amount, description, location, action}) => (
    <div onClick={action} className="cursor-pointer rounded-2xl bg-[#fbfbfb] border border-gray-200 space-y-4 shadow shadow-slate-50 p-6 hover:shadow-lg hover:border-gray-300 duration-300">
        <div className="flex items-center space-x-7">
            <img className="sm:w-32 w-20 rounded-2xl border border-gray-300" src={image} alt={title} />
            <div className="space-y-3">
                <div className="w-full">
                    <h1 className="text-sm sm:text-lg lg:text-2xl font-bold">{title} • <span className="text-xs lg:text-sm text-gray-500 font-normal"><ReactTimeAgo date={post_human_date} locale="en-US"/></span></h1>
                </div>
                <p className="text-[0.6rem] sm:text-xs text-gray-500">Volunteering Hours: {volunteering_hours} hrs/day - Est. Time: {est_time} - Application Deadline: {deadline} - {volunteer_amount} Volunteers Needed</p>
            </div>
        </div>
        <p className="text-xs lg:text-sm">{description.substring(0, 300)}...</p>
        <div className="flex space-x-1 items-center">
            <MapPinIcon className="w-6" />
            <p className="lg:text-sm text-xs text-gray-500">{location}</p>
        </div>
    </div>
);
export default MissionHomeCard