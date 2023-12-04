const apiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';

const breed = {
    id: "",
    name: ""
}


function getCatBreeds(){
    return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        var breeds = data.map(element => ({id: element.id, name: element.name}));
        return breeds;
    })
}

function getQuestion(){

    fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {

        data.forEach(element => {
            console.log(element);
        });
    })
}

function getCat(breeds){

    var randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    })
}

window.onload = function(){

    var catBreeds = getCatBreeds();

    getCatBreeds()
    .then(catBreeds => {
        console.log(catBreeds)
        getCat(catBreeds);
    });

}