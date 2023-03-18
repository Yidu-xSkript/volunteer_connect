import { CheckIcon } from "@heroicons/react/24/outline";

const CheckBox = ({ name, value, checked }) => (
    <div className="flex items-center">
        <input checked={checked} id={`checkbox-${value}`} type="checkbox" value={value} className="w-4 h-4 opacity-0 absolute" />
        <div className="border-2 rounded-md border-gray-400 lg:w-5 lg:h-5 w-4 h-4 shadow flex flex-shrink-0 justify-center items-center focus-within:border-gray-500">
            <CheckIcon className="w-4 hidden text-white pointer-events-none" />
        </div>
        <label htmlFor={`checkbox-${value}`} className="ml-2 lg:text-sm text-xs font-medium text-gray-900">{name}</label>
    </div>
);

export default CheckBox;