const catApiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';
const dogApiKey = 'live_i7mLqdlkY1JrPjPa2AgThy3OXU8jmZQLYMW74Pu2I4Fvl126MqbbLtfxs8gQeJSL';

var catBreeds;
var dogBreeds;

var catPoints = 0;
var dogPoints = 0;

var questions = []


function generateQuestions(num){
    
    for (let i = 0; i < num; i++) {

        let newQuestion;

        // Distribute dog and cat questions evenly
        if (i % 2 == 0){

            var randomBreed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
            var possibleAnswers = [randomBreed.name, 'Answer 1', 'Answer 2', 'Answer 3'];

            newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, 'cat');

        }else{

            var randomBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
            var possibleAnswers = [randomBreed.name, 'Answer 1', 'Answer 2', 'Answer 3'];

            newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, 'dog');
        }

        questions.push(newQuestion);
    }
}


function getBreeds(animal){
    return fetch(`https://api.the${animal}api.com/v1/breeds`)
    .then(response => response.json())
    .then(data => {
        return data.map(element => ({id: element.id, name: element.name}));
    })
}

function getAnimal(breed, type){

    var api = type == 'dog' ? dogApiKey : catApiKey;

    return fetch(`https://api.the${type}api.com/v1/images/search?breed_ids=${breed}&api_key=${api}`)
    .then(response => response.json())
    .then(data => {
        return(data)
    })
    .catch(err => {
        console.log(err);
    })
}

function nextQuestion(){

    var question = questions.pop();
    var animalID;

    if (question.animalType === 'dog') 
        animalID = findIdByName(dogBreeds, question.answer)
    else 
        animalID = findIdByName(catBreeds, question.answer);

    getAnimal(animalID, question.animalType)
    .then(data => {
        question.displayQuestion(data[0].url);
    })

}


/**
 * Returns a html element which contains the answer within.
 * 
 * @param {string} answer 
 * @returns div element containing the answer
 */
function createAnswerElement(answer){

    const div = document.createElement('div');
    div.className = 'card border-primary mb-3 col-lg-4 col-sm-12';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'card-body';

    const h4 = document.createElement('h4');
    h4.className = 'card-title text-center mb-0';
    h4.textContent = answer;

    innerDiv.appendChild(h4);
    div.appendChild(innerDiv);

    return div;
}

async function checkAnswer(answer, question){

    // Check if the answer is correct
    if(answer === question.answer.name){
        question.animal === 'dog' ? dogPoints++ : catPoints++;
    }else{
        console.log('Wrong Answer');
    }

    // Delay
    await delay(1000);

    // Determine next action
    if (questions.length > 0){
        nextQuestion();
    }else{
        gameOver();
    }
}

function gameOver(){
    var result = determinePersonType(catPoints, dogPoints);
    displayGameOver(result);
}

function determinePersonType(catPoints, dogPoints){

    if (catPoints == 0 && dogPoints == 0)
        return 'Sad Person'
    else if (catPoints == dogPoints)
        return 'Cat-Dog Person';
    else if(catPoints > dogPoints)
        return 'Cat Person';
    else if(dogPoints > catPoints)
        return 'Dog Person';
    else
        return '???????';
}

function displayGameOver(result){

    // Remove any popups
    document.getElementById('pop-up').innerHTML = "";

    // Create card container
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "text-white", "bg-success", "mb-3");

    // Create the card header
    var cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "text-center");
    cardHeader.textContent = "Game Over";

    // Create the card body element
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center");

    // Create the paragraph 
    var par = document.createElement("p");
    par.textContent = "You are a .....";

    var cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result;

    // Create card body
    cardBody.appendChild(par);
    cardBody.appendChild(cardTitle);

    // Create card
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);

    document.getElementById('pop-up').appendChild(cardDiv)

}

function startQuiz(){

    getBreeds('cat')
        .then(data => {
            catBreeds = data;
            return getBreeds('dog');
        })
        .then(data => {
            dogBreeds = data;
        })
        .then(() => {
            generateQuestions(4);
        })
        .then(() => {
            nextQuestion();
        })
        .catch(err =>{
            console.log(err);
        })
}

window.onload = function(){

    startQuiz();
}