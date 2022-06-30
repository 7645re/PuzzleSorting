async function asyncRequest(method, url) {
    return fetch(url, {
        method: method,
    }).then(response => {
        return response
    })
}

async function checkImgValid(url) {
    let result;
    await asyncRequest('GET', url)
        .then(data => {
            result = data
        })
        .catch(err => console.log(err))
    return result
}