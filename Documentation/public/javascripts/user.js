import {
    MLHandle,
    MLAjaxCall,
    MLAjaxDisplay
} from "../../../ModaLib/public/javascripts/main.js"
const cities = {
    Montreal: 'Montreal',
    Tokyo: 'Tokyo',
    Kinshasa: 'Kinshasa',
    Paris: 'Paris',
    London: 'London',
    Beijing: 'Beijing',
    Sydney: 'Sydney',
    Moscow: 'Moscow',
    Cairo: 'Cairo',
    Istanbul: 'Istanbul',
    MexicoCity: 'Mexico City',
    Bangkok: 'Bangkok',
    LosAngeles: 'Los Angeles',
    Shanghai: 'Shanghai',
    Mumbai: 'Mumbai',
    Dubai: 'Dubai',
    Johannesburg: 'Johannesburg',
    Seoul: 'Seoul'
}
const randomCityKey = Object.keys(cities)[getRandomCityIndex()];
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${randomCityKey}`;
const button = document.querySelector("#button_id2");
let result;

button.addEventListener("click", async () => {

    if (!button.classList.contains('said')) {
        result = await MLAjaxCall(url);
        MLAjaxDisplay(button, result.results[0].name, `${result.results[0].population} habitants`);
    }

});
function getRandomCityIndex() {
    return Math.floor(Math.random() * Object.keys(cities).length);
}
//TODO : Rework AJAX modals