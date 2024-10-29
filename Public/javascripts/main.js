const triggerButton = document.querySelector("button[trigger-attribute]");
const modals = Array.from(document.querySelectorAll(".modal-container"));
let triggeredElement;
triggerButton.addEventListener("click", searchModal);
function searchModal() {
    modals.forEach((modal) => {
        if (modal.classList.contains(`:${triggerButton.id}`)) {
            toggleDisplay(modal);
            triggeredElement = modal;
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
        modal.classList.add("fade");
        setTimeout(() => {
            modal.classList.remove("show");
            modal.classList.add("hide");
        }, 1500);
    }
    else {
        if (isHidden(modal)) {
            modal.classList.remove("fade");
            modal.classList.remove("hide");
        }
        modal.classList.add("show");
    }
}
function isHidden(modal) {
    return modal.classList.contains("hide");
}
function isShown(modal) {
    return modal.classList.contains("show");
}
