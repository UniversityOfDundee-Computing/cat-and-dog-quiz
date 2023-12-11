class QuestionFactory{

    static createMultipleChoiceBreedQuestions(breeds, amount, animalType){

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
}