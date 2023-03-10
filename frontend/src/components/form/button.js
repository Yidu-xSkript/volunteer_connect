
const Button = ({className, text, action}) => (
    <button onClick={action} className={`bg-primary text-white font-semibold text-lg p-5 hover:shadow-xl hover:opacity-90 duration-150 ${className}`}>{text}</button>
);

export default Button;