import { XCircleIcon, MapPinIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Dropdown from "./dropdown";
import CheckBox from "./checkbox";
import Button from "./button";
import { useState } from "react";
import useWindowDimensions from "../../hooks/dimension";

function Filter() {
    const locations = [
        { id: 1, name: 'USA' },
        { id: 2, name: 'UK' },
        { id: 3, name: 'Ethiopia' },
        { id: 4, name: 'Kenya' },
        { id: 5, name: 'South Africa' },
        { id: 6, name: 'Seychelles' },
        { id: 7, name: 'Mauritania' },
        { id: 8, name: 'Belgium' },
        { id: 9, name: 'Germany' },
        { id: 10, name: 'Morocco' },
    ]
    const applicants = [
        { id: 1, name: 'Less than 5' },
        { id: 2, name: '5 - 20' },
        { id: 3, name: '21 - 50' },
        { id: 4, name: '50 - 100' },
        { id: 4, name: 'More than 100' },
    ]
    const [showFilter, setShowFilter] = useState(false)
    const {width} = useWindowDimensions();

    return (
        <div className="shadow shadow-slate-50 rounded-2xl p-5 border border-gray-200 space-y-5">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h3 className="lg:text-xl text-base font-semibold tracking-wide">Filter</h3>
                <div className="lg:text-base text-sm text-gray-400 flex items-end space-x-1 cursor-pointer"><span>Clear all</span> <XCircleIcon className="lg:w-6 w-5" /> </div>
            </div>
            <hr className="h-px bg-gray-100 border-0 w-full" />
            <div className={`space-y-5 ${showFilter || width > 640 ? 'block' : 'hidden'}`}>
                {/* Location Filter -- populate data from an API */}
                <div className="">
                    <label className="font-semibold lg:text-base text-sm">Location</label>
                    <Dropdown options={locations} selectClass={'pl-5 text-gray-400 lg:text-base text-sm'} className={'w-full shadow shadow-slate-200 border border-gray-100 rounded-xl'} icon={
                        <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-3">
                            <MapPinIcon className="lg:w-6 w-5" />
                        </div>
                    } />
                </div>
                <hr className="h-px bg-gray-100 border-0 w-full" />
                {/* Category Filter */}
                <div className="space-y-2">
                    <label className="font-semibold lg:text-base text-sm">Category</label>
                    <div className="space-y-1">
                        <CheckBox name={"Category 1"} value={"Category1"} />
                        <CheckBox name={"Category 2"} value={"Category2"} />
                        <CheckBox name={"Category 3"} value={"Category3"} />
                        <CheckBox name={"Category 4"} value={"Category4"} />
                        <CheckBox name={"Category 5"} value={"Category5"} />
                    </div>
                    <ChevronDownIcon className='lg:w-6 w-5 cursor-pointer' title="Show More Categories" />
                </div>
                <hr className="h-px bg-gray-100 border-0 w-full" />
                {/* Organization Filter */}
                <div className="space-y-2">
                    <label className="font-semibold lg:text-base text-sm">Organizations</label>
                    <div className="space-y-1">
                        <CheckBox name={"Organization 1"} value={"Organization1"} />
                        <CheckBox name={"Organization 2"} value={"Organization2"} />
                        <CheckBox name={"Organization 3"} value={"Organization3"} />
                        <CheckBox name={"Organization 4"} value={"Organization4"} />
                        <CheckBox name={"Organization 5"} value={"Organization5"} />
                    </div>
                    <ChevronDownIcon className='lg:w-6 w-5 cursor-pointer' title="Show More Organizations" />
                </div>
                <hr className="h-px bg-gray-100 border-0 w-full" />
                {/* Applicants Filter */}
                <div className="">
                    <label className="font-semibold lg:text-base text-sm">Applicants</label>
                    <Dropdown options={applicants} selectClass={'text-gray-400 lg:text-base text-sm'} className={'w-full shadow shadow-slate-200 border border-gray-100 rounded-xl'} />
                </div>
                <hr className="h-px bg-gray-100 border-0 w-full" />
                {/* Work Experience Filter */}
                <div className="space-y-2">
                    <label className="font-semibold lg:text-base text-sm">Experience</label>
                    <div className="space-y-1">
                        <CheckBox name={"Experience 1"} value={"Experience1"} />
                        <CheckBox name={"Experience 2"} value={"Experience2"} />
                    </div>
                    <ChevronDownIcon className='lg:w-6 w-5 cursor-pointer' title="Show More Experiences" />
                </div>
            </div>
            {showFilter && <hr className="h-px bg-gray-100 border-0 w-full block sm:hidden" />}
            <div className="flex justify-center items-center sm:hidden">
                <Button className='rounded-full py-2 cursor-pointer' text={showFilter ? 'Hide Filter' : 'Show Filter'} action={() => setShowFilter(!showFilter)} />
            </div>
        </div>
    );
};

export default Filter;