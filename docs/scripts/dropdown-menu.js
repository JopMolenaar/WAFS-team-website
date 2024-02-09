const dropdownMenuButton = document.querySelector(".dropdown-menu-button")
const dropdownMenu = document.querySelector(".dropdown-menu")

dropdownMenuButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("animate-dropdown-menu")
})

