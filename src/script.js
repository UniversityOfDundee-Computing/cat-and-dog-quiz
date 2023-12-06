const apiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';
var catBreeds;
var currQuestion = 1;
var points = 0;


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
    currQuestion++;

    getCat(randomBreed.id)
    .then(data => {
        displayQuestion(data[0])
    })

}

function displayQuestion(data){

    var questionImg = document.getElementById('question-img');
    questionImg.src = data.url;
    
    var questionText = document.getElementById('question-text');
    questionText.innerHTML = 'What is the Breed?';

    displayAnswers(data.breeds[0].name)
}

function displayAnswers(correctAnswer){

    answerAmount = 4;
    var answers = [correctAnswer, 'Answer 1', 'Answer 2', 'Answer 3'];

    var answersContainer = document.getElementById('question-answers');
    answersContainer.innerHTML = "";

    answers.forEach(x =>{
        var answerEl = document.createElement('div');
        answerEl.innerHTML = x;

        answerEl.addEventListener('click', () => {
            evaluateAnswer(x, correctAnswer);
        });

        answersContainer.appendChild(answerEl);
    });
}

async function evaluateAnswer(answer, correctAnswer){

    // Check if the answer is correct
    if(answer === correctAnswer){
        console.log('Correct Answer');
        points++;
    }else{
        console.log('Wrong Answer');
    }

    // Delay
    await delay(3000);

    // Determine next action
    if (currQuestion <= 2){
        nextQuestion(catBreeds);
    }else{
        gameOver();
    }
}

function gameOver(){
    console.log('Quiz Over');
    console.log(`You got: ${points} Cat Points`);
}

window.onload = function(){

    getCatBreeds()
    .then(data => {
        catBreeds = data
        nextQuestion(catBreeds);
    });

}