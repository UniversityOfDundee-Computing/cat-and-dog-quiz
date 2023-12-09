// https://alvarotrigo.com/blog/wait-1-second-javascript/
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function findIdByName(list, name) {
    var result = list.find(item => item.name === name);
    return result.id;
}


// const answerCheckResult = new CustomEvent('answerCheckResult', {
//     detail: {
//         correct
//         points: 0,
//         animalType: 'type'
//     }
// })