// delay function for creating animation
async function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2)
        }, delayInms);
    });
}