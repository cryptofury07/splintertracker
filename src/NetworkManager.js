
import AppConstants from "./AppConstants";

function NetworkManager() {}

NetworkManager.prototype.constructor = NetworkManager;

NetworkManager.get = function (url, successFunc, failureFunc) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            successFunc(data);
        })
        .catch((error) => {
            console.log(error);
            failureFunc(error);
        });
}; 

NetworkManager.getBattles = function (value,successFunc,failureFunc) {
    NetworkManager.get(AppConstants.ALL_BATTLES + value,successFunc,failureFunc);
};

NetworkManager.getDetails = function (value,successFunc,failureFunc) {
    NetworkManager.get(AppConstants.DETAILS + value,successFunc,failureFunc);
};

NetworkManager.getBalances = function (value,successFunc,failureFunc) {
    NetworkManager.get(AppConstants.BALANCES + value,successFunc,failureFunc);
};

NetworkManager.getCards = function (successFunc,failureFunc) {
    NetworkManager.get(AppConstants.ALL_CARDS,successFunc,failureFunc);
};


export default NetworkManager;


