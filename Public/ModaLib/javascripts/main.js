import { searchModal as findModal, generateModal, hide, show, } from "./modals.js";
export let triggerButton;
let triggeredElement;
document.body.addEventListener("click", (e) => {
    const target = e.target;
    triggerButton = target;
    if (target.closest("[data-trigger]")) {
        handleTriggerClick(target);
    }
    if (target.closest("[closing-attribute]")) {
        hide(triggeredElement);
    }
});
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
function defaultModals(target) {
    triggerButton = target;
    const message = triggerButton.dataset.say;
    if (message && !triggerButton.classList.contains("said")) {
        triggerButton.classList.add("said");
        const html = generateModal(triggerButton);
        document.body.innerHTML += html;
    }
    triggeredElement = findModal();
    if (triggeredElement &&
        triggeredElement?.classList.contains(`by:${triggerButton.id}`)) {
        show(triggeredElement);
    }
}
