const catApiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';
const dogApiKey = 'live_i7mLqdlkY1JrPjPa2AgThy3OXU8jmZQLYMW74Pu2I4Fvl126MqbbLtfxs8gQeJSL';

var catBreeds;
var dogBreeds;

var currentQuiz;

function displayAvailableQuizzes(){
    document.getElementById('quizzes').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('pop-up').classList.add('hidden');
}

function getMultipleUniqueBreeds(animalBreeds, amount, includedBreed = null) {

    var uniqueBreeds = [];
    var breeds = animalBreeds;

    // Include breed if passed
    if (includedBreed != null)
        uniqueBreeds.push(includedBreed);

    // Get unique breeds
    while (uniqueBreeds.length < amount) {
        var ranIndex = Math.floor(Math.random() * breeds.length);

        const newBreed = breeds.splice(ranIndex, 1)[0];

        // Check if breed already exists in unique breeds
        if (!uniqueBreeds.includes(newBreed.name))
            uniqueBreeds.push(newBreed.name);
    }

    return shuffle(uniqueBreeds);
}


async function getBreeds(animal) {
    return fetch(`https://api.the${animal}api.com/v1/breeds`)
        .then(response => response.json())
        .then(data => {
            return data.map(element => ({ id: element.id, name: element.name }));
        })
}

function getAnimalDetails(breed, type) {

    var api = type == 'dog' ? dogApiKey : catApiKey;

    return fetch(`https://api.the${type}api.com/v1/images/search?breed_ids=${breed}&api_key=${api}`)
        .then(response => response.json())
        .then(data => data)
}


function displayGameOver(resultElement) {

    // Remove any popups
    document.getElementById('pop-up').innerHTML = '';

    // Create card container
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'text-white', 'bg-success', 'mb-3');

    // Create the card header
    var cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header', 'text-center');
    cardHeader.textContent = 'Game Over';

    // Create the card body element
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center');

    // Create button element
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary col-lg-4 col-sm-12';
    btn.innerHTML = 'Home';

    btn.addEventListener('click', displayAvailableQuizzes);

    // Create card body
    cardBody.appendChild(resultElement);
    cardBody.appendChild(btn);

    // Create card
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);

    document.getElementById('pop-up').appendChild(cardDiv)

}

function startQuiz(quiz) {

    console.log(quiz);

    if(currentQuiz != null){
        document.removeEventListener('answerCheckResult', (data) => {
            currentQuiz.handleAnswerResult(data.detail.points);
        });
    }

    if (quiz === 'cat' || quiz === 'dog'){

        getBreeds(quiz)
        .then(data => {

            currentQuiz = new BreedsQuiz(quiz + ' Quiz', data, quiz);
            currentQuiz.createQuestions(2);

            console.log(currentQuiz.questions)

            currentQuiz.start();
        })     
        .then(() => {

            document.addEventListener('answerCheckResult', (data) => {
                currentQuiz.handleAnswerResult(data.detail.points);
            });

        })   
        .catch(err => {
            console.log(err);
        })
    }
    else if (quiz === 'cat-dog'){


        var catBreeds;

        getBreeds('cat')
        .then(data => {
            catBreeds = data;
            return getBreeds('dog');
        })   
        .then(data => {

            dogBreeds = data;
            currentQuiz = new MultipleAnimalsBreedsQuiz('Cat Dog Quiz', catBreeds, dogBreeds);
            currentQuiz.createQuestions(4);

            console.log(currentQuiz.questions)

            currentQuiz.start();

        })  
        .then(() => {

            document.addEventListener('answerCheckResult', (data) => {
                currentQuiz.handleAnswerResult(data.detail);
            });

        })   
        .catch(err => {
            console.log(err);
        })

    }

}

window.onload = function () {

    var startQuizBtns = document.getElementsByClassName('start-quiz-btn');

    startQuizBtns = Array.from(startQuizBtns);

    startQuizBtns.forEach(button => {

        button.addEventListener('click', (event) => {
            startQuiz(event.target.value);
        });
    });

}