
/**
 * Try to get a fact about an animal
 * 
 * @param {string} animalType - Animal type to get a fact about
 * @returns {string} - Fact about the animal
 */
async function getFact(animalType) {

    const maxRetries = 15;

    var retries = 0;
    var foundValidFact = false;

    // Try to fetch fact
    while (!foundValidFact && retries <= maxRetries) {

        const response = await fetch(`https://cat-fact.herokuapp.com/facts/random?animal_type=${animalType}`);
        const data = await response.json();

        // If the fact is suitable to display
        if (data.status.verified === true) {
            return data.text;
        }
        else {
            console.log('ATTEMPT ' + retries)
            retries++;
        }
    }

    throw new Error('Failed to get verified fact');

}

/**
 * Display fact
 * 
 * @param {string} animalType - Animal to display fact about
 * @param {*} callback - Function to attach to fact popup button
 */
function displayFact(animalType, callback) {

    // Show fact
    getFact(animalType)
        .then(fact => updateFact(fact, () => {
            callback();
        }))
        .catch(err => callback());
}

/**
 * Update fact popup element with fact
 * 
 * @param {string} fact - Fact to display
 * @param {*} callback - Action added to buttons event listener
 */
function updateFact(fact, callback) {

    console.log('Displaying Fact');

    // Show fact pop up
    document.getElementById('fact').classList.remove('hidden');

    document.getElementById('fact-text').textContent = fact;

    // Remove previous button due to having an event listener
    document.getElementById('next-question-btn').remove();

    // Create button to go to next question
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button';
    btn.innerHTML = 'Next';
    btn.id = 'next-question-btn';

    // Call callback on click
    btn.addEventListener('click', callback);

    document.getElementById('fact-btns').appendChild(btn);
}
