/**
 * @Author:             Jop Molenaar
 * @Date created:       10-02-2024
 * @Date updated:       10-02-2024
 * @Description:        Get the datasets of the paths to know which country you are clicking, 
 *                      get the data of that country, and open the side menu with all the data inside.
 */

const svgCountries = document.querySelectorAll("main svg path");
svgCountries.forEach((country) => {
    country.addEventListener("click", async () => {
        if(country.dataset.country){
            console.log(await getCountryData(`${country.dataset.country}`));
            // openSideMenuWithData(await getCountryData(`${country.dataset.country}`))
        }
    });
});


// const openSideMenuWithData = (data) => {
//     console.log(data);
//     document.querySelector(".popup").classList.toggle("open")
// }

// const closeSideMenuButton = document.querySelector(".popup button")
// closeSideMenuButton.addEventListener("click", ()=>{
//     document.querySelector(".popup").classList.toggel("open")
// })

const popup = document.querySelector(".popup");
const showPopup = document.querySelector("main img");
const closePopup = document.querySelector(".close-popup");

showPopup.addEventListener("click", togglePopup);
closePopup.addEventListener("click", togglePopup);

function togglePopup() { 
    let popup = document.querySelector(".popup");
    popup.classList.toggle("open-popup");
}

