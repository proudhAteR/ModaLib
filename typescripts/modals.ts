import { triggerButton } from "./main.js";

const animationDuration = 400;
let triggeredElement: HTMLElement;
let animation: string;

export function searchModal() {
  const modal = Array.from(document.querySelectorAll(".modal-container")).find(
    (modal) => modal.classList.contains(`by:${triggerButton.id}`)
  );

  if (modal) {
    triggeredElement = modal as HTMLElement;
    animation = triggeredElement.dataset.animation as string;
  }
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
  let buttons: string[] = [];
  let s = "hide";
  if (trigger.getAttribute("data-trigger").includes("confirm")) {
    let options: string = trigger.dataset.options
    s = ''
    if(options){
        buttons = options.split(",");
    }else{
        buttons = ['Back','Confirm']
    }
    
  }else{
    buttons = ['','Close']
  }

  return `
    <div data-animation ="${
      trigger.dataset.animation
    }" class="modal-container by:${trigger.id} show_${
    trigger.dataset.animation
  } said">
        <div class="modal-content">
            <h1>${trigger.getAttribute("data-title") as string}</h1>
            <p class="text">
                ${trigger.getAttribute("data-say")} 
            </p>
            <div class="btn_grp">
                <div class="grp_content">
                    <button closing-attribute class="btn modal-second-btn ${s}">${
                      buttons[0]
                    }</button>
                    <button closing-attribute class="btn modal-${
                      trigger.getAttribute("data-trigger") as string
                    }-btn">${buttons[1]}</button>
                </div>
            </div>
        </div>
    </div>
    `;
}
