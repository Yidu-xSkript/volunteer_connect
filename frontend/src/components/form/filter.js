import { XCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Dropdown from "./dropdown";

function Filter() {
    const locations = [
        {id:1, name: 'USA'},
        {id:2, name: 'UK'},
        {id:3, name: 'Ethiopia'},
        {id:4, name: 'Kenya'},
        {id:5, name: 'South Africa'},
        {id:6, name: 'Seychelles'},
        {id:7, name: 'Mauritania'},
        {id:8, name: 'Belgium'},
        {id:9, name: 'Germany'},
        {id:10, name: 'Morocco'},
    ]
    const applicants = [
        {id:1, name: 'Less than 5'},
        {id:2, name: '5 - 20'},
        {id:3, name: '21 - 50'},
        {id:4, name: '50 - 100'},
        {id:4, name: 'More than 100'},
    ]
    return (
        <div className="shadow shadow-slate-50 rounded-2xl p-5 border border-gray-200 space-y-10">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold tracking-wide">Filter</h3>
                <div className="text-base text-gray-400 flex items-end space-x-1 cursor-pointer"><span>Clear all</span> <XCircleIcon className="w-6" /> </div>
            </div>
            {/* Location Filter -- populate data from an API */}
            <div className="">
                <label className="font-semibold">Location</label>
                <Dropdown options={locations} selectClass={'pl-5 text-gray-400'} className={'w-full shadow shadow-slate-200 border border-gray-100 rounded-xl'} icon={
                    <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-3">
                        <MapPinIcon className="w-6" />
                    </div>
                } />
            </div>
            {/* Category Filter */}
            <div className="">
                <label className="font-semibold">Category</label>

            </div>
            {/* Organization Filter */}
            <div className="">
                <label className="font-semibold">Organizations</label>

            </div>
            {/* Applicants Filter */}
            <div className="">
                <label className="font-semibold">Applicants</label>
                <Dropdown options={applicants} selectClass={'text-gray-400'} className={'w-full shadow shadow-slate-200 border border-gray-100 rounded-xl'} />
            </div>
            {/* Work Experience Filter */}
            <div className="">
                <label className="font-semibold">Experience</label>

            </div>
        </div>
    );
};

export default Filter;