class AlertDialogAction extends HTMLElement {
    private _styles = `rounded-md px-4 py-[7px] bg-black dark:bg-white text-white dark:text-black flex
    items-center h-fit border border-gray-500/20 drop-shadow-sm select-none cursor-pointer`
    constructor() {
        super()
        this.className = `${this._styles} ${this.className}`
    }
}

class AlertDialogCancel extends HTMLElement {
    private _styles = `rounded-md px-4 py-[7px] bg-white dark:bg-black text-black dark:text-white
    flex items-center h-fit border border-gray-600/20 dark:border-gray-300/25 drop-shadow-sm 
    select-none cursor-pointer`
    constructor() {
        super()
        this.className = `${this._styles} ${this.className}`
    }
}

class AlertDialogFooter extends HTMLElement {
    private _style = `flex justify-end w-full gap-4 text-sm`
    constructor() {
        super()
        this.className = `${this._style} ${this.className}`
    }
}

class AlertDialogTitle extends HTMLElement {
    private _style = `text-lg font-semibold`
    constructor() {
        super()
        this.className = `${this._style} ${this.className}`
    }
}

class AlertDialogDescription extends HTMLElement {
    private _style = `text-sm font-normal text-black/55 dark:text-white/55`
    constructor() {
        super()
        this.className = `${this._style} ${this.className}`
    }
}

class AlertDialogHeader extends HTMLElement {
    private _style = `flex flex-col gap-3`
    constructor() {
        super()
        this.className = `${this._style} ${this.className}`
    }
}

class AlertDialogContent extends HTMLElement {
    private _style = `flex flex-col gap-6 w-lg bg-white dark:bg-black ring-1 
    ring-gray-200 dark:ring-gray-300/20 max-h-fit p-6 rounded-md drop-shadow-lg
    text-black dark:text-white transform duration`
    constructor() {
        super()
        this.className = `${this._style} ${this.className}`
    }
}

class AlertDialogTrigger extends HTMLElement {
    constructor() {
        super()
    }
}

class AlertDialog extends HTMLElement {
    private _trigger: HTMLElement | null = null;
    private _content: HTMLElement | null = null;
    private _cover: HTMLElement | null = null;
    private _state: boolean = false;

    constructor() {
        super()
        const triggerEl = this.querySelector("alert-dialog-trigger") as HTMLElement;
        const contentEl = this.querySelector("alert-dialog-content") as HTMLElement;

        if (triggerEl == null || contentEl == null || triggerEl.firstElementChild == null) {
            console.error("Structural error in alert dialog")
            return
        }

        const cancelEl = contentEl.querySelector("alert-dialog-cancel") as HTMLElement;

        if (cancelEl == null) {
            console.error("Structural error in alert dialog")
            return
        }

        this._trigger = triggerEl.firstElementChild as HTMLElement
        this._content = contentEl
    }

    connectedCallback() {
        this._trigger?.addEventListener("click", () => this._openDialog())
    }

    _openDialog() {
        const cover = document.createElement("div")
        this._cover = cover
        this._cover.className = `z-100 fixed h-screen w-screen bg-black/20 
        dark:bg-black/50 flex justify-center items-center`
        if (this._content) {
            document.body.prepend(this._cover)
            let content = this._content.cloneNode(true) as HTMLElement
            content.removeAttribute("hidden")

            content.classList.add("animate-opacity-enter")
            content.addEventListener("animationend", () => content.classList.remove("animate-opacity-enter"))

            cover.appendChild(content)
            this._state = true;

            const cancel = content.querySelector("alert-dialog-cancel")
            const action = content.querySelector("alert-dialog-action")

            cancel?.addEventListener("click", () => this._closeDialog())
            action?.addEventListener("click", () => this._closeDialog())
            document.documentElement.classList.add("overflow-y-hidden")
        }
    }

    _closeDialog() {
        if (this._state) {
            const content = this._cover?.firstElementChild
            content!.classList.add("animate-opacity-exit")
            this._cover!.classList.add("animate-opacity-exit")
            setTimeout(() => {
                this._cover?.remove()
                document.documentElement.classList.remove("overflow-y-hidden")
            }, 100)
        }
    }

}


customElements.define("alert-dialog-action", AlertDialogAction)
customElements.define("alert-dialog-cancel", AlertDialogCancel)
customElements.define("alert-dialog-footer", AlertDialogFooter)
customElements.define("alert-dialog-title", AlertDialogTitle)
customElements.define("alert-dialog-description", AlertDialogDescription)
customElements.define("alert-dialog-header", AlertDialogHeader)
customElements.define("alert-dialog-content", AlertDialogContent)
customElements.define("alert-dialog-trigger", AlertDialogTrigger)
customElements.define("alert-dialog", AlertDialog)
