import {
    MLHandle,
    MLAjaxCall,
    MLAjaxDisplay
} from "../../ModaLib/javascripts/main.js"

const url = 'https://geocoding-api.open-meteo.com/v1/search?name=montreal';
const button = document.querySelector("#button_id2");

button.addEventListener("click", async (e) => {
    const target = e.target;

    const result = await MLAjaxCall(url);
    MLAjaxDisplay(target, result.results[0].name, result.results[0].population);
});

//!BUG : When clicking on the other button on the page first the eventListener on the button doesn't seem to work

