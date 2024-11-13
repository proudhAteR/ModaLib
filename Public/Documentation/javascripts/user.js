import {
    MLHandle,
    MLAjaxCall,
    MLAjaxDisplay
} from "../../ModaLib/javascripts/main.js";

const url = 'https://geocoding-api.open-meteo.com/v1/search?name=montreal'

document.body.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.closest("#button_id")) {
        const result = await MLAjaxCall(url);
        MLAjaxDisplay(target, result.results[0].name, result.results[0].population);
    }

    MLHandle(target)
});

function myFunction(value) {
    console.log(value);
}