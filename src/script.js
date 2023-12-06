const apiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';

function getCatBreeds(){
    return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        var breeds = data.map(element => ({id: element.id, name: element.name}));
        return breeds;
    })
}

function getCat(catBreed){
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catBreed}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        return(data)
    })
    .catch(err =>{
        console.log(err);
    })
}

function nextQuestion(breeds){

    // Get Cat
    var randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

    getCat(randomBreed.id)
    .then(data => {
        displayQuestion(data[0])
    })

    // Dispaly Question

    // Display Answers

}

function displayQuestion(data){

    var questionImg = document.getElementById('question-img');
    questionImg.src = data.url;
    
    var questionText = document.getElementById('question-text');
    questionText.innerHTML = 'What is the Breed';
    
    // displayAnswer(breed)
}

function displayAnswer(answer){

    answerAmount = 4;
    var answersContainer = document.getElementById('question-answers');

    var answers = [answer, 'Answer 1', 'Answer 2', 'Answer 3'];

    answers.forEach(x =>{
        var answerEl = document.createNodeIt
        answersContainer.append()
    });
}

window.onload = function(){

    getCatBreeds()
    .then(catBreeds => {
        nextQuestion(catBreeds);
    });

}