
var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    console.log('Event: ');
    console.log(event);
    console.log('Context: ');
    console.log(context);

    console.log(event.body);
    var table = new AWS.DynamoDB();
    var itemParams = {
        TableName: process.env.dbName,
        Item: {
            key: {S: 'main'},
            data: {S: event.body}
        }
    };
    console.log(itemParams);
    table.putItem(itemParams, function(errDynamo, data) {
        if (errDynamo) {
            console.error(errDynamo);
            context.fail({
                "statusCode": 500,
                "headers": {}
            });
        } else {
            console.log(data);
            context.succeed({
                "statusCode": 200,
                "headers": {}
            });
        }
    });

};
