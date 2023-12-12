var answerCheckResultHandler;

function addAnswerEventListener(callback) {
    answerCheckResultHandler = callback;
    document.addEventListener('answerCheckResult', answerCheckResultHandler);
}

function removeAnswerEventListener() {
    document.removeEventListener('answerCheckResult', answerCheckResultHandler);
}

function dispatchAnswerCheckResultEvent(animaType, points) {

    const answerCheckResult = new CustomEvent('answerCheckResult', {
        detail: {
            points: points,
            animalType: animaType
        }
    });

    document.dispatchEvent(answerCheckResult);
}