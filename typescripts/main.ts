import {
  searchModal as findModal,
  generateModal,
  hide,
  show,
} from "./modals.js";

export let triggerButton: HTMLElement;
let triggeredElement: HTMLElement;

document.body.addEventListener("click", (e) => {
  let target = e.target as HTMLElement;

  if (target.closest("[data-trigger]")) {
    triggerButton = target;
    triggeredElement = findModal();

    if (!target.dataset.trigger.includes("custom")) {
      defaultModals(target);
    }

    if (triggeredElement.classList.contains(`by:${triggerButton.id}`)) {
      show(triggeredElement);
    }
  }

  if (target.closest("[closing-attribute]")) {
    hide(triggeredElement);
  }
});

function defaultModals(target: HTMLElement) {
  triggerButton = target;
  let message = triggerButton.dataset.say
  if(message){
    if (!triggerButton.classList.contains("said")) {
        triggerButton.classList.add("said");
        let html = generateModal(triggerButton);
        document.body.innerHTML += html;
      }
  }
 
  triggeredElement = findModal();
  if (triggeredElement) {
    if (triggeredElement.classList.contains(`by:${triggerButton.id}`)) {
      show(triggeredElement);
    }
  }
}
