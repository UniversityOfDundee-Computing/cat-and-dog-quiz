
class Quiz {
    /**
     * 
     * @param {string} name - Name of the quiz
     * @param {string} theme - Theme of the quiz
     * @param {Question[]} questions - Questions of the quiz
     */
    constructor(name, theme, questions) {
        this.name = name;
        this.theme = theme;
        this.questions = questions;
    }

    /**
     * Star the quiz
     */
    start() {

        // Clear all possibly visible elements
        hidePopUp();

        // Start listing to an answer being checked
        addAnswerEventListener((event) => {
            this.handleAnswerResult(event.detail);
        });

        // If there are still questions to answer
        if (this.questions.length > 0) {
            this.displayQuiz();
            this.nextQuestion();
        }
        else {
            this.quizOver();
        }

    }

    /**
     * Display the quiz
     */
    displayQuiz() {
        hidePopUp();

        // Set the theme
        document.body.className = `bg ${this.theme}`;

        // Update quiz elements
        document.getElementById('quiz-header').textContent = this.name;
        document.getElementById('quiz').classList.remove('hidden');

    }

    /**
     * Display the next question
     */
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

    /**
     * Display question with an image
     * 
     * @param {question} question - Question to display
     */
    displayQuestion(question) {

        // Fetch img of the cat the question is about and display the question
        getAnimalDetails(question.animalID, question.animalType)
            .then(data => {
                question.displayQuestion(data[0].url);
            })
    }

    checkAnswer() { }

    quizOver() {
        console.log('game over');
    }

    async handleAnswerResult(result) { }

    determineOutcome() { }
}

/**
 * Quiz to keep track of a score for a single animal
 */
class AnimalQuiz extends Quiz {

    /**
     * @param {string} name - Name of the quiz
     * @param {string} theme - Theme of the quiz
     * @param {Question[]} questions - Questions of the quiz
     * @param {*} animalType - Type of animal the quiz is about
     * @param {*} points - Current points in the quiz
     * @param {*} questionAmount - Number of questions in the quiz
     */
    constructor(name, theme, questions, animalType, points = 0, questionAmount = null) {
        super(name, theme, questions);
        this.animalType = animalType;
        this.questions = questions;
        this.points = points;
        this.questionAmount = questionAmount ? questionAmount : questions.length;
    }

    /**
     * Handle the outcome of the answer
     * 
     * @param {} result - Outcome of your answer
     */
    async handleAnswerResult(result) {

        // Add points you received from your answer to your points
        this.points += parseInt(result.points);

        // Save Quiz
        saveQuiz(this);

        // Delay
        await delay(1000);

        // Display fact about the animal the question was about
        displayFact(result.animalType, () => {
            this.nextQuestion();
        });
    }

    /**
     * Handle quiz over logic
     */
    quizOver() {

        // Remove event listener
        removeAnswerEventListener();

        // Create the score paragraph 
        var scores = document.createElement('p');

        // Give a animal to the points name (Cat Points etc)
        const animalType = capitalizeFirstLetter(this.animalType) + 's';

        // Create points element to dispaly
        scores.textContent = `${animalType}: ${this.points}`;

        // Update game over screen
        updateGameOver(scores, this.determineOutcome());
    }

    /**
     * Determine the outcome fo the quiz, what 'rank' you will receive.
     * 
     * @returns {string} Outcome of the quiz
     */
    determineOutcome() {

        const points = this.points;
        const maxScore = this.questionAmount;

        // Create title prefix
        const animalType = capitalizeFirstLetter(this.animalType) + 's';

        // Determine rank
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

/**
 * A quiz which keeps track of points for cat and dog questions to figure out what type of person you are
 */
class CatDogPersonQuiz extends AnimalQuiz {

    /**
     * @param {string} name - Name of the quiz
     * @param {string} theme - Theme of the quiz
     * @param {Question[]} questions - Questions of the quiz
     * @param {number} catPoints - Current cat points in the quiz
     * @param {number} dogPoints - Current dog points in the quiz
     */
    constructor(name, theme, questions, catPoints=0, dogPoints=0) {
        super(name, theme, questions, null);
        this.catPoints = catPoints;
        this.dogPoints = dogPoints;
    }

    /**
     * Handle question result outcome for both dog and cat questions
     * 
     * @param {*} result - Outcome of your answer
     */
    async handleAnswerResult(result) {

        if (result.animalType == 'dog')
            this.dogPoints += result.points;
        else if (result.animalType == 'cat')
            this.catPoints += result.points;

        saveQuiz(this);

        // Delay
        await delay(1000);

        // Display fact about animal the question was about
        displayFact(result.animalType, () => {
            this.nextQuestion();
        });
    }

    /**
     * Handle quiz over logic
     */
    quizOver() {

        // Create scores container
        var scoresContainer = document.createElement('div');

        // Create score element for cat points
        var catScores = document.createElement('p');
        catScores.textContent = `${'Cat'}: ${this.catPoints}`;

        // Create score element for dog points
        var dogScores = document.createElement('p');
        dogScores.textContent = `${'Dog'}: ${this.dogPoints}`;

        // Add to scores container
        scoresContainer.appendChild(catScores);
        scoresContainer.appendChild(dogScores);

        // Display game over screen with scores for cat and dog
        updateGameOver(scoresContainer, this.determineOutcome());
    }

    /**
     * Determine what type of person you are based on the relation between your cat and dog points
     * 
     * @returns {string} Type of person you are
     */
    determineOutcome() {

        const catPoints = this.catPoints;
        const dogPoints = this.dogPoints;

        // Compare your cat dog points
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