import AppConstants from "./AppConstants";
const BattleCards = (props) => {
    return (
        <div>
            <ul className="clsBattleCardParent clsCard rounded-xl flex flex-col  max-w-[100%]  max-h-[800px]">
                {props.arrBattleCards.map((element) => (
                    <li className="clsBattleCard flex flex-col p-14">
                        <div className="flex flex-row gap-4 justify-between	">
                            <div className="h3">{element.match_type}</div>
                            <button className="h3" data-winner={element.player_1 === element.winner ? "true" : "false"} onClick={() => props.analyseMonsters(element, element.player_1,props.arrTotalCards)}>
                                {element.player_1}
                            </button>
                            <div className="h3">VS</div>
                            <button className="h3" data-winner={element.player_2 === element.winner ? "true" : "false"} onClick={() => props.analyseMonsters(element, element.player_2,props.arrTotalCards)}>
                                {element.player_2}
                            </button>
                            <div className="clsDecWins" data-winner={element.player_1 === element.winner ? "true" : "false"}>
                                +{element.reward_dec} DEC
                            </div>
                            <a className="h3" href={AppConstants.VIEW_BATTLE + element.battle_queue_id_1} target="_blank" rel="noopener noreferrer">
                                Watch
                            </a>
                        </div>
                        <div className="flex flex-row gap-4"></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BattleCards;
