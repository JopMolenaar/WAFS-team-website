const addColorToCountries = (names) => {
    const paths = document.querySelectorAll(`path`);
    console.log(paths);
    paths.forEach((path) => {
        path.setAttribute("fill", `var(--standard-path-color)`);
    });
    allData.forEach((data) => {
        if (names.length > 0) {
            names.forEach((name) => {
                const firstName = data.firstName.toLowerCase();
                if (name === firstName) {
                    console.log(name, data.bucketList, data.visitedCountries);
                    const giveGradients = (list, kindOfColor) => {
                        list.forEach((country) => {
                            const paths = document.querySelectorAll(`[data-country="${country.country}"]`);
                            paths.forEach((path) => {
                                if (path.getAttribute("fill") != "var(--standard-path-color)") {
                                    // Create SVG elements
                                    const defs = document.querySelector("main svg");
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
                                    // Create and append stops for each stripe
                                    stripeOffsets.forEach((offset, index) => {
                                        const stop = document.createElementNS("http://www.w3.org/2000/svg","stop");
                                        stop.setAttribute("offset", offset);
                                        stop.setAttribute("stop-color",stripeColors[index % stripeColors.length]); // Alternate colors
                                        linearGradient.appendChild(stop);
                                    });
                                    defs.appendChild(linearGradient);
                                    path.setAttribute("fill", `url(#${country.country})`);
                                } else {
                                    path.setAttribute("fill", `var(--${name}-${kindOfColor}-color)`);
                                }
                            });
                        });
                    }
                    giveGradients(data.visitedCountries, "visited");
                    giveGradients(data.bucketList, "bucketlist");
                }
            });
        } else {
            console.log("no names");
        }
    });
};
