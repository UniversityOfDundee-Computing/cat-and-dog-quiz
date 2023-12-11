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

    static createCatDogMultipleChoiceBreedQuestions(catBreeds, dogBreeds, amount){

        var questions = []

        for (let i = 0; i < amount; i++) {

            var newQuestion;

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