import {
    MLAjaxProcess,
    isSaid
} from "../../../ModaLib/public/javascripts/main.js"
const cities = {
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
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior

        const targetId = link.getAttribute("href").substring(1); // Get the ID (remove #)
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth", // Enables smooth scrolling
                block: "start",     // Aligns the element to the top of the viewport
            });
        }
    });
});
const randomCityKey = Object.keys(cities)[getRandomCityIndex()];
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${randomCityKey}`;
const button = document.querySelector("#button_id2");
button.addEventListener("click", async () => {

    if (!isSaid(button)) {
        MLAjaxProcess(
            url,
            button,
            (result) => ({
                message: result.results[0].name,
                title: `${result.results[0].population} habitants`,
            })
        );

    }

});
function getRandomCityIndex() {
    return Math.floor(Math.random() * Object.keys(cities).length);
}


