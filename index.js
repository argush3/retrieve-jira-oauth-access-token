const core = require('@actions/core');
const github = require('@actions/github');
let request = require('request-promise-native');

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


async function getAccessToken() {
    try {
        const clientId = core.getInput('client-id');
        const clientSecret = core.getInput('client-secret');

        bodyData.client_id = clientId;
        bodyData.client_secret = clientSecret;
        bodyData = JSON.stringify(bodyData);
        options.body = bodyData;

        // const payload = JSON.stringify(github.context.payload, undefined, 2)
        // console.log(`The event payload: ${payload}`);

        const response = await request(options);
        console.log("response: ", response);
        core.setOutput("access-token", body.access_token);
    } catch (error) {
        core.setFailed(error.message);
    }
}


(async function () {
    await getAccessToken();

    console.log("finished retrieving access token");
})();



// try {
//     const clientId = core.getInput('client-id');
//     const clientSecret = core.getInput('client-secret');
//
//     bodyData.client_id = clientId;
//     bodyData.client_secret = clientSecret;
//     bodyData = JSON.stringify(bodyData);
//     options.body = bodyData;
//
//     const payload = JSON.stringify(github.context.payload, undefined, 2)
//     // console.log(`The event payload: ${payload}`);
//
//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         console.log(
//             'Response getAccessToken: ' + response.statusCode + ' ' + response.statusMessage
//         );
//         console.log(body);
//
//         core.setOutput("access-token", body.access_token);
//
//     });
//
// } catch (error) {
//     core.setFailed(error.message);
// }



