const MissionDetailSmall = ({ text, title, className }) => (
    <div className={`${className} px-4 py-3 border border-gray-300 rounded-lg space-y-2`}>
        <h2 className="font-semibold text-2xl">{text}</h2>
        <p className="text-[0.64rem] text-gray-400 uppercase tracking-[0.15rem]">{title}</p>
    </div>
);
export default MissionDetailSmall;