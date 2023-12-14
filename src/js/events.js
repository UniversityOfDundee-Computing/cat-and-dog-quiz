var answerCheckResultHandler;

/**
 * Add a event listener to listen to an answer that has been evaluated
 * @param {*} callback - Function to execute when event is triggered
 */
function addAnswerEventListener(callback) {
    answerCheckResultHandler = callback;
    document.addEventListener('answerCheckResult', answerCheckResultHandler);
}

/**
 * Remove event listener for quiz
 */
function removeAnswerEventListener() {
    document.removeEventListener('answerCheckResult', answerCheckResultHandler);
}

/**
 * Dispatch an event that an answer was evaluated
 * 
 * @param {string} animaType - Type of animal the question was about
 * @param {number} points - Number of choices the answer received
 */
function dispatchAnswerCheckResultEvent(animaType, points) {

    const answerCheckResult = new CustomEvent('answerCheckResult', {
        detail: {
            points: points,
            animalType: animaType
        }
    });

    document.dispatchEvent(answerCheckResult);
}