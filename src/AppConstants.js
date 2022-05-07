
// var BASE_URL = "https://api.splinterlands.io/";
var BASE_URL = "https://api2.splinterlands.com/";

const myConstClass={
    BASE_URL:BASE_URL,
    ALL_BATTLES:BASE_URL+"battle/history?player=",
    DETAILS:BASE_URL+"players/details?name=",
    BALANCES:BASE_URL+"players/balances?username=",
    ALL_CARDS:BASE_URL+"cards/get_details",
    CARD_URL:"https://d36mxiodymuqjm.cloudfront.net/cards_by_level/",
    VIEW_BATTLE:"https://splinterlands.com/?p=battle&id=",
    EDITIONS:["alpha","beta","promo","reward","untamed","dice","gladius","chaos"],
    LEAGUES:["Novice","Bronze 3","Bronze 2","Bronze 1","Silver 3","Silver 2","Silver 1","Gold 3","Gold 2","Gold 1","Diamond 3","Diamond 2","Diamond 1","Champion 3","Champion 2","Champion 1"]
};

export default myConstClass;