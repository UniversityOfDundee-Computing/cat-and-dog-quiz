class QuizFactory{

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
}