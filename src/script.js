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
        var answerEl = createAnswerElement(x)

        answerEl.addEventListener('click', () => {
            evaluateAnswer(x, correctAnswer);
        });

        answersContainer.appendChild(answerEl);
    });
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
    var result = 'Cat or Dog Person';
    console.log(`You got: ${points} Cat Points`);

    displayGameOver(result);

}

function displayGameOver(result){

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

window.onload = function(){

    // getCatBreeds()
    // .then(data => {
    //     catBreeds = data
    //     nextQuestion(catBreeds);
    // });

    gameOver();

}