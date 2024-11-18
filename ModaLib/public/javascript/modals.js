import { triggerButton } from "./main.js";
const animationDuration = 400;
let triggeredElement;
let animation;
export function searchModal() {
    const modal = Array.from(document.querySelectorAll(".modal-container")).find((element) => element.classList.contains(`by:${triggerButton.id}`));
    triggeredElement = modal;
    animation = triggerButton.dataset.animation
        ? triggerButton.dataset.animation
        : "fade";
    return triggeredElement;
}
export function show(modal) {
    if (isHidden(modal)) {
        modal.classList.remove(`animate`);
    }
    modal.classList.add(`show_${animation}`);
}
export function hide(modal) {
    modal.classList.add(`animate`);
    setTimeout(() => {
        modal.classList.remove(`show_${animation}`);
    }, animationDuration);
}
function isHidden(modal) {
    return modal.classList.contains(`animate`);
}
export function isModalButtonClicked(target) {
    return (target.closest("[data-action]") ||
        target.closest("[data-second]") ||
        target.closest("[data-close]"));
}
export function setTitle(target, title) {
    target.setAttribute("data-title", title);
}
export function setMessage(target, message) {
    target.setAttribute("data-say", message);
}
export function isModalTriggered(target) {
    return target.closest("[data-trigger]");
}
export function generateModal(trigger) {
    let options = trigger.dataset.options;
    let buttons = ["Cancel", "OK"];
    let s = "hide";
    let color = trigger.getAttribute("data-trigger");
    color = trigger.getAttribute("data-color")
        ? trigger.getAttribute("data-color")
        : color;
    if (trigger.getAttribute("data-trigger").includes("confirm")) {
        s = "";
        buttons = options ? options.split(",") : buttons;
    }
    else {
        buttons = ["", options?.split(",")[0] ?? "OK"];
    }
    return `
    <div data-animation ="${trigger.dataset.animation}" class="modal-container by:${trigger.id} show_${trigger.dataset.animation} said">
        <div class="modal-content">
            <div class="title_grp">
                    <h1 class="title">${trigger.getAttribute("data-title")}</h1>
                    <span tabindex ="0" data-close aria-label="close the modal"><i class="fa-solid fa-xmark"></i></span>
            </div>
            <p class="text">
                ${trigger.getAttribute("data-say")} 
            </p>
            <div class="btn_grp">
                <div class="grp_content">
                    <button tabindex = ${s === "hide" ? "" : "2"} data-second aria-label="secondary action" class="btn modal-second-btn ${s}">${buttons[0]}                 
                    </button>
                    <button tabindex ="1" data-action aria-label="main action" class="btn modal-${color}-btn">${buttons[1]}
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}