import toast from "./components/toast"

document.addEventListener("DOMContentLoaded", () => {
    const toastButton = document.getElementById("toast-trigger")
    const themeButton = document.getElementById("theme-trigger")
    let num = 1

    toastButton?.addEventListener("click", () => {
        const toaster = new toast("toast-container", "bottom", "right")
        toaster.spawn("error", `This is a toast no ${num++}!`, "Hello cro")
    })
    themeButton?.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark")
    })
})
