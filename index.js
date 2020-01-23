const core = require('@actions/core');
const github = require('@actions/github');
let request = require('request');

var bodyData = {
        "audience": "api.atlassian.com", 
        "grant_type":"client_credentials",
        "client_id": '',
        "client_secret": ''
    };

var options = {
    method: 'POST',
    url: 'https://api.atlassian.com/oauth/token',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: {}
};



try {
    const clientId = core.getInput('client-id');
    console.log(`clientId: ${clientId}!`);
    const clientSecret = core.getInput('client-secret');

    bodyData.client_id = clientId;
    bodyData.client_secret = clientSecret;
    bodyData = JSON.stringify(bodyData);
    options.body = bodyData;

    console.log('getAccessToken options: ', options);
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(
            'Response getAccessToken: ' + response.statusCode + ' ' + response.statusMessage
        );
        console.log(body);

        core.setOutput("access-token", body.access_token);

    });


    // const time = (new Date()).toTimeString();
    // core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
} catch (error) {
    core.setFailed(error.message);
}



