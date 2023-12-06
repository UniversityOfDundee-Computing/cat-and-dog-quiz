// https://alvarotrigo.com/blog/wait-1-second-javascript/
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}