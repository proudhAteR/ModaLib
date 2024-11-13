import { searchModal as findModal, generateModal, hide, show, } from "./modals.js";
export let triggerButton;
let triggeredElement;
document.body.addEventListener("click", (e) => {
    const target = e.target;
    triggerButton = target;
    if (isModalTriggered(target)) {
        handleTriggerClick(target);
    }
});
function MLSetTitle(target, title) {
    target.setAttribute("data-title", title);
}
function MLSetMessage(target, message) {
    target.setAttribute("data-say", message);
}
function isModalTriggered(target) {
    return target.closest("[data-trigger]");
}
export function MLHandle(target, callback = null) {
    if (isModalButtonClicked(target)) {
        if (callback) {
            callback(target.closest("[data-action]") !== null);
        }
        hide(triggeredElement);
    }
}
export async function MLAjaxCall(url) {
    const result = await makeCall(url);
    return result;
}
async function makeCall(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data : ${response.status}/ ${response.statusText}`);
        }
        let json = await response.json();
        return json;
    }
    catch (e) {
        console.log(e);
    }
}
function isModalButtonClicked(target) {
    return (target.closest("[data-action]") ||
        target.closest("[data-second]") ||
        target.closest("[data-close]"));
}
function handleTriggerClick(triggerButton) {
    triggeredElement = findModal();
    if (!triggerButton.dataset.trigger.includes("custom")) {
        defaultModals(triggerButton);
    }
    if (triggeredElement &&
        triggeredElement.classList.contains(`by:${triggerButton.id}`)) {
        show(triggeredElement);
    }
}
function createModal(target, title, message) {
    if (!target.dataset.say && !target.classList.contains("said")) {
        MLSetTitle(target, title);
        MLSetMessage(target, message);
        target.classList.add("said");
        const html = generateModal(target);
        document.body.innerHTML += html;
    }
    triggeredElement = findModal();
    if (triggeredElement &&
        triggeredElement?.classList.contains(`by:${target.id}`)) {
        show(triggeredElement);
    }
}
function defaultModals(target) {
    const message = target.dataset.say;
    const title = target.dataset.title;
    if (message && !target.classList.contains("said")) {
        createModal(target, message, title);
    }
}
export function MLAjaxDisplay(target, message, title) {
    createModal(target, message, title);
}
