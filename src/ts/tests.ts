import toast from "./components/toast"

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("toast-trigger")
    let num = 1

    button?.addEventListener("click", () => {
        const toaster = new toast("toast-container", "bottom", "right")
        toaster.spawn("error", `This is a toast no ${num++}!`, "Hello cro")
    })
})
