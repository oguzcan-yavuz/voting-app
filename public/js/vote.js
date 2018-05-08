class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: String, options: [], loggedIn: Boolean, labelArr: [], dataArr: [] } ;
    }

    componentDidMount() {
        const url = window.location.origin + "/api" + window.location.pathname;
        fetch(url, { credentials: "include" })
            .then(response => response.json())
            .then(body => {
                this.setState({
                    title: body.poll.title,
                    options: body.poll.options,
                    loggedIn: body.loggedIn,
                    labelArr: body.poll.options.map(option => option.name),
                    dataArr: body.poll.options.map(option => option.count)
                });
                this.createChart('voteChart');
            });
    }

    createChart(canvasId) {
        let canvas = document.getElementById(canvasId);
        new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: this.state.labelArr,
                datasets: [{
                    label: this.state.labelArr,
                    data: this.state.dataArr,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    async vote(buttonId) {
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
        console.log("body: ", body);
        if(response.status === 406)
            alert(body.error);
        else {
            this.setState({
                options: body.poll.options,
                labelArr: body.poll.options.map(option => option.name),
                dataArr: body.poll.options.map(option => option.count)
            });
            this.createChart('voteChart');
        }
    }

    async createNewOptions() {
        const pollId = window.location.pathname.split('/').pop();
        const url = window.location.origin + "/api/polls/newOptions/" + pollId;
        const textArea = document.getElementById("newOptionsField");
        const givenOptions = textArea.value;
        textArea.value = '';
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
        this.setState({
            options: body.poll.options,
            labelArr: body.poll.options.map(option => option.name),
            dataArr: body.poll.options.map(option => option.count)
        });
        this.createChart('voteChart');
    }

    render() {
        const options = this.state.options;
        const br = React.createElement('br');
        let title = React.createElement('h2', null, `${ this.state.title }`);
        let chart = React.createElement('canvas', { id: 'voteChart', width: '400', height: '400' });
        let opts = options.map(option => {
            return [ React.createElement('Button', { type: "button", class: "btn", onClick: () => { this.vote(option._id) } }, option.name), br ];
        });
        let newOptionsTxt = React.createElement('textarea', { id: "newOptionsField", placeholder: "Add new options, splitted with new line" });
        let newOptionsBtn = React.createElement('button', { type: "button", class: "btn", onClick: () => { this.createNewOptions() } }, "Add New Options");
        return React.createElement('div', { class: "container"}, (this.state.loggedIn === true) ? [title, opts, newOptionsTxt, br, newOptionsBtn, chart] : [title, opts, chart]);
    }
}

ReactDOM.render(
    React.createElement(Poll, null),
    document.getElementById("react")
);
