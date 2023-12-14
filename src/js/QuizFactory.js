class QuizFactory {

    /**
    * Create a quiz which keeps count of points for a single animal 
    * 
    * @param {string} animal - The animal the quiz is about
    * @param {number} questionAmount - Number of questions to create
    * @returns {AnimalQuiz} AnimalQuiz quiz
    */
    static async createAnimalQuiz(animal, questionAmount) {

        try {
            const data = await getBreeds(animal);

            const quizTitle = capitalizeFirstLetter(animal) + ' Quiz';

            // Determine theme based on animal type
            const theme = animal == 'cat' ? 'theme-purple' : 'theme-blue';

            // Create questions
            const questions = QuestionFactory.createMultipleChoiceBreedQuestions(data, questionAmount, animal);

            return new AnimalQuiz(quizTitle, theme, questions, animal);

        } catch (err) {
            console.log(err)
            return null;
        }
    }

    /**
     * 
    * Create a quiz of cat and dog questions with a single points counter
    * 
    * @param {number} questionAmount - Number of questions to create
    * @returns {AnimalQuiz} AnimalQuiz quiz
    */
    static async createMultipleAnimalQuiz(questionAmount){

        try {

            const catBreeds = await getBreeds('cat');
            const dogBreeds = await getBreeds('dog');

            const quizTitle = 'Cat & Dog Quiz';

            // Determine theme
            const theme = 'theme-pink';

            // Create questions
            const questions = QuestionFactory.createCatDogMultipleChoiceBreedQuestions(catBreeds, dogBreeds, questionAmount);

            return new AnimalQuiz(quizTitle, theme, questions, 'cat/Dog');

        } catch (err) {
            console.log(err)
            return null;
        }

    }

    /**
     * Create a quiz which keeps count of cat points and dog points 
     * 
     * @param {number} questionAmount - Number of questions to create
     * @returns {CatDogQuiz} CatDoz quiz
     */
    static async createCatDogPersonQuiz(questionAmount) {

        try {

            const catBreeds = await getBreeds('cat');
            const dogBreeds = await getBreeds('dog');

            // Create quiz name
            const quizTitle = 'Cat/Dog Quiz';

            // Determine theme based on animal type
            const theme = 'theme-pink';

            // Create questions
            const questions = QuestionFactory.createCatDogMultipleChoiceBreedQuestions(catBreeds, dogBreeds, questionAmount);

            return new CatDogPersonQuiz(quizTitle, theme, questions);

        } catch (err) {
            console.log(err)
            return null;
        }
    }

    /**
     * Recreate quiz using stored quiz data
     * 
     * @param {*} storedData - Stored data about a quiz
     * @returns Quiz - Quiz created using stored data
     */
    static async createQuizFromStoredData(storedData) {

        var parsedQuizData = JSON.parse(storedData);

        var questions = [];

        // Reconstruct questions
        parsedQuizData.questions.forEach(data => {
            const question = QuestionFactory.createMultipleChoiceQuestion(data.question, data.answer, data.possibleAnswers, data.animalType, data.animalID);
            questions.push(question);
        });

        // Create correct quiz
        if (parsedQuizData.name === 'Cat Quiz' || parsedQuizData.name === 'Dog Quiz') {

            // const animalType = parsedQuizData.name === 'Cat Quiz' ? 'cat' : 'dog';
            return new AnimalQuiz(parsedQuizData.name, parsedQuizData.theme, questions, parsedQuizData.animalType, parseInt(parsedQuizData.points), parseInt(parsedQuizData.questionAmount));
        }
        if (parsedQuizData.name === 'Cat & Dog Quiz') {
            return new AnimalQuiz(parsedQuizData.name, parsedQuizData.theme, questions, parsedQuizData.animalType, parseInt(parsedQuizData.points), parseInt(parsedQuizData.questionAmount));
        }
        else if (parsedQuizData.name === 'Cat/Dog Quiz') {
            return new CatDogPersonQuiz(parsedQuizData.name, parsedQuizData.theme, questions, parseInt(parsedQuizData.catPoints), parseInt(parsedQuizData.dogPoints));
        }

    }
}