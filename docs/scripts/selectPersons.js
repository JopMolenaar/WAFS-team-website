const selectPerson = document.querySelectorAll(".select-person")

selectPerson.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("toggle-select-person")
    })
})