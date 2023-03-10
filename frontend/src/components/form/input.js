const input = ({ type="text", placeholder, icon, uClass, className, required=false }) => (
    <div className={`relative ${uClass}`}>
        {/* <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div> */}
        <input className={`rounded-full h-14 my-3 text-lg duration-150 focus:bg-white focus:shadow-md focus:outline-none focus:ring focus:ring-primary w-full p-5 ${className}`} type={type} placeholder={placeholder} required={required} />
        {icon && <span>{icon}</span>}
    </div>
);

export default input;