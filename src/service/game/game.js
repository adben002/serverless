
module.exports.handler = function(event, context, callback) {

    console.log("uihuih");
    var response = {
        "statusCode": 200,
        "body": JSON.stringify({a: 12})
    };
    context.succeed(response);
};
