const catApiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';
const dogApiKey = 'live_i7mLqdlkY1JrPjPa2AgThy3OXU8jmZQLYMW74Pu2I4Fvl126MqbbLtfxs8gQeJSL';

var catBreeds;
var dogBreeds;

/**
 * Get breeds of an anima using an API
 * 
 * @param {string} animal - Name of the name to get breeds of
 * @returns 
 */
async function getBreeds(animal) {
    return fetch(`https://api.the${animal}api.com/v1/breeds`)
        .then(response => response.json())
        .then(data => {
            return data.map(element => ({ id: element.id, name: element.name }));
        })
}

/**
 * Fetch details of an animal (with a picture), based on breed
 * 
 * @param {string} breed - Breed on animal to get details of
 * @param {string} type - Type of animal to get details of
 * @returns 
 */
function getAnimalDetails(breed, type) {

    // Determine which api to call
    var api = type == 'dog' ? dogApiKey : catApiKey;

    return fetch(`https://api.the${type}api.com/v1/images/search?breed_ids=${breed}&api_key=${api}`)
        .then(response => response.json())
        .then(data => data)
}