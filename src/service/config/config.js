
module.exports.handler = function(event, context, callback) {

    var response = {
        "statusCode": 200,
        "body": JSON.stringify({
            userPoolId: process.env.userPoolId,
            clientId: process.env.clientId,
            identityPoolId: process.env.identityPoolId,
            cognitoLogin: process.env.cognitoLogin,
            region: process.env.region
        })
    };
    context.succeed(response);
};
