/**
 * @Author:             Jop Molenaar
 * @Date created:       13-02-2024
 * @Date updated:       13-02-2024
 * @Description:        add colors to the countries based on the active names we get. 
 */

const defs = document.querySelector("main svg defs");
const paths = document.querySelectorAll(`path`);

// add the gradient to the linearGradient html element
const multipleColorGradients = (linearGradient, stripeColors) => {
    console.log(stripeColors, linearGradient.getAttribute("id"));
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
        linearGradient.append(stop);
    });
    console.log(linearGradient, defs);
    defs.append(linearGradient);
}

const makeGradients = (countryWithNames) => {
    countryWithNames.forEach((country)=>{

        const linearGradient = document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg","stop");
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg","stop");

        // Set attributes for the linear gradient
        linearGradient.setAttribute("id",`${country.country}`);
        linearGradient.setAttribute("x1", "0%");
        linearGradient.setAttribute("x2", "100%");
        linearGradient.setAttribute("y1", "0%");
        linearGradient.setAttribute("y2", "0%");
        console.log(country.country);
        const path = document.querySelector(`path[data-country="${country.country}"]`);
        console.log(path);
        path.setAttribute("fill", `url(#${country.country})`);

        let stripeColors = [];
        country.persons.forEach((person)=>{
            let name;
            let kindOfColor;
            if(person.includes("bucketlist")){
                name = person.replace('bucketlist','').toLowerCase();
                kindOfColor = "bucketlist";
                // console.log("bucketlist", person, name);
            } else {
                name = person.replace('visited','').toLowerCase();
                kindOfColor = "visited";
                // console.log("visited", person, name);
            }
            stripeColors.push(`var(--${name}-${kindOfColor}-color)`)
        })
        console.log(country.country, stripeColors);
        // console.log(stripeColors);
        //  stripeColors = [`var(--${name}-${kindOfColor}-color)`,`var(--${name}-${kindOfColor}-color)`];
        const stripeOffsets = [
            "0%",
            "20%",
            "40%",       
            "60%",    
            "80%",
            "100%",
        ];

        multipleColorGradients(linearGradient, stripeColors, stripeOffsets);
    })
}


const addColorToCountries = (names) => {
    let allCountries = []
    defs.innerHTML = "";
    paths.forEach((path) => {
        path.setAttribute("fill", `var(--standard-path-color)`);
        if(path.dataset.country){
            allCountries.push(path.dataset.country);
        }
    });
    console.log(allCountries);
    let countryWithNames = []
    console.log(names);
    if (names.length > 0) {
        names.forEach((name) => {
            allData.forEach((data) => {
                const firstName = data.firstName.toLowerCase();
                if (name === firstName) {
                    data.visitedCountries.forEach((visitedCountry) => {
                        if(allCountries.includes(visitedCountry.country)){
                            const existingCountry = countryWithNames.find(country => country.country === visitedCountry.country);
                            if (existingCountry) {
                                if (!existingCountry.persons.includes(`${data.firstName}visited`)) {
                                    existingCountry.persons.push(`${data.firstName}visited`);
                                }
                            } else {
                                countryWithNames.push({ country: visitedCountry.country, persons: [`${data.firstName}visited`] });
                            }
                        } else {
                            console.log("missing country: ", visitedCountry.country);
                        }
                    });
                    data.bucketList.forEach((bucketListCountry) => {
                        if(allCountries.includes(bucketListCountry.country)){
                            const existingCountry = countryWithNames.find(country => country.country === bucketListCountry.country);
                            if (existingCountry) {
                                if (!existingCountry.persons.includes(`${data.firstName}bucketlist`)) {
                                    existingCountry.persons.push(`${data.firstName}bucketlist`);
                                }
                            } else {
                                countryWithNames.push({ country: bucketListCountry.country, persons: [`${data.firstName}bucketlist`] });
                            }
                        } else {
                            console.log("missing country: ", bucketListCountry.country);
                        }
                    });
                }
            });
        });
        makeGradients(countryWithNames);
    }
};