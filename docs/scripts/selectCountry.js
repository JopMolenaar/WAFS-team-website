/**
 * @Author:             Jop Molenaar
 * @Date created:       10-02-2024
 * @Date updated:       10-02-2024
 * @Description:        Get the datasets of the paths to know which country you are clicking,
 *                      get the data of that country, and open the side menu with all the data inside.
 */

const svgCountries = document.querySelectorAll("main svg path"); // All the countries in the worldmap
const popup = document.querySelector(".popup"); // The popup
const closePopupButton = document.querySelector(".close-popup"); // The close button inside the popup

/**
 * For every path there is in the svg, it adds an addEventListener to it. 
 * Once a path is clicked, it gets the dataset from the path that says which country it is.
 * After that it is given to the openSideMenuWithData() function that waits for the returned data of the 
 * getCountryData() function.
 */
svgCountries.forEach((country) => {
    country.addEventListener("click", async () => {
        if (country.dataset.country) { // If the dataset exists
            openSideMenuWithData(await getCountryData(`${country.dataset.country}`));
        }
    });
});

/**
 * This function fires when there is data loaded from the api. 
 * It opens the popup and places the data inside the elements
 * @param {Object} data - The data from the api
 */
const openSideMenuWithData = (data) => {
    popup.classList.add("open-popup"); // Open the popup
    // Add the content of the api to the elements in the popup
    document.getElementById("country").textContent = data.country;
    document.getElementById("countryFlag").src = data.flagImageUrl;
    document.getElementById("countryFlag").alt = data.flagImageAlt;
    document.getElementById("description").innerHTML = data.description;
};

/**
 * This function listens for a click on an element and looks if the element is the one we are looking for.
 * After that it should close the popup when there is clicked outside of the popup or on the close button.
 * @param {Element} event - An element that got clicked
 */
document.body.addEventListener("click", (event) => {
    const parent = event.target.parentElement; // Get the parent of the element that is clicked
    const secondParent = parent.parentElement; // Get the parent of the parent of the element that is clicked
    if (event.target != popup && parent != popup && secondParent != popup || event.target === closePopupButton) {
        popup.classList.remove("open-popup");
    }
});
