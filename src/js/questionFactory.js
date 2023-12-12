class QuestionFactory {

    /**
     * Create a multiple choice question
     * 
     * @param {string} question - Question of the question
     * @param {*} answer - Answer to the question
     * @param {*} possibleAnswers - Possible answers to the question
     * @param {*} animalType - Type of animal the question is about
     * @param {*} animalID - Id of the animal the question is a bout
     * @returns {MultipleChoiceQuestion} - Multiple choice question
     */
    static createMultipleChoiceQuestion(question, answer, possibleAnswers, animalType, animalID) {
        return new MultipleChoiceQuestion(question, answer, possibleAnswers, animalType, animalID)
    }

    /**
     * Crate multiple choice questions about breeds of an animal
     * 
     * @param {string[]} breeds - List of breeds to create questions about 
     * @param {number} amount - Number of questions to create
     * @param {string} animalType - Type of animal to create questions of
     * @returns {MultipleChoiceQuestion[]} - A list of multiple choice questions about animal breeds
     */
    static createMultipleChoiceBreedQuestions(breeds, amount, animalType) {

        var questions = []

        for (let i = 0; i < amount; i++) {

            // Find random breed to be the answer
            var randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

            // Find possible answers to the question
            var possibleAnswers = getMultipleUniqueBreeds(breeds, 4, randomBreed.name);

            // Create multiple choice question
            let newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, animalType, randomBreed.id);

            questions.push(newQuestion);
        }

        return questions;
    }

    /**
     * Create multiple choice questions about breeds of cats and dogs
     * 
     * @param {string[]} catBreeds - List of cat breeds
     * @param {*} dogBreeds - List of dog breeds
     * @param {*} amount - Number of questions to create
     * @returns {MultipleChoiceQuestion[]} - A list of multiple choice questions about cat adn dog breeds
     */
    static createCatDogMultipleChoiceBreedQuestions(catBreeds, dogBreeds, amount) {

        var questions = []

        for (let i = 0; i < amount; i++) {

            var newQuestion;

            // Distribute questions equally
            if (i % 2 === 0) {
                var randomBreed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
                var possibleAnswers = getMultipleUniqueBreeds(catBreeds, 4, randomBreed.name);

                newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, 'cat', randomBreed.id);
            }
            else {
                var randomBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
                var possibleAnswers = getMultipleUniqueBreeds(dogBreeds, 4, randomBreed.name);

                newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, 'dog', randomBreed.id);
            }

            questions.push(newQuestion);
        }

        return questions;

    }
}