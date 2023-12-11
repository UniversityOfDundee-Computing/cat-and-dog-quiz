const catApiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';
const dogApiKey = 'live_i7mLqdlkY1JrPjPa2AgThy3OXU8jmZQLYMW74Pu2I4Fvl126MqbbLtfxs8gQeJSL';

var catBreeds;
var dogBreeds;

var currentQuiz;

function displayAvailableQuizzes() {
    document.getElementById('quizzes').classList.remove('hidden');

    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');

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


function startQuiz(quiz) {

    document.getElementById('quizzes').classList.add('hidden');

    if (currentQuiz != null) {
        document.removeEventListener('answerCheckResult', (data) => {
            currentQuiz.handleAnswerResult(data.detail.points);
        });
    }

    if (quiz === 'cat' || quiz === 'dog') {
        startSingleAnimalBreedsQuiz(quiz);
    }
    else if (quiz === 'cat-dog') {
        startCatDogQuiz();
    }

}

function startSingleAnimalBreedsQuiz(animal) {

    getBreeds(animal)
        .then(data => {

            const quizTitle = capitalizeFirstLetter(animal) + ' Quiz';
            const theme = animal == 'cat' ? 'theme-purple' : 'theme-blue'; 
            currentQuiz = new BreedsQuiz(quizTitle, theme, data, animal);

            currentQuiz.createQuestions(10);
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

function startCatDogQuiz() {
    var catBreeds;

    getBreeds('cat')
        .then(data => {
            catBreeds = data;
            return getBreeds('dog');
        })
        .then(data => {

            dogBreeds = data;
            currentQuiz = new MultipleAnimalsBreedsQuiz('Cat Dog Quiz', 'theme-pink', catBreeds, dogBreeds);
            currentQuiz.createQuestions(10);

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

window.onload = function () {


    displayAvailableQuizzes();

    var startQuizBtns = document.getElementsByClassName('start-quiz-btn');

    startQuizBtns = Array.from(startQuizBtns);

    startQuizBtns.forEach(button => {

        button.addEventListener('click', (event) => {
            startQuiz(event.target.value);
        });
    });

    document.getElementById('return-btn').addEventListener('click', displayAvailableQuizzes);

    //displayFact('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et ut quod minima optio alias ea iusto nihil eius. Impedit sunt labore libero nobis harum ipsa aspernatur cupiditate architecto, deleniti ad.', 'theme-pink', null)

    // var test = document.createElement('p');
    // test.textContent = 'HELLO';

    // displayGameOver(test, 'GOd of ROdents');

    // updateFact('TESTING', null);

}