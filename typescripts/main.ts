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

  if (isModalTriggered(target)) {
    handleTriggerClick(target);
  }
});

export function MLHandle(callback: (value: boolean) => boolean = null) {
  
  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (isModalButtonClicked(target)) {
      if (callback) {
        callback(target.closest("[data-action]") !== null);
      }
      hide(triggeredElement);
    }
  });
}

export async function MLAjaxCall(url: string) {
  const result = await makeCall(url);
  return result;
}
async function makeCall(url: string) {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data : ${response.status} ${response.statusText}`
      );
    }
    let json: JSON = await response.json();

    return json;
  } catch (e) {
    console.log(e);
  }
}

function isModalButtonClicked(target: HTMLElement) {
  return (
    target.closest("[data-action]") ||
    target.closest("[data-second]") ||
    target.closest("[data-close]")
  );
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

function createModal(target: HTMLElement, title: string, message: string) {
  triggerButton = target;

  if (!target.dataset.say) {
    MLSetTitle(target, title);
    MLSetMessage(target, message);
  }

  if (!target.classList.contains("said")) {
    target.classList.add("said");
    const html = generateModal(target);
    document.body.innerHTML += html;
  }

  triggeredElement = findModal();

  if (
    triggeredElement &&
    triggeredElement?.classList.contains(`by:${target.id}`)
  ) {
    show(triggeredElement);
  }
}

function defaultModals(target: HTMLElement) {
  const message = target.dataset.say;
  const title = target.dataset.title;

  if (message && !target.classList.contains("said")) {
    createModal(target, message, title);
  }
}

export function MLAjaxDisplay(
  target: HTMLElement,
  message: string,
  title: string
) {
  createModal(target, message, title);
}

function MLSetTitle(target: HTMLElement, title: string) {
  target.setAttribute("data-title", title);
}
function MLSetMessage(target: HTMLElement, message: string) {
  target.setAttribute("data-say", message);
}

function isModalTriggered(target: HTMLElement) {
  return target.closest("[data-trigger]");
}
