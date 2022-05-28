/**
 * Author:  Bala Krishnan K.
 **/
 import AppConstants from "./AppConstants";

function AppUtils() {}

AppUtils.prototype.constructor = AppUtils;

AppUtils.getURL = function (element,data) {
    let id = parseInt(element["card_detail_id"]);
    let cardDetail = data[id - 1];
    let monsterName = AppConstants.EDITIONS[parseInt(cardDetail.editions)] + "/" + cardDetail.name + "_lv" + element.level + (element.gold ? "_gold" : "");
    return AppConstants.CARD_URL + monsterName + ".png";;
};

export default AppUtils;

