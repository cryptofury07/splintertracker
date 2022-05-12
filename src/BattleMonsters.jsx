import AppConstants from "./AppConstants";
const BattleMonsters = (props) => {
    return (
        <ul className="clsBattleMonsterParent pos-absolute clsCard rounded-xl flex flex-col  max-w-[90%]  max-h-[800px]">
            {props.arrBattleMonsters.map((element) => (
                <li className="clsBattleMonster flex flex-col p-14 rounded-xl">
                    <div className="flex flex-row gap-4 justify-between	">
                        <img className="flex" src={element.url} />
                        <div className="flex flex-col">
                            {element.arrAttributes.map((element) => (
                                <div className="flex">{element.name}:{element.value}</div>
                            ))}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BattleMonsters;
