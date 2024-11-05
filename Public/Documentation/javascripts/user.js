import { handle } from "../../ModaLib/javascripts/main.js";

document.body.addEventListener("click", (e) => {
    const target = e.target;
    handle(target, (value) => myFunction(value));
});

function myFunction(value){
    console.log(value);
}