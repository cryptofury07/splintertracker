import { useState, useEffect } from "react";
import "./App.css";
import DetailCard from "./DetailCard";
import HeaderBar from "./HeaderBar";
import NetworkManager from "./NetworkManager";
import AppConstants from "./AppConstants";
import MonsterCards from "./MonsterCards";
import Author from "./Author";
import BattleCards from "./BattleCards";
import BattleMonsters from "./BattleMonsters";
import AppUtils from "./AppUtils";

function App() {
    // const [details, setDetails] = useState({ name: "Cryptofury", league: "2", power: "40,000", rating: "1122", ecr: "56%" });
    // const [balances, setBalances] = useState([]);
    // const [battles, setBattles] = useState({ dec: "67", sps: "2", vouchers: "4", rating: "1122", credits: "565" });
    // const [monsterWinCards, setMonsterWinCards] = useState([
    //     { url: "https://d36mxiodymuqjm.cloudfront.net/cards_by_level/reward/Fineas Rage_lv1.png", value: "finies Rage" },
    //     { url: "https://d36mxiodymuqjm.cloudfront.net/cards_by_level/reward/Fineas Rage_lv1.png", value: "finies Rage" },
    //     { url: "https://d36mxiodymuqjm.cloudfront.net/cards_by_level/reward/Fineas Rage_lv1.png", value: "finies Rage" },
    // ]);

    const [details, setDetails] = useState({});
    const [balances, setBalances] = useState([]);
    const [totalcards, setTotalCards] = useState([]);
    const [battles, setBattles] = useState({});
    const [monsterWinCards, setMonsterWinCards] = useState([]);

    const [winRate, setWinRate] = useState("");
    const [arrMonsters, setArrMonsters] = useState([]);

    // onButtonClick();
    function onButtonClick() {
        let inputElement = document.getElementById("inputName");
        var value = inputElement.innerText;
        // value = "poprevolt";
        // value = "cryptofury";
        if (value !== "") {
            // value = value.toLowerCase().trim();
            NetworkManager.getDetails(value, successDetailsFunc, failureBattlesFunc);
            NetworkManager.getBalances(value, successBalancesFunc, failureBattlesFunc);
            NetworkManager.getBattles(value, successBattlesFunc, failureBattlesFunc);
        }
    }

    function successBattlesFunc(data) {
        setBattles(data);
    }

    useEffect(() => {
        NetworkManager.getCards(successCardsFunc, failureBattlesFunc);
    }, [battles]);

    function successCardsFunc(data) {
        if (!battles.battles) return;
        setTotalCards(data);
        let arrCards = getMonsterCards(battles, data, 5);
        setMonsterWinCards(arrCards);
    }

    function getMonsterCards(battles, data, maxCount) {
        let hashMap = new Map();
        let totalBattles = battles.battles.length;
        let battlesWon = 0;
        battles.battles.forEach((element) => {
            if (element.winner === battles.player) {
                battlesWon = battlesWon + 1;
                let detail = JSON.parse(element.details);
                if (detail) {
                    let selectedTeam = detail.team2;
                    if (detail?.team1?.player === battles.player) {
                        selectedTeam = detail.team1;
                    }
                    if (selectedTeam && selectedTeam.monsters)
                        selectedTeam.monsters.forEach((element) => {
                            let id = parseInt(element["card_detail_id"]);
                            let cardDetail = data[id - 1];
                            let monsterName = AppConstants.EDITIONS[parseInt(cardDetail.editions)] + "/" + cardDetail.name + "_lv" + element.level + (element.gold ? "_gold" : "");
                            let value = hashMap.get(monsterName);
                            hashMap.set(monsterName, value ? value + 1 : 1);
                        });
                }
            }
        });
        setWinRate(parseInt((battlesWon / totalBattles) * 100) + "%");
        const sortedNumDesc = new Map([...hashMap].sort((a, b) => b[1] - a[1]));
        let count = 0;
        let arrCards = [];
        sortedNumDesc.forEach(function (value, key) {
            if (count < maxCount) {
                let url = AppConstants.CARD_URL + key + ".png";
                let winRate = parseInt((value / battlesWon) * 100);
                arrCards.push({ url: url, value: winRate + "%" });
                count++;
            }
        });
        return arrCards;
    }

    function successDetailsFunc(data) {
        console.log(data);
        setDetails(data);
    }

    function successBalancesFunc(data) {
        console.log(data);
        setBalances(data);
    }

    function failureBattlesFunc(data) {
        console.log(data);
    }

    function analyseMonsters(battle, team, arrTotalCards) {
        let detail = JSON.parse(battle.details);
        let selectedTeam = detail.team2;
        if (detail?.team1?.player === team) {
            selectedTeam = detail.team1;
        }
        let monsters = [];
        selectedTeam.monsters.forEach((element) => {
            let uid = element.uid;
            let totalDamageDelt = 0;
            let totalSuccessHits = 0;
            let totalFailedHits = 0;
            let totalDodge = 0;
            let totalHeal = 0;
            let totalScavenge = 0;
            let totalLifeLeech = 0;

            detail.rounds.forEach((round) => {
                round.actions.forEach((action) => {
                    if (action?.initiator === uid) {
                        if (action.type === "heal") {
                            totalHeal = totalHeal + action.damage;
                        } else {
                            if (action.result === "hit") {
                                totalSuccessHits = totalSuccessHits + 1;
                                totalDamageDelt = totalDamageDelt + action.damage;
                            } else if (action.result === "miss") {
                                totalFailedHits = totalFailedHits + 1;
                            }
                        }
                    } else if (action?.target === uid) {
                        if (action.result === "miss") {
                            totalDodge = totalDodge + 1;
                        }
                        if (action.type === "scavenge") {
                            totalScavenge = totalScavenge + action.damage;
                        }
                        if (action.type === "life leech") {
                            totalLifeLeech = totalLifeLeech + action.damage;
                        }
                    }
                });
            });
            let id = parseInt(element["card_detail_id"]);
            // let cardDetail = props.arrTotalCards[id - 1];
            // let objAnalyse = { url: AppUtils.getURL(element, props.arrTotalCards), name: cardDetail.name, damageDelt: totalDamageDelt, successHits: totalSuccessHits, failedHits: totalFailedHits, dodges: totalDodge };
            // console.log(objAnalyse);
            let arrAttributes = [];
            arrAttributes.push({ name: "Id", value: uid });
            arrAttributes.push({ name: "Damage Delt", value: totalDamageDelt });
            arrAttributes.push({ name: "Success Hits", value: totalSuccessHits });
            arrAttributes.push({ name: "Failed Hits", value: totalFailedHits });
            arrAttributes.push({ name: "Dodges", value: totalDodge });
            arrAttributes.push({ name: "Heal", value: totalHeal });
            arrAttributes.push({ name: "Scavenge", value: totalScavenge });
            arrAttributes.push({ name: "Life Leech", value: totalLifeLeech });
            monsters.push({ id: uid, url: AppUtils.getURL(element, arrTotalCards), arrAttributes: arrAttributes });
        });

        let arrBestInIndex = [1, 2, 4, 5, 6, 7];
        arrBestInIndex.forEach((bestInIndex) => {
            let maxValue = Math.max(...monsters.map((obj) => obj.arrAttributes[bestInIndex].value));
            let arrBestMonster = monsters.filter((obj) => obj.arrAttributes[bestInIndex].value > 0 && obj.arrAttributes[bestInIndex].value == maxValue);
            if (arrBestMonster.length > 0) {
                let bestMonsterObj = arrBestMonster[0];
                if (!bestMonsterObj.arrBestIn) bestMonsterObj.arrBestIn = [];
                bestMonsterObj.arrBestIn.push(bestMonsterObj.arrAttributes[bestInIndex].name);
            }
        });
        console.log(monsters);
        setArrMonsters(monsters);
    }

    function closeBattleMonsters() {
        setArrMonsters([]);
    }

    return (
        <div className="App" suppressContentEditableWarning={true}>
            <HeaderBar />
            <div id="home" className="pt-20 flex flex-1 flex-col h-full items-center justify-center gap-4 ">
                <h2 className="h2 text-2xl pt-20">Tell me who you are</h2>
                <div className="clsSearchBarParent flex">
                    <div
                        className="s1 clsSearchBar flex w-60 h-14 font-medium text-2xl items-center justify-start p-4 rounded-xl"
                        contentEditable="true"
                        data-prompt="Name"
                        id="inputName"
                        suppressContentEditableWarning={true}
                    />
                    <button className="h3 flex w-20 text-2xl font-semibold decoration-none items-center justify-center" contentEditable="false" onClick={onButtonClick}>
                        Go
                    </button>
                </div>
                {details.name && (
                    <div className="flex flex-col mt-20 gap-4">
                        <div className="h2">Welcome {details.name}</div>
                        {details.guild && <div className="h3">{details.guild.name}</div>}
                        <div className="flex flex-row flex-wrap justify-center">
                            <DetailCard name="LEAGUE" value={AppConstants.LEAGUES[details.league]} />
                            <DetailCard name="POWER" value={details.collection_power} />
                            <DetailCard name="RATING" value={details.rating} />
                            <DetailCard name="WIN RATE" value={winRate} />
                        </div>
                        <div className="h2 mt-20">Balances</div>
                        <div className="flex flex-row flex-wrap justify-center self-center max-w-[70%]">
                            {balances.map((balance) => (
                                <DetailCard name={balance.token} value={balance.balance} />
                            ))}
                        </div>
                        <div id="winningcombo" className="h2 pt-20">
                            Based on last {battles && battles.battles && battles.battles.length} battles
                        </div>
                        <div className="h3">[Winning Combo]</div>
                        <MonsterCards arrMonsterCards={monsterWinCards} />
                    </div>
                )}
                {battles.battles && (
                    <div id="battles" className="mb-[40px] pt-20">
                        <div className="h2 mb-[28px]">Recent Battles</div>
                        <div className="h3 mb-[44px]">[Click on player's name to analyse]</div>
                        <BattleCards arrBattleCards={battles.battles} arrTotalCards={totalcards} analyseMonsters={analyseMonsters} />
                    </div>
                )}
                {arrMonsters.length > 0 && <BattleMonsters arrBattleMonsters={arrMonsters} closeCallBack={closeBattleMonsters}></BattleMonsters>}

                <Author />
            </div>
        </div>
    );
}

export default App;
