import { XCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Dropdown from "./dropdown";
import CheckBox from "./checkbox";
import Button from "./button";
import { useState } from "react";
import useWindowDimensions from "../../hooks/dimension";
import LocationDropdown from "../location";
import { City, Country } from "country-state-city";
import useFilter from "../../hooks/useFilter";

function Filter() {
    const { filter, removeFilter, setFilter } = useFilter();

    const applicants = [
        { id: 1, name: 'Less than 5' },
        { id: 2, name: '5 - 20' },
        { id: 3, name: '21 - 50' },
        { id: 4, name: '50 - 100' },
        { id: 5, name: 'More than 100' },
    ]

    const organizations = [
        { name: 'Org1', id: 1 },
        { name: 'Org2', id: 2 },
        { name: 'Org3', id: 3 },
        { name: 'Org4', id: 4 },
        { name: 'Org5', id: 5 }
    ]

    const locations = [
        { name: 'On Site', id: 'On Site' },
        { name: 'Remote', id: 'Remote' },
    ]

    const [showFilter, setShowFilter] = useState(false)
    const { width } = useWindowDimensions();

    const [checkedOrg, setCheckedOrg] = useState(new Array(organizations.length).fill(false));
    const [checkedLoc, setCheckedLoc] = useState(new Array(locations.length).fill(false));

    const handleCheckChange = (index, updatable, updatableValue = []) => {
        const updatedCheckedState = updatableValue.map((item, i) =>
            i === index ? !item : item
        );
        updatable(updatedCheckedState);
    };

    const [applicant, setApplicant] = useState("1")

    const _countries = Country.getAllCountries()
    const [selectedCountry, setSelectedCountry] = useState({ code: _countries[0].isoCode, name: _countries[0].name, value: 0 })
    var _cities = City.getCitiesOfCountry(selectedCountry.code)
    const [selectedCity, setSelectedCity] = useState(_cities[0]?.name)
    const [isLoading, setIsLoading] = useState(false)

    const clearAll = () => {
        const orgState = checkedOrg.map(() => (false))
        setCheckedOrg(orgState)

        const locState = checkedLoc.map(() => (false))
        setCheckedLoc(locState)

        setSelectedCountry({ code: _countries[0].isoCode, name: _countries[0].name, value: 0 })
        setSelectedCity(_cities[0]?.name)
        setApplicant("1")
    }

    const applyFilter = () => {
        // setIsLoading(!isLoading)
    }

    return (
        <div className="shadow shadow-slate-50 rounded-2xl p-5 border border-gray-200 space-y-5">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h3 className="lg:text-xl text-base font-semibold tracking-wide">Filter</h3>
                <div className="flex space-x-3">
                    <Button loaderClass="w-5 h-5" className="rounded-full md:text-sm px-4 py-1 font-semibold" isLoading={isLoading} action={applyFilter} text="Apply" />
                    <div onClick={clearAll} className="lg:text-base text-sm text-gray-400 flex items-end space-x-1 cursor-pointer"><span>Clear all</span> <XCircleIcon className="lg:w-6 w-5" /> </div>
                </div>
            </div>
            <hr className="h-px bg-gray-100 border-0 w-full" />
            <div className={`space-y-5 ${showFilter || width > 640 ? 'block' : 'hidden'}`}>
                {/* Location Filter -- populate data from an API */}
                <div className="">
                    <label className="font-semibold lg:text-base text-sm">Location</label>
                    <LocationDropdown
                        countryValue={selectedCountry.value}
                        cityValue={selectedCity}
                        _countries={_countries}
                        _cities={_cities}
                        setCity={(e) => setSelectedCity(e.target.value)}
                        setCountry={(e) => setSelectedCountry({ code: _countries[e.target.value].isoCode, name: _countries[e.target.value].name, value:e.target.value })} />
                </div>
                <hr className="h-px bg-gray-100 border-0 w-full" />
                {/* Organization Filter */}
                <div className="space-y-2">
                    <label className="font-semibold lg:text-base text-sm">Organizations</label>
                    <div className="space-y-1">
                        {organizations.map((org, i) => (
                            <CheckBox key={i} name={org.name} value={org.id} onChange={() => handleCheckChange(i, setCheckedOrg, checkedOrg)} checked={checkedOrg[i]} />
                        ))}
                    </div>
                    <ChevronDownIcon className='lg:w-6 w-5 cursor-pointer' title="Show More Organizations" />
                </div>
                <hr className="h-px bg-gray-100 border-0 w-full" />
                {/* Applicants Filter */}
                <div className="">
                    <label className="font-semibold lg:text-base text-sm">Applicants</label>
                    <Dropdown value={applicant} onChange={(e) => setApplicant(e.target.value)} options={applicants} selectClass={'text-gray-400 lg:text-base text-sm'} className={'w-full shadow shadow-slate-200 border border-gray-100 rounded-xl'} />
                </div>
                <hr className="h-px bg-gray-100 border-0 w-full" />
                {/* Work Experience Filter */}
                <div className="space-y-2">
                    <label className="font-semibold lg:text-base text-sm">Volunteer Location</label>
                    <div className="space-y-1">
                        {locations.map((loc, i) => (
                            <CheckBox key={i} onChange={() => handleCheckChange(i, setCheckedLoc, checkedLoc)} checked={checkedLoc[i]} name={loc.name} id={loc.id} value={loc.id} />
                        ))}
                    </div>
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