import {
  searchModal as findModal,
  generateModal,
  hide,
  show,
  isModalTriggered,
  setMessage,
  setTitle,
  isModalButtonClicked,
} from "./modals.js";

import makeCall from "./api.js";

export let triggerButton: HTMLElement;
let triggeredElement: HTMLElement;

document.body.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  triggerButton = target;

  if (isModalTriggered(target)) {
    handleTriggerClick(target);
  }
});
initIcons();
MLHandle();

export function MLHandle(callback: (value: boolean) => boolean = null) {
  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (isModalButtonClicked(target) || target === triggeredElement) {
      if (callback) {
        callback(target.closest("[data-action]") !== null);
      }
      hide(triggeredElement);
    }
  });
  escapeHandler();
  trapFocus();
}
function escapeHandler() {
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Escape") {
      if (triggeredElement) {
        hide(triggeredElement);
      }
    }
  });
}
function trapFocus() {
  document.body.addEventListener("keydown", (e) => {
    if (!triggeredElement || e.key !== "Tab") return;

    e.preventDefault();

    const focusableElements = Array.from(
      triggeredElement.querySelectorAll(
        "[data-action], [data-close], [data-second]"
      )
    ) as HTMLElement[];
    if (!focusableElements.length) return;

    const currentIndex = Array.prototype.indexOf.call(
      focusableElements,
      document.activeElement
    );
    let newIndex =
      (currentIndex + (e.shiftKey ? -1 : 1)) % focusableElements.length;
    if (newIndex < 0) newIndex = focusableElements.length - 1;

    focusableElements[newIndex].focus();
  });
}

export async function MLAjaxCall(url: string) {
  const result = await makeCall(url);
  return result;
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
    setTitle(target, title);
    setMessage(target, message);
  }

  if (!target.classList.contains("said")) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    target.classList.add("said");

    const modalWrapper = document.createElement("div");
    modalWrapper.innerHTML = generateModal(target);
    document.body.appendChild(modalWrapper);

    window.scrollTo(0, scrollTop);
  }

  triggeredElement = findModal();

  if (
    triggeredElement &&
    triggeredElement?.classList.contains(`by:${target.id}`)
  ) {
    show(triggeredElement);
    triggeredElement.focus();
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
  if (!target.dataset.trigger.includes("custom")) {
    createModal(target, message, title);
  }
}

function initIcons() {
  const fontAwesomeLink = document.createElement("link");
  let closeIcons = document.querySelectorAll("[data-close]");
  fontAwesomeLink.rel = "stylesheet";
  fontAwesomeLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";

  document.head.appendChild(fontAwesomeLink);

  closeIcons.forEach((icon) => {
    if (!icon.innerHTML) {
      icon.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    }
  });
}

function initTabIndex(){
  
}