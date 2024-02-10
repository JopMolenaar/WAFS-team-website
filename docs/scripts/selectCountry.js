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
        openSideMenuWithData(await getCountryData(`${country.dataset.country}`))
    });
});


const openSideMenuWithData = (data) => {
    console.log(data);
}