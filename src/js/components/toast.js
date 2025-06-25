// src/ts/components/toast.ts
class toast {
  _container;
  _styles;
  _verticalPos;
  _height = 72;
  _maxToast = 3;
  _gap = 12;
  _svg = {
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check text-green-400"><path d="M20 6 9 17l-5-5"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info text-blue-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    default: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text-icon lucide-scroll-text text-gray-100"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>`
  };
  constructor(containerID, verticalPos, horizontalPos) {
    this._container = document.getElementById(containerID);
    this._container?.classList.add(...this._setContainerStyle(verticalPos, horizontalPos));
    this._container?.addEventListener("mouseenter", () => this._removeStackTransformations());
    this._container?.addEventListener("mouseleave", () => this._applyStackTransformations());
    this._verticalPos = verticalPos;
    this._styles = `text-black dark:text-white ring-1 bg-white dark:bg-black ring-gray-300/20 pl-3 
        pr-10 py-3 rounded-lg flex justify-content-center drop-shadow-lg w-[356px] h-[72px] transform 
        absolute z-100 ${verticalPos == "top" ? "animate-slide-down-enter" : "animate-slide-up-enter bottom-0"}`;
  }
  spawn(type, heading, message) {
    if (this._container == null) {
      console.error("No container found! Check for typos");
      return;
    }
    const newToast = this._createToast(type, heading, message);
    if (this._container?.children.length === this._maxToast)
      this._container?.lastChild?.remove();
    this._container?.prepend(newToast);
    this._applyStackTransformations();
    this._removeEnterAnimation(newToast);
    this._removeToastAfterTimeout(newToast);
  }
  _createToast(type, heading, message) {
    const newToast = document.createElement("div");
    newToast.className = this._styles;
    newToast.innerHTML = `
            <div class="flex items-center gap-4">
                ${this._svg[type]}
                <div class="flex flex-col gap-0.5">
                    <h1>${heading}</h1>
                    <h1 class="text-xs">${message}</h1>
                </div>
            </div>
        `;
    return newToast;
  }
  _applyStackTransformations() {
    const children = Array.from(this._container.children);
    this._container.style.height = `${this._height}px`;
    children.forEach((toast2, i) => {
      const offset = i * 10;
      const scale = 1 - i * 0.05;
      if (this._verticalPos == "top")
        toast2.style.transform = `translateY(${offset}px) scale(${scale})`;
      else if (this._verticalPos == "bottom")
        toast2.style.transform = `translateY(-${offset}px) scale(${scale})`;
      toast2.style.zIndex = `${100 - i}`;
    });
  }
  _removeStackTransformations() {
    const children = Array.from(this._container.children);
    const toastVertLen = this._height + this._gap;
    this._container.style.height = `${toastVertLen * children.length}px`;
    children.forEach((toast2, i) => {
      const offset = toastVertLen * i;
      if (this._verticalPos == "top")
        toast2.style.transform = `translateY(${offset}px) scale(1)`;
      else if (this._verticalPos == "bottom")
        toast2.style.transform = `translateY(-${offset}px) scale(1)`;
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
    }, 9000);
  }
  _removeEnterAnimation(toast2) {
    toast2.classList.add("transition-transform", "ease-in-out", "duration");
    toast2.addEventListener("animationend", () => {
      if (this._verticalPos == "top") {
        toast2.classList.remove("animate-slide-down-enter");
      } else if (this._verticalPos == "bottom")
        toast2.classList.remove("animate-slide-up-enter");
    });
  }
  _setContainerStyle(vert, hor) {
    const defaultStyles = "fixed z-100 bottom-4 w-[356px] flex flex-col overflow-visible";
    this._container.style.height = `${this._height}px`;
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
export {
  toast_default as default
};
