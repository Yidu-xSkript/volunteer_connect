import { CheckIcon } from "@heroicons/react/24/outline";

const CheckBox = ({ name, value, checked }) => (
    <div class="flex items-center">
        <input checked={checked} id={`checkbox-${value}`} type="checkbox" value={value} class="w-4 h-4 opacity-0 absolute" />
        <div class="border-2 rounded-md border-gray-400 w-5 h-5 shadow flex flex-shrink-0 justify-center items-center focus-within:border-gray-500">
            <CheckIcon className="w-4 hidden text-white pointer-events-none" />
        </div>
        <label for={`checkbox-${value}`} class="ml-2 text-sm font-medium text-gray-900">{name}</label>
    </div>
);

export default CheckBox;