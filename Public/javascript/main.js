import { searchModal } from "./modals.js";
let triggerButton;
export const modals = Array.from(document.querySelectorAll(".modal-container"));
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest("[data-trigger]")) {
        triggerButton = target;
        searchModal();
    }
});
export function getTrigger() {
    return triggerButton;
}
