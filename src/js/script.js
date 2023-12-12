const catApiKey = 'live_Y2GmDHCqmM2Nz3Jxg7Yv1GeLQywtvYFHgjr9haAIhv0kyq9dRelEbF6VDXattX7m';
const dogApiKey = 'live_i7mLqdlkY1JrPjPa2AgThy3OXU8jmZQLYMW74Pu2I4Fvl126MqbbLtfxs8gQeJSL';

var catBreeds;
var dogBreeds;

var currentQuiz;

function displayAvailableQuizzes() {

    window.localStorage.removeItem('activeQuiz');

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
            currentQuiz.handleAnswerResult(data.detail);
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

            // Create quiz name
            const quizTitle = capitalizeFirstLetter(animal) + ' Quiz';

            // Determine theme based on animal type
            const theme = animal == 'cat' ? 'theme-purple' : 'theme-blue'; 

            // Create questions
            const questions = QuestionFactory.createMultipleChoiceBreedQuestions(data, 2, animal);

            currentQuiz = new BreedsQuiz(quizTitle, theme, questions, animal);

            currentQuiz.start();

        })
        .then(() => {

            document.addEventListener('answerCheckResult', (data) => {
                console.log('helo')
                currentQuiz.handleAnswerResult(data.detail);
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

            // Create quiz name
            const quizTitle = 'Cat-Dog Quiz';

            // Determine theme based on animal type
            const theme = 'theme-pink'; 

            // Create questions
            const questions = QuestionFactory.createCatDogMultipleChoiceBreedQuestions(catBreeds, data, 2);

            currentQuiz = new CatDogQuiz(quizTitle, theme, questions);

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

    hidePopUp();
    currentQuiz = loadQuiz();

   if(currentQuiz){

        console.log(currentQuiz);
        currentQuiz.start();

        document.addEventListener('answerCheckResult', (data) => {
            currentQuiz.handleAnswerResult(data.detail.points);
        });

   }else{
        displayAvailableQuizzes();
   }


    var startQuizBtns = document.getElementsByClassName('start-quiz-btn');

    startQuizBtns = Array.from(startQuizBtns);

    startQuizBtns.forEach(button => {

        button.addEventListener('click', (event) => {
            startQuiz(event.target.value);
        });
    });

    document.getElementById('return-btn').addEventListener('click', displayAvailableQuizzes);

}