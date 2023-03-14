
const Button = ({className, text, action}) => (
    <button onClick={action} className={`${className} bg-primary text-white font-semibold text-lg p-5 hover:shadow-xl hover:opacity-90 duration-150`}>{text}</button>
);

export default Button;