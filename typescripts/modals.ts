import { triggerButton } from "./main.js";

const animationDuration = 400;
let triggeredElement: HTMLElement;
let animation: string;

export function searchModal() {
  const modal: Element = Array.from(
    document.querySelectorAll(".modal-container")
  ).find((element) => element.classList.contains(`by:${triggerButton.id}`));
  triggeredElement = modal as HTMLElement;

  animation = triggerButton?.getAttribute("data-animation")
    ? (triggeredElement.getAttribute("data-animation") as string)
    : "fade";

  return triggeredElement;
}

export function show(modal: HTMLElement) {
  if (isHidden(modal)) {
    modal.classList.remove(`do_${animation}`);
  }

  modal.classList.add(`show_${animation}`);
}

export function hide(modal: HTMLElement) {
  modal.classList.add(`do_${animation}`);

  setTimeout(() => {
    modal.classList.remove(`show_${animation}`);
  }, animationDuration);
}

function isHidden(modal: HTMLElement) {
  return modal.classList.contains(`do_${animation}`);
}

export function generateModal(trigger: HTMLElement) {
  let options: string = trigger.dataset.options;
  let buttons = ["Back", "Confirm"];
  let s = "hide";
  let color = trigger.getAttribute("data-trigger") as string;

  color = trigger.getAttribute("data-color")
    ? (trigger.getAttribute("data-color") as string)
    : color;

  if (trigger.getAttribute("data-trigger").includes("confirm")) {
    s = "";
    buttons = options ? options.split(",") : buttons;
  } else {
    buttons = ["", options?.split(",")[0] ?? "Close"];
  }

  return `
    <div data-animation ="${
      trigger.dataset.animation
    }" class="modal-container by:${trigger.id} show_${
    trigger.dataset.animation
  } said">
        <div class="modal-content">
            <h1 class= "title">${
              trigger.getAttribute("data-title") as string
            }</h1>
            <p class="text">
                ${trigger.getAttribute("data-say")} 
            </p>
            <div class="btn_grp">
                <div class="grp_content">
                    <button data-second class="btn modal-second-btn ${s}">${
    buttons[0]
  }</button>
                    <button data-action class="btn modal-${color}-btn">${
    buttons[1]
  }</button>
                </div>
            </div>
        </div>
    </div>
    `;
}
