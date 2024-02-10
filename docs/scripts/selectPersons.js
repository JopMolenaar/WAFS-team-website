const selectPerson = document.querySelectorAll(".select-person");
let legendPerson = document.querySelectorAll(".legend-person");

function animateSelectPerson() {
    selectPerson.forEach((item, index) => {
        item.addEventListener("click", () => {
            item.classList.toggle("toggle-select-person");
            legendPerson[index].classList.toggle("toggle-legend-person");
        });
    });
}

animateSelectPerson();


