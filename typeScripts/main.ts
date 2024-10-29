import {searchModal} from "./modals.js";

let triggerButton: HTMLElement;

export const modals: HTMLElement[] = Array.from(
  document.querySelectorAll(".modal-container")
);

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.closest("[data-trigger]")) {
    triggerButton = target;
    searchModal()
  }
});

export function getTrigger() {
  return triggerButton;
}

