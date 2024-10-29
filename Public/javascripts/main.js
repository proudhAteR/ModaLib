const triggerButton = document.querySelector("[data-trigger]");
const modals = Array.from(document.querySelectorAll(".modal-container"));
let triggeredElement;
let animation;
const animationDuration = 1400;
triggerButton.addEventListener("click", searchModal);
function searchModal() {
    modals.forEach((modal) => {
        if (modal.classList.contains(`by:${triggerButton.id}`)) {
            triggeredElement = modal;
            animation = triggeredElement.dataset.animation;
            show(modal);
            triggeredElement.addEventListener("click", (e) => {
                const target = e.target;
                if (target.closest("[closing-attribute]")) {
                    toggleDisplay(triggeredElement);
                }
            });
        }
    });
}
function toggleDisplay(modal) {
    if (isShown(modal)) {
        hide(modal);
    }
    else {
        show(modal);
    }
}
function show(modal) {
    if (isHidden(modal)) {
        modal.classList.remove(animation);
        modal.classList.remove("hide");
    }
    modal.classList.add(`show_${animation}`);
}
function hide(modal) {
    modal.classList.add(animation);
    setTimeout(() => {
        modal.classList.remove(`show_${animation}`);
        modal.classList.add("hide");
    }, animationDuration);
}
function isHidden(modal) {
    return modal.classList.contains("hide");
}
function isShown(modal) {
    return modal.classList.contains(`show_${animation}`);
}
