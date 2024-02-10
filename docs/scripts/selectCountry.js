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
            openSideMenuWithData(await getCountryData(`${country.dataset.country}`))
        }
    });
});

const popup = document.querySelector(".popup"); // The popup
const closePopupButton = document.querySelector(".close-popup"); // The close button inside the popup

const openSideMenuWithData = (data) => {
    popup.classList.add("open-popup"); // Open the popup

    console.log(data);
    // TODO empty the article and place the data inside the article
}

// function to close the popup
closePopupButton.addEventListener("click", ()=>{
    popup.classList.remove("open-popup")
})


