import { useState, useEffect } from "react";
import "./App.css";
import DetailCard from "./DetailCard";
import HeaderBar from "./HeaderBar";
import NetworkManager from "./NetworkManager";
import AppConstants from "./AppConstants";
import MonsterCards from "./MonsterCards";
import Author from "./Author";
import BattleCards from "./BattleCards";
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
    // onButtonClick();
    function onButtonClick() {
        let inputElement = document.getElementById("inputName");
        var value = inputElement.innerText;
        value = "poprevolt";
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

    return (
        <div className="App" suppressContentEditableWarning={true}>
            <HeaderBar className="absolute" />
            <div className="flex flex-1 flex-col h-full items-center justify-center gap-4 ">
                <h2 className="h2 text-2xl mt-20">Tell me who you are</h2>
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
                        <div className="h2 mt-20">Based on last {battles && battles.battles && battles.battles.length} battles</div>
                        <div className="h2">Winning Combo</div>
                        <MonsterCards arrMonsterCards={monsterWinCards} />
                    </div>
                )}
                {battles.battles && (
                    <div className="">
                        <div className="h2 mb-4">Battles</div>
                        <BattleCards arrBattleCards={battles.battles} arrTotalCards={totalcards} />
                    </div>
                )}
                <Author />
            </div>
        </div>
    );
}

export default App;
