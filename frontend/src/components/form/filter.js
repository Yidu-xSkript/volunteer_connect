import { XCircleIcon } from "@heroicons/react/24/outline";
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
    return (
        <div className="shadow shadow-slate-50 rounded-2xl p-5 border border-gray-200 space-y-5">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold tracking-wide">Filter</h3>
                <div className="text-base text-gray-400 flex items-end space-x-1 cursor-pointer"><span>Clear all</span> <XCircleIcon className="w-6" /> </div>
            </div>
            {/* Location Filter */}
            <div className="">
                <label className="font-semibold">Location</label>
                <Dropdown options={locations} />
            </div>
        </div>
    );
};

export default Filter;