exports.handler = function(event, context, callback) {
    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
    }
    if (event.httpMethod !== "POST"){
        return callback(null, {
            statusCode: 200,
            headers,
            body: "This is not a POST request"
        });
    };


    // define the HTML that will be injected at the boot of the page
    const secretContent = `
    <h3>Welcome to the secret area</h3>
    <p>Here we can tell you that the sky is <strong>blue</strong>, and two plus two equals four.</p>
    `;
    let body;

    if (event.body){
        body = JSON.parse(event.body);
    } else {
        body = {};
    }

    if (body.password == "JavaScript") {
        callback(null, {
            statusCode: 200,
            headers,
            body: secretContent
        });

    } else {
        callback(null, {
            statusCode: 401,
            headers
        });
    }

};