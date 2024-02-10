/**
 * @Author:             Jop Molenaar
 * @Date created:       10-02-2024
 * @Date updated:       10-02-2024
 * @Description:        get the datasets of the paths to know which country you are clicking
 */

const svgCountries = document.querySelectorAll("main svg path");
svgCountries.forEach((country) => {
    country.addEventListener("click", () => {
        console.log(country.dataset.country);
    });
});
