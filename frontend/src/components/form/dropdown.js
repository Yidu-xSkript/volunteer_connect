import { ChevronDownIcon } from '@heroicons/react/24/outline'
const dropdown = ({ options, required=false }) => (
    <div className='relative rounded-full h-14 my-3 focus:bg-white focus:shadow-md  focus:outline-none focus:ring focus:ring-[#1C7280] w-2/3 px-5 bg-[#F5F9F9]'>
        <select className="rounded-full h-14 bg-transparent w-full text-lg duration-150 appearance-none" required={required}>
            {options.map((op) => <option className='appearance-none' value={op.id} selected={op.id === 1}>{op.name}</option>)}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10">
            <ChevronDownIcon className='w-6 text-gray-400' />
        </div>
    </div>
);

export default dropdown;