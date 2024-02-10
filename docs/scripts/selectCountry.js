const popup = document.querySelector(".popup");
const showPopup = document.querySelector("main img");
const closePopup = document.querySelector(".close-popup");

showPopup.addEventListener("click", togglePopup);
closePopup.addEventListener("click", togglePopup);

function togglePopup() { 
    let popup = document.querySelector(".popup");
    popup.classList.toggle("open-popup");
}




