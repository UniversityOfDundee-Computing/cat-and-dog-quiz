function getCatBreeds(){

    var breeds = []

    fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {

        data.forEach(element => {
            breeds.push(element.name)
        });
    })

    return breeds
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

window.onload = function(){

    var carBreeds = getCatBreeds();
}