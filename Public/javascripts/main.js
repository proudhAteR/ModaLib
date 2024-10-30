import { searchModal as findModal, generateModal, hide, show, } from "./modals.js";
let triggerButton;
let triggeredElement;
document.body.addEventListener("click", (e) => {
    let target = e.target;
    if (target.closest("[data-alert]")) {
        defaultModals(target);
    }
    if (target.closest("[data-confirm]")) {
        defaultModals(target);
    }
    if (target.closest("[data-trigger]")) {
        triggerButton = target;
        triggeredElement = findModal();
        if (triggeredElement.classList.contains(`by:${triggerButton.id}`)) {
            show(triggeredElement);
        }
    }
    triggeredElement = findModal();
    target = e.target;
    if (target.closest("[closing-attribute]")) {
        hide(triggeredElement);
    }
});
function defaultModals(target) {
    triggerButton = target;
    triggeredElement = findModal();
    let holder = findHolder(triggerButton);
    if (holder) {
        if (!holder.classList.contains("gen")) {
            holder.classList.add("gen");
            let html = generateModal(triggerButton, holder);
            document.body.innerHTML += html;
        }
    }
    if (triggeredElement.classList.contains(`by:${triggerButton.id}`)) {
        show(triggeredElement);
    }
}
export function getTrigger() {
    return triggerButton;
}
function findHolder(button) {
    return Array.from(document.querySelectorAll(".holder")).find((holder) => holder.classList.contains(`by:${button.id}`));
}
