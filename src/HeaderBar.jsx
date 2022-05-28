import DarkMode from "./DarkMode";

const HeaderBar = () => {
    return (
        <div className="clsHeader flex space-x-4  w-full h-16 shadow-2xl shadow-grey justify-end items-center" >
            <div className="h1 text-white absolute inset-x-0"> SplinterTracker</div>
            <DarkMode className="absolute right-0 z-10"/> 
            <a href="#home" className="h3 z-10">Home</a>
            <a href="#winningcombo" className="h3 z-10">Win Combo</a>
            <a href="#battles" className="h3 z-10">Battle Analysis</a>
        </div>
    );
};

export default HeaderBar;