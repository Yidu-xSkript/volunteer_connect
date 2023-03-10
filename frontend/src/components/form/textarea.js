const textarea = ({ rows, placeholder, className }) => (
    <textarea rows={rows} className={`block text-lg text-gray-900 rounded-[2rem] border border-gray-100 focus:ring focus:ring-primary focus:border-primary focus:outline-none ${className}`} placeholder={placeholder}></textarea>
);

export default textarea;