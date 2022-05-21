import AppConstants from "./AppConstants";
const BattleMonsters = (props) => {
    return (
        <div>
            <div className="h3 relative">Battle Analysis <button className="absolute right-0" onClick={()=> props.closeCallBack()}>Close</button></div>
            <ul className="clsBattleMonsterParent clsCard rounded-xl flex flex-col  max-w-[90%]  max-h-[800px]">
                {props.arrBattleMonsters.map((element) => (
                    <li className="clsBattleMonster flex flex-col p-14">
                        <div className="flex flex-row gap-4">
                            <img className="flex max-h-[320px] mr-[40px]" src={element.url} />
                            <div className="flex flex-col">
                                {element.arrAttributes.map((element) => (
                                    <div className="flex h3">{element.name} : {element.value}</div>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BattleMonsters;
