import { MapPinIcon } from '@heroicons/react/24/outline';
import Dropdown from './form/dropdown';

function locationDropdown({ setCountry, setCity, _countries, _cities, countryValue, cityValue }) {

    return (
        <div>
            <Dropdown className={'w-full shadow shadow-slate-200 border border-gray-100 rounded-xl'} icon={
                <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-3">
                    <MapPinIcon className="lg:w-6 w-5" />
                </div>
            }>
                <select value={countryValue} onChange={setCountry} className={`pl-5 text-gray-400 lg:text-base text-sm rounded-full h-14 bg-transparent w-full duration-150 focus:outline-none appearance-none`}>
                    {_countries.map((country, i) => <option key={i} className='appearance-none' value={i} >{country.name}</option>)}
                </select>
            </Dropdown>
            <Dropdown className={'w-full shadow shadow-slate-200 border border-gray-100 rounded-xl'} icon={
                <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-3">
                    <MapPinIcon className="lg:w-6 w-5" />
                </div>
            }>
                <select value={cityValue} onChange={setCity} className={`rounded-full h-14 bg-transparent w-full pl-5 text-gray-400 lg:text-base text-sm duration-150 focus:outline-none appearance-none`}>
                    {_cities?.map((city, i) => <option key={i} className='appearance-none' value={city.name} >{city.name}</option>)}
                </select>
            </Dropdown>
        </div>
    );
}
export default locationDropdown;