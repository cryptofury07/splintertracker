import AppConstants from "./AppConstants";
const BattleMonsters = (props) => {
    return (
        <div className="clsBattleAnalysis relative clsCard rounded-xl">
            <div className="clsBattleAnalysisHeader h2 relative">
                Battle Analysis
                <button className="absolute right-4" onClick={() => props.closeCallBack()}>
                    Close
                </button>
            </div>
            <ul className="clsBattleMonsterParent  flex flex-row flex-wrap max-w-[100%]  max-h-[100%]">
                {props.arrBattleMonsters.map((element) => (
                    <li className="clsBattleMonster flex flex-col p-10 max-w-[33.33%] min-w-[550px]">
                        <div className="flex flex-row gap-4">
                            <img className="flex max-h-[320px] mr-[20px]" src={element.url} />
                            <div className="flex flex-col gap-2">
                                {element.arrAttributes.map((element) => (
                                    <div className="flex h3">
                                        {element.name} : {element.value}
                                    </div>
                                ))} 
                                <div className="flex h3 gap-4 flex-wrap">Best In : {element.arrBestIn && element.arrBestIn.map((element) => <div className="clsBestIn flex h3">{element}</div>)}</div>
                            </div>
                        </div>
                    </li> 
                ))}
            </ul>
        </div>
    );
};

export default BattleMonsters;
