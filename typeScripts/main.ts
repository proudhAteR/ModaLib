const triggerButton = document.querySelector("[data-trigger]");
const modals: HTMLElement[] = Array.from(
  document.querySelectorAll(".modal-container")
);
let triggeredElement: HTMLElement;
let animation: string;
const animationDuration: number = 1400;

triggerButton.addEventListener("click", searchModal);


function searchModal() {
  modals.forEach((modal) => {
    if (modal.classList.contains(`by:${triggerButton.id}`)) {
      triggeredElement = modal;
      animation = triggeredElement.dataset.animation as string;
      show(modal);

      triggeredElement.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target.closest("[closing-attribute]")) {
          toggleDisplay(triggeredElement);
        }
      });
    }
  });
}

function toggleDisplay(modal: HTMLElement) {
  if (isShown(modal)) {
    hide(modal);
  } else {
    show(modal);
  }
}
function show(modal: HTMLElement) {
  if (isHidden(modal)) {
    modal.classList.remove(animation);
    modal.classList.remove("hide");
  }
  modal.classList.add(`show_${animation}`);
}

function hide(modal: HTMLElement) {
  modal.classList.add(animation);
  setTimeout(() => {
    modal.classList.remove(`show_${animation}`);
    modal.classList.add("hide");
  }, animationDuration);
}

function isHidden(modal: HTMLElement) {
  return modal.classList.contains("hide");
}

function isShown(modal: HTMLElement) {
  return modal.classList.contains(`show_${animation}`);
}
