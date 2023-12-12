class QuizFactory{

     /**
     * Create a quiz which keeps count of points for a single animal 
     * 
     * @param {string} animal - The animal the quiz is about
     * @param {number} questionAmount - Number of questions to create
     * @returns {AnimalQuiz} AnimalQuiz quiz
     */
    static async createAnimalQuiz(animal, questionAmount){

        try{
            const data = await getBreeds(animal);

            const quizTitle = capitalizeFirstLetter(animal) + ' Quiz';

            // Determine theme based on animal type
            const theme = animal == 'cat' ? 'theme-purple' : 'theme-blue'; 

            // Create questions
            const questions = QuestionFactory.createMultipleChoiceBreedQuestions(data, questionAmount, animal);

            return new AnimalQuiz(quizTitle, theme, questions, animal);

        } catch(err) {
            return null;
        }
    }

    /**
     * Create a quiz which keeps count of cat points and dog points 
     * 
     * @param {number} questionAmount - Number of questions to create
     * @returns {CatDogQuiz} CatDoz quiz
     */
    static async createCatDogQuiz(questionAmount){

        try{

            const catBreeds = await getBreeds('cat');
            const dogBreeds = await getBreeds('dog');

            // Create quiz name
            const quizTitle = 'Cat-Dog Quiz';

            // Determine theme based on animal type
            const theme = 'theme-pink'; 

            // Create questions
            const questions = QuestionFactory.createCatDogMultipleChoiceBreedQuestions(catBreeds, dogBreeds, 10);

            return new CatDogQuiz(quizTitle, theme, questions);

        } catch(err) {
            return null;
        }
    }
}