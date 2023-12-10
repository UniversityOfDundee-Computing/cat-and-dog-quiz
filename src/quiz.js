class Quiz {
    constructor() {
        this.questions = [];
    }

    createQuestions(amount){}

    start() {
        if (this.questions.length > 0){
            this.displayQuiz();
            this.nextQuestion();
        }
        else
            console.log('No Questions Present');
    }

    displayQuiz(){
        document.getElementById('quiz-header').textContent = 'QUIZ X';
        document.getElementById('quiz').classList.toggle('hidden');
    }

    nextQuestion(){}

    checkAnswer(){}

    quizOver(){
        console.log('game over');
    }

    determineOutcome(){}

}

class BreedsQuiz extends Quiz {
    constructor(breeds, animalType) {
        super();
        this.animalType = animalType;
        this.breeds = breeds;
        this.questions = [];
        this.points = 0;
    }

    createQuestions(amount) {

        for (let i = 0; i < amount; i++) {

            var randomBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
            var possibleAnswers = getMultipleUniqueBreeds(this.breeds, 4, randomBreed.name);

            let newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, this.animalType);
            this.questions.push(newQuestion);
        }

        this.questionAmount = this.questions.length;
    }

    nextQuestion() {

        // Remove any popups
        document.getElementById('pop-up').innerHTML = '';

        console.log(this.questions)

        // Determine next action
        if (this.questions.length > 0) {

            const question = this.questions.pop();
            const animalID = findIdByName(this.breeds, question.answer);

            getAnimal(animalID, this.animalType)
                .then(data => {
                    question.displayQuestion(data[0].url);
                })

        } else {
            this.quizOver();
        }

    }

    async handleAnswerResult(points) {

        this.points += points;
    
        // Delay
        await delay(1000);
    
        // Show fact
        await getFact(this.animalType)
        .then(fact => displayFact(fact, () => {
            this.nextQuestion();
        }))
        .catch(err => this.nextQuestion());
    }

    quizOver(){

        // Create the paragraph 
        var par = document.createElement('p');
        par.textContent = 'You are a .....';

        var cardTitle = document.createElement('h4');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = this.determineOutcome();

        displayGameOver(cardTitle);

    }

    determineOutcome(){

        const points = this.points;
        const maxScore = this.questionAmount;

        const animalType = capitalizeFirstLetter(this.animalType) + 's';

        if (points === maxScore)
            return 'King of ' + animalType;
        else if (points === 0)
            return 'Sad Person';
        // else if (points > maxScore/2)
        //     return 'Duke of ' + animalType;
        else if (points >= maxScore/2)
            return 'Knight of ' + animalType;
        else if (points < maxScore/2)
             return 'Squire of ' + animalType;
        else
            return 'Sad Person';

    }

}