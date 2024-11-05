import {
  searchModal as findModal,
  generateModal,
  hide,
  show,
} from "./modals.js";

export let triggerButton: HTMLElement;
let triggeredElement: HTMLElement;

document.body.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  triggerButton = target;
  if (target.closest("[data-trigger]")) {
    handleTriggerClick(target as HTMLElement);
  }
});

export function alert(
  target: HTMLElement,
  callback: (value: boolean) => boolean = null
) {
  if (target.closest("[data-action]") || target.closest("[data-second]")) {
    if (callback) {
      callback(target.closest("[data-action]") !== null);
    }
    hide(triggeredElement);
  }
}

function handleTriggerClick(triggerButton: HTMLElement) {
  triggeredElement = findModal();

  if (!triggerButton.dataset.trigger.includes("custom")) {
    defaultModals(triggerButton);
  }

  if (
    triggeredElement &&
    triggeredElement.classList.contains(`by:${triggerButton.id}`)
  ) {
    show(triggeredElement);
  }
}

function defaultModals(target: HTMLElement) {
  triggerButton = target;
  const message = triggerButton.dataset.say;

  if (message && !triggerButton.classList.contains("said")) {
    triggerButton.classList.add("said");
    const html = generateModal(triggerButton);
    document.body.innerHTML += html;
  }

  triggeredElement = findModal();

  if (
    triggeredElement &&
    triggeredElement?.classList.contains(`by:${triggerButton.id}`)
  ) {
    show(triggeredElement);
  }
}
