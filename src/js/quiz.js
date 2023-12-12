class Quiz {
    constructor(name, theme, questions) {
        this.name = name;
        this.theme = theme;
        this.questions = questions;
    }

    start() {

        hidePopUp();
        document.body.className = `bg ${this.theme}`;

        addAnswerEventListener((event) => {
            this.handleAnswerResult(event.detail);
        });


        if (this.questions.length > 0) {
            this.displayQuiz();
            this.nextQuestion();
        }
        else{
            this.quizOver();
        }

    }

    displayQuiz() {
        hidePopUp();
        document.body.className = `bg ${this.theme}`;
        document.getElementById('quiz-header').textContent = this.name;
        document.getElementById('quiz').classList.remove('hidden');

    }

    nextQuestion() { }

    checkAnswer() { }

    quizOver() {
        console.log('game over');
    }

    determineOutcome() { }

}

class BreedsQuiz extends Quiz {
    constructor(name, theme, questions, animalType, points=0, questionAmount=null) {
        super(name, theme, questions);
        this.animalType = animalType;
        this.questions = questions;
        this.points = points;
        this.questionAmount = questionAmount ? questionAmount : questions.length;
    }

    nextQuestion() {

        hidePopUp();

        // Determine next action
        if (this.questions.length > 0) {

            // Display next question
            const question = this.questions.pop();
            this.displayQuestion(question);

        } else {
            this.quizOver();
        }

    }

    displayQuestion(question) {

        getAnimalDetails(question.animalID, question.animalType)
            .then(data => {
                question.displayQuestion(data[0].url);
            })
    }

    async handleAnswerResult(result) {

        this.points += parseInt(result.points);

        // Save Quiz
        saveQuiz(this);

        console.log(result.points)

        // Delay
        await delay(1000);

        displayFact(result.animalType, () => {
            this.nextQuestion();
        });
    }

    quizOver() {

        removeAnswerEventListener();

        // Create the paragraph 
        var scores = document.createElement('p');

        const animalType = capitalizeFirstLetter(this.animalType) + 's';

        scores.textContent = `${animalType}: ${this.points}`;
        updateGameOver(scores, this.determineOutcome());
    }

    determineOutcome() {

        const points = this.points;
        const maxScore = this.questionAmount;

        console.log(this.points);

        const animalType = capitalizeFirstLetter(this.animalType) + 's';


        if (points === maxScore)
            return 'King of ' + animalType;
        else if (points === 0)
            return 'Sad Person';
        else if (points >= maxScore / 2)
            return 'Knight of ' + animalType;
        else if (points < maxScore / 2)
            return 'Squire of ' + animalType;
        else
            return 'Sad Person';

    }

}

class CatDogQuiz extends BreedsQuiz {
    constructor(name, theme, questions, catPoints=0, dogPoints=0) {
        super(name, theme, questions, null);
        this.catPoints = catPoints;
        this.dogPoints = dogPoints;
    }

    async handleAnswerResult(result) {

        if (result.animalType == 'dog')
            this.dogPoints += result.points;
        else if (result.animalType == 'cat')
            this.catPoints += result.points;

        saveQuiz(this);

        // Delay
        await delay(1000);

        displayFact(result.animalType, () => {
            this.nextQuestion();
        });


    }

    quizOver() {

        // Create the paragraph 

        var scoresContainer = document.createElement('div');

        var catScores = document.createElement('p');
        catScores.textContent = `${'Cat'}: ${this.catPoints}`;

        var dogScores = document.createElement('p');
        dogScores.textContent = `${'Dog'}: ${this.dogPoints}`;

        scoresContainer.appendChild(catScores);
        scoresContainer.appendChild(dogScores);

        updateGameOver(scoresContainer, this.determineOutcome());
    }

    determineOutcome() {

        const catPoints = this.catPoints;
        const dogPoints = this.dogPoints;

        if (catPoints == 0 && dogPoints == 0)
            return 'Sad Person'
        else if (catPoints == dogPoints)
            return 'Cat-Dog Person';
        else if (catPoints > dogPoints)
            return 'Cat Person';
        else if (dogPoints > catPoints)
            return 'Dog Person';
        else
            return '???????';

    }

}