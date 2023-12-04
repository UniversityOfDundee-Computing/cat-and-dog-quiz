const apiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';

function getCatBreeds(){
    return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        var breeds = data.map(element => ({id: element.id, name: element.name}));
        return breeds;
    })
}

function getCat(breeds){

    var randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        displayQuestion(data[0], randomBreed);
    })
    .catch(err =>{
        console.log(err);
    })
}

function displayQuestion(data, breed){

    var questionImg = document.getElementById('question-img');
    questionImg.src = data.url;
    
    var questionText = document.getElementById('question-text');
    questionText.innerHTML = 'What is the Breed';
    
    // displayAnswer(breed)
}

function displayAnswer(answer){

    answerAmount = 4;
    var answersContainer = document.getElementById('question-answers');

    var answers = [answer];

    while(answers.length < answerAmount){


    }



}

window.onload = function(){

    getCatBreeds()
    .then(catBreeds => {
        getCat(catBreeds);
    });

}