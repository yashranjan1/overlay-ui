// src/ts/components/toast.ts
class toast {
  _container;
  _max;
  _styles;
  _svg;
  _verticalPos;
  constructor(containerID, verticalPos, horizontalPos) {
    this._container = document.getElementById(containerID);
    this._max = 3;
    this._verticalPos = verticalPos;
    this._container?.classList.add(...this._setContainerStyle(verticalPos, horizontalPos));
    this._styles = `text-gray-50 ring-1 bg-black ring-gray-300/20 pl-3 
        pr-10 py-3 rounded-lg gap-3 flex justify-content-center shadow-lg 
        text-white w-[356px] h-[72px] transform absolute z-100
        ${verticalPos == "top" ? "animate-slide-down-enter" : "animate-slide-up-enter"}`;
    this._svg = {
      error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check text-green-400"><path d="M20 6 9 17l-5-5"/></svg>`,
      info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info text-blue-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
      default: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text-icon lucide-scroll-text text-gray-100"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>`
    };
  }
  spawn(type, heading, message) {
    const toast2 = document.createElement("div");
    toast2.className = this._styles;
    toast2.innerHTML = `
            <div class="flex items-center gap-4">
                ${this._svg[type]}
                <div class="flex flex-col gap-0.5">
                    <h1>${heading}</h1>
                    <h1 class="text-xs">${message}</h1>
                </div>
            </div>
        `;
    if (this._container == null) {
      console.error("No container found! Check for typos");
    }
    if (this._container?.children.length === this._max)
      this._container?.lastChild?.remove();
    this._container?.prepend(toast2);
    this._handleStackTransformations();
    toast2.addEventListener("animationend", () => {
      console.log(this._verticalPos);
      if (this._verticalPos == "top") {
        toast2.classList.remove("animate-slide-down-enter");
      } else if (this._verticalPos == "bottom")
        toast2.classList.remove("animate-slide-up-enter");
    });
    this._removeToastAfterTimeout(toast2);
  }
  _handleStackTransformations() {
    const children = Array.from(this._container.children);
    children.forEach((toast2, i) => {
      const offset = i * 10;
      const scale = 1 - i * 0.05;
      toast2.classList.add("transition-transform", "ease-in-out", "duration");
      if (this._verticalPos == "top")
        toast2.style.transform = `translateY(${offset}px) scale(${scale})`;
      else if (this._verticalPos == "bottom")
        toast2.style.transform = `translateY(-${offset}px) scale(${scale})`;
      toast2.style.zIndex = `${100 - i}`;
    });
  }
  _removeToastAfterTimeout(toast2) {
    setTimeout(() => {
      if (this._verticalPos == "top") {
        toast2.classList.add("animate-slide-up-exit");
      } else if (this._verticalPos == "bottom") {
        toast2.classList.add("animate-slide-down-exit");
      }
      toast2.addEventListener("animationend", () => {
        toast2.remove();
      });
    }, 3000);
  }
  _setContainerStyle(vert, hor) {
    const defaultStyles = "fixed z-100 bottom-4 w-[356px] h-[72px]";
    let vertStyle;
    let horStyle;
    if (vert == "top") {
      vertStyle = "top-4";
    } else if (vert == "bottom") {
      vertStyle = "bottom-4";
    }
    if (hor == "left") {
      horStyle = "left-4";
    } else if (hor == "right") {
      horStyle = "right-4";
    } else if (hor == "center") {
      horStyle = "left-1/2 transform -translate-x-1/2";
    }
    return `${defaultStyles} ${vertStyle} ${horStyle}`.split(" ");
  }
}
var toast_default = toast;

// src/ts/tests.ts
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toast-trigger");
  let num = 1;
  button?.addEventListener("click", () => {
    const toaster = new toast_default("toast-container", "top", "left");
    toaster.spawn("error", `This is a toast no ${num++}!`, "Hello cro");
  });
});
