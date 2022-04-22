import DarkMode from "./DarkMode";

const HeaderBar = () => {
    return (
        <div className="clsHeader flex space-x-4  w-full h-16 shadow-2xl shadow-grey justify-center items-center" >
            <div className="h1 flex text-white"> SplinterTracker</div>
            <DarkMode className="absolute right-0"/> 
        </div>
    );
};

export default HeaderBar;