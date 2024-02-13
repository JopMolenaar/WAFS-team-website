/**
 * @Author:             Jop Molenaar
 * @Date created:       13-02-2024
 * @Date updated:       13-02-2024
 * @Description:        add colors to the countries based on the active names we get. 
 */

const defs = document.querySelector("main svg");
const paths = document.querySelectorAll(`path`);

const addColorToCountries = (names) => {
    paths.forEach((path) => {
        path.setAttribute("fill", `var(--standard-path-color)`);
    });
    allData.forEach((data) => {
        if (names.length > 0) {
            names.forEach((name) => {
                const firstName = data.firstName.toLowerCase();
                if (name === firstName) {
                    console.log(names);
                    // console.log(name);
                    // console.log(name, data.bucketList, data.visitedCountries);
                    const giveGradients = (list, kindOfColor) => {
                        list.forEach((country) => {
                            const paths = document.querySelectorAll(`[data-country="${country.country}"]`);
                            paths.forEach((path) => {
                                if (path.getAttribute("fill") != "var(--standard-path-color)" && !path.getAttribute("fill").includes("url")) { // if its not the default color and not a gradient => makes it here a gradient 
                                    makeLinearGradient(defs, path, name, kindOfColor, country); // make the linear gradient 
                                    path.setAttribute("fill", `url(#${country.country})`); // fill the path with the gradient
                                } else if (path.getAttribute("fill") === "var(--standard-path-color)"){ // if the path is still on the default color.
                                    path.setAttribute("fill", `var(--${name}-${kindOfColor}-color)`);
                                } else { // if its already a gradient
                                    const fillAttribute = path.getAttribute("fill");   
                                    const countryName = fillAttribute.split("#")[1].replace(")", "");
                                    let stripeColors = [];
                                    const linearGradient = document.querySelector(`linearGradient#${countryName}`);
                                    const allStops = linearGradient.querySelectorAll("stop");
                                    allStops.forEach((stop)=>{
                                        // push all existing colors of the gradient in the var stripeColors
                                        if(!stripeColors.includes(stop.getAttribute("stop-color"))){
                                            stripeColors.push(stop.getAttribute("stop-color"));
                                        }
                                    })

                                    // !!! this doesnt work !!!
                                    stripeColors.push(`var(--${name}-${kindOfColor}-color)`); // push the color from the last clicked person
                            
                                    linearGradient.innerHTML = ""; // empty the gradient
                                    multipleColorGradients(linearGradient, stripeColors); // make the gradient again
                                }
                            });
                        });
                    }
                    giveGradients(data.visitedCountries, "visited"); // fire all visited countries of the person in the active names array 
                    giveGradients(data.bucketList, "bucketlist"); // fire all bucketlist countries of the person in the active names array
                }
            });
        }
    });
};

// Create the linear gradient html element
const makeLinearGradient = (defs, path, name, kindOfColor, country) => {
    // Create SVG elements
    const linearGradient = document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg","stop");
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg","stop");

    // Set attributes for the linear gradient
    linearGradient.setAttribute("id",`${country.country}`);
    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("x2", "100%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("y2", "0%");

    // Define stripe colors and offsets
    const stripeColors = [`${path.getAttribute("fill")}`,`var(--${name}-${kindOfColor}-color)`];
    const stripeOffsets = [
        "0%",
        "20%",
        "40%",       
        "60%",    
        "80%",
        "100%",
    ];

    multipleColorGradients(linearGradient, stripeColors, stripeOffsets);
    defs.appendChild(linearGradient);
}

// add the gradient to the linearGradient html element
const multipleColorGradients = (linearGradient, stripeColors) => {
    // Define stripe colors and offsets
    const stripeOffsets = [
        "0%",
        "20%",
        "40%",       
        "60%",    
        "80%",
        "100%",
    ];
    // Create and append stops for each stripe
    stripeOffsets.forEach((offset, index) => {
        const stop = document.createElementNS("http://www.w3.org/2000/svg","stop");
        stop.setAttribute("offset", offset);
        stop.setAttribute("stop-color",stripeColors[index % stripeColors.length]); // Alternate colors
        linearGradient.appendChild(stop);
    });
}