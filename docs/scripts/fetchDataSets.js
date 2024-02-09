/**
 * @Author:             Jop Molenaar
 * @Date created:       08-02-2024
 * @Date updated:       08-02-2024
 * @Description:        Fetch all the api's from our group members and place it in one variable
 */

let allData = [];

const requestJop = fetch(
    "https://jopmolenaar.github.io/web-app-from-scratch-2324/reizen.json"
).then((response) => response.json());
const requestJoppe = fetch(
    "https://joppekoops.github.io/web-app-from-scratch-2324/data.json"
).then((response) => response.json());
const requestEefje = fetch(
    "https://eefjesnel.github.io/web-app-from-scratch-eefje/list.json"
).then((response) => response.json());

Promise.all([requestJop, requestJoppe, requestEefje])
    .then(([data1, data2, data3]) => {
        allData.push(data1, data2, data3);
    })
    .catch((error) => {
        console.error(error);
    });

// https://rapidapi.com/guides/fetch-data-multiple-apis-with-fetch




// Replace spaces with _ for wiki titles
const spaceToUnderscore = (string) => string.replace(/\s+/g, '_');

// Get country description from Wikipedia

const getCountryWikiExtractHTML = async (country) => {

    // Search Wikipedia for the country name and get the title of the first article
    let wikiSearchResult = await fetch('https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=' + country)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((response) => {
            return response[1][0];
        });

    let wikiTitle = spaceToUnderscore(wikiSearchResult);

    console.log(wikiTitle);

    //Get the actual wiki extract
    let wikiContent = await fetch('https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=5&format=json&titles=' + wikiTitle)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((response) => {
            //The api is made to get multiple article, so eventhough we are only getting one we need to search for the id and get it out of an array.
            let pages = response.query.pages;
            pageId = Object.keys(pages)[0];
            console.log(pages[pageId].extract);
            return pages[pageId].extract;
        });
};

// https://www.youtube.com/watch?v=RPz75gcHj18
// https://www.mediawiki.org/w/api.php?action=help