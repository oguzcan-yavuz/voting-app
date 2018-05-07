async function callFetchFromNewOptions(url, options) {
    return fetch(url, options)
        .then(response => {
            return response.json()
                .then(res => res)
        })
        .catch(err => Promise.reject(err))
}

function modifyOptions() {
    // TODO: parse the response and add new options to the page
}

function createNewOptions() {
    const pollId = window.location.pathname.split('/').pop();
    const url = window.location.origin + "/api/polls/newOptions/" + pollId;
    const givenOptions = document.getElementById("newOptionsField").value;
    const reqBody = { options: givenOptions };
    const options = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };
    callFetchFromNewOptions(url, options)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        })
}
