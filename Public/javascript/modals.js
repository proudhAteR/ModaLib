import { getTrigger, modals } from "./main.js";
let animation;
const animationDuration = 700;
let triggeredElement;
export function searchModal() {
    const triggerButton = getTrigger();
    modals.forEach((modal) => {
        if (modal.classList.contains(`by:${triggerButton.id}`)) {
            triggeredElement = modal;
            animation = triggeredElement.dataset.animation;
            show(modal);
            return;
        }
    });
    handleElement();
}
function handleElement() {
    if (triggeredElement) {
        triggeredElement.addEventListener("click", (e) => {
            const target = e.target;
            if (target.closest("[closing-attribute]")) {
                hide(triggeredElement);
            }
        });
    }
}
function show(modal) {
    if (isHidden(modal)) {
        modal.classList.remove(animation);
    }
    modal.classList.add(`show_${animation}`);
}
function hide(modal) {
    modal.classList.add(animation);
    setTimeout(() => {
        modal.classList.remove(`show_${animation}`);
    }, animationDuration);
}
function isHidden(modal) {
    return modal.classList.contains("fade");
}
