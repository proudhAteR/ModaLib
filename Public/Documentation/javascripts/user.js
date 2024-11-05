import { alert } from "../../ModaLib/javascripts/main.js";

document.body.addEventListener("click", (e) => {
    const target = e.target;
    
    alert(target, (value) => console.log(value));
});