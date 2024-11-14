import { searchModal as findModal, generateModal, hide, show, isModalTriggered, setMessage, setTitle, isModalButtonClicked, } from "./modals.js";
import makeCall from "./api.js";
export let triggerButton;
let triggeredElement;
document.body.addEventListener("click", (e) => {
    const target = e.target;
    triggerButton = target;
    if (isModalTriggered(target)) {
        handleTriggerClick(target);
    }
});
MLHandle();
export function MLHandle(callback = null) {
    document.body.addEventListener("click", (e) => {
        const target = e.target;
        if (isModalButtonClicked(target)) {
            if (callback) {
                callback(target.closest("[data-action]") !== null);
            }
            hide(triggeredElement);
        }
    });
}
export async function MLAjaxCall(url) {
    const result = await makeCall(url);
    return result;
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
    triggerButton = target;
    if (!target.dataset.say) {
        setTitle(target, title);
        setMessage(target, message);
    }
    if (!target.classList.contains("said")) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        target.classList.add("said");
        const modalWrapper = document.createElement("div");
        modalWrapper.innerHTML = generateModal(target);
        document.body.appendChild(modalWrapper);
        window.scrollTo(0, scrollTop);
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
