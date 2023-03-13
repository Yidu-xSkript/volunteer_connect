import { MapPinIcon } from "@heroicons/react/24/solid";

const MissionHomeCard = ({image, title, post_human_date, volunteering_hours, est_time, deadline, volunteer_amount, description, location, action}) => (
    <div onClick={action} className="cursor-pointer rounded-2xl bg-[#fbfbfb] border border-gray-200 space-y-4 shadow shadow-slate-50 p-6 hover:shadow-lg hover:border-gray-300 duration-300">
        <div className="flex items-center space-x-7">
            <div className="border w-24 rounded-2xl border-gray-300">
                <img src={image} alt={title} />
            </div>
            <div className="space-y-3">
                <div className="flex space-x-3 items-center">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p>•</p>
                    <p className="text-sm text-gray-500">{post_human_date}</p>
                </div>
                <p className="text-xs text-gray-500">Volunteering Hours: {volunteering_hours} - Est. Time: {est_time} - Application Deadline: {deadline} - {volunteer_amount} Volunteers Needed</p>
            </div>
        </div>
        <p className="text-sm">{description}</p>
        <div className="flex space-x-1 items-center">
            <MapPinIcon className="w-6" />
            <p className="text-sm text-gray-500">{location}</p>
        </div>
    </div>
);
export default MissionHomeCard