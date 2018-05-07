function getVoteCounts(poll, optionId) {
    for(let option of poll.options) {
        if(option._id === optionId)
            return option.count;
    }
}

function modifyVoteCount(elementId, newValue) {
    // TODO: modify this function to change the html tag that holds vote counts, not the button itself
    let counter = document.getElementById(elementId);
    counter.innerHTML = newValue;
}

async function vote(buttonId) {
    const pollId = window.location.pathname.split('/').pop();
    const url = window.location.origin + "/api/polls/vote/" + pollId;
    const reqBody = { optionId: buttonId };
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
    if(response.status === 406)
        alert(body.error);
    else {
        console.log("res:", res);
        let voteCount = getVoteCounts(res, buttonId);
        modifyVoteCount(buttonId, voteCount);
    }
}
