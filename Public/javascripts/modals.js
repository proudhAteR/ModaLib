import { getTrigger } from "./main.js";
const animationDuration = 400;
let triggeredElement;
let animation;
export function searchModal() {
    const triggerButton = getTrigger();
    const modal = Array.from(document.querySelectorAll(".modal-container")).find((modal) => modal.classList.contains(`by:${triggerButton.id}`));
    if (modal) {
        triggeredElement = modal;
        animation = triggeredElement.dataset.animation;
    }
    return triggeredElement;
}
export function show(modal) {
    if (isHidden(modal)) {
        modal.classList.remove(`do_${animation}`);
    }
    modal.classList.add(`show_${animation}`);
}
export function hide(modal) {
    modal.classList.add(`do_${animation}`);
    setTimeout(() => {
        modal.classList.remove(`show_${animation}`);
    }, animationDuration);
}
function isHidden(modal) {
    return modal.classList.contains(`do_${animation}`);
}
export function generateModal(trigger, holder) {
    return `
    <div data-animation ="${trigger.dataset.animation}" class="modal-container by:${trigger.id} show_${trigger.dataset.animation}">
        <div class="modal-content">
            <h1>${holder.querySelector(".title").textContent}</h1>
            <p class="text">
                ${holder.querySelector(".text").textContent} 
            </p>
            <div class="btn_grp">
                <div class="grp_content">
                    <button closing-attribute class="btn modal-danger-btn">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
}
