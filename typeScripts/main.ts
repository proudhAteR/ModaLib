const triggerButton = document.querySelector("button[trigger-attribute]");
const modals: HTMLElement[] = Array.from(
  document.querySelectorAll(".modal-container")
);
let triggeredElement: HTMLElement;

triggerButton.addEventListener("click", searchModal);

function searchModal() {
  modals.forEach((modal) => {
    if (modal.classList.contains(`:${triggerButton.id}`)) {
      toggleDisplay(modal);
      triggeredElement = modal;

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
    modal.classList.remove("fade");
    modal.classList.remove("hide");
  }
  modal.classList.add("show");
}

function hide(modal: HTMLElement) {
  modal.classList.add("fade");
  setTimeout(() => {
    modal.classList.remove("show");
    modal.classList.add("hide");
  }, 1500);
}

function isHidden(modal: HTMLElement) {
  return modal.classList.contains("hide");
}

function isShown(modal: HTMLElement) {
  return modal.classList.contains("show");
}
