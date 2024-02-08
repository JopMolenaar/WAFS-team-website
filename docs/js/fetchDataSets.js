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

Promise.all([requestJop, requestJoppe])
    .then(([data1, data2]) => {
        allData.push(data1, data2);
    })
    .catch((error) => {
        console.error(error);
    });

// https://rapidapi.com/guides/fetch-data-multiple-apis-with-fetch
