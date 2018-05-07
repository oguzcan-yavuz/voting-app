function modifyOptions() {
    // TODO: parse the response and add new options to the page
}

async function createNewOptions() {
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
    const response = await fetch(url, options);
    const body = await response.json();
    console.log(body);
}
