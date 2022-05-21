import AppConstants from "./AppConstants";
import BattleMonsters from "./BattleMonsters";
import AppUtils from "./AppUtils";
import { useState } from "react";
const BattleCards = (props) => {
    const [arrMonsters, setArrMonsters] = useState([]);
    function analyseMonsters(battle, team) {
        let detail = JSON.parse(battle.details);
        let selectedTeam = detail.team2;
        if (detail?.team1?.player === team) {
            selectedTeam = detail.team1;
        }
        let monsters = []
        selectedTeam.monsters.forEach((element) => {
            let uid = element.uid;
            let totalDamageDelt = 0;
            let totalSuccessHits = 0;
            let totalFailedHits = 0;
            let totalDodge = 0;

            detail.rounds.forEach((round) => {
                round.actions.forEach((action) => {
                    if (action.initiator === uid) {
                        if (action.result === "hit") {
                            totalSuccessHits = totalSuccessHits + 1;
                            totalDamageDelt = totalDamageDelt + action.damage;
                        } else if (action.result === "miss") {
                            totalFailedHits = totalFailedHits + 1;
                        }
                    }
                    if (action.target === uid && action.result === "miss") {
                        totalDodge = totalDodge + 1;
                    }
                });
            });
            let id = parseInt(element["card_detail_id"]);
            let cardDetail = props.arrTotalCards[id - 1];
            // let objAnalyse = { url: AppUtils.getURL(element, props.arrTotalCards), name: cardDetail.name, damageDelt: totalDamageDelt, successHits: totalSuccessHits, failedHits: totalFailedHits, dodges: totalDodge };
            // console.log(objAnalyse);
            let arrAttributes = [];
            arrAttributes.push({ name: "Name", value: cardDetail.name })
            arrAttributes.push({ name: "Damage Delt", value: totalDamageDelt })
            arrAttributes.push({ name: "Success Hits", value: totalSuccessHits })
            arrAttributes.push({ name: "Failed Hits", value: totalFailedHits })
            arrAttributes.push({ name: "Dodges", value: totalDodge })
            monsters.push({ url: AppUtils.getURL(element, props.arrTotalCards), arrAttributes: arrAttributes })
        });
        console.log(monsters);
        setArrMonsters(monsters);
    }

    function closeBattleMonsters(){
        setArrMonsters([]);
    }

    return (
        <div>
            {arrMonsters.length > 0 && <BattleMonsters arrBattleMonsters={arrMonsters} closeCallBack={closeBattleMonsters}></BattleMonsters>}
            <ul className="clsBattleCardParent clsCard rounded-xl flex flex-col  max-w-[90%]  max-h-[800px]">
                {props.arrBattleCards.map((element) => (
                    <li className="clsBattleCard flex flex-col p-14">
                        <div className="flex flex-row gap-4 justify-between	">
                            <div className="h3">{element.match_type}</div>
                            <button className="h3" data-winner={element.player_1 === element.winner ? "true" : "false"} onClick={() => analyseMonsters(element, element.player_1)}>
                                {element.player_1}
                            </button>
                            <div className="h3">VS</div>
                            <button className="h3" data-winner={element.player_2 === element.winner ? "true" : "false"} onClick={() => analyseMonsters(element, element.player_1)}>
                                {element.player_2}
                            </button>
                            <div className="clsDecWins" data-winner={element.player_1 === element.winner ? "true" : "false"}>+{element.reward_dec} DEC</div>
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
