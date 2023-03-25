import { ChevronDownIcon } from '@heroicons/react/24/outline'
const dropdown = ({ options, className, selectClass, icon, required=false, onChange, value, children }) => (

    <div className={`${className} relative rounded-full h-14 my-3 focus:bg-white focus:shadow-md focus:ring focus:ring-[#1C7280] w-2/3 px-5`}>
        {icon && <span>{icon}</span>}
        {!children ? <select value={value}  onChange={onChange} className={`${selectClass} rounded-full h-14 bg-transparent w-full text-lg duration-150 focus:outline-none appearance-none`} required={required}>
            {options.map((op) => <option key={op.id} className='appearance-none' value={op.id} defaultValue={op.id === 1}>{op.name}</option>)}
        </select> : children}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10">
            <ChevronDownIcon className='lg:w-6 w-5 text-gray-400' />
        </div>
    </div>
);

export default dropdown;