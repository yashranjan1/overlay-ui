class AlertDialogAction extends HTMLElement {
    private _styles = `rounded-md px-3 py-1.5 bg-black text-white flex items-center`
    constructor() {
        super()
        this.className = this._styles

    }
    connectedCallback() {
    }
}


customElements.define("alert-dialog-action", AlertDialogAction)
