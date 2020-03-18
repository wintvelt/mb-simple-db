'use strict';
exports.response = function (code, message) {
    var msg;
    if (typeof message === 'string') {
        msg = message
    } else {
        try {
            msg = JSON.stringify(message, null, 2);
        } catch (error) {
            msg = 'onleesbare boodschap';
        }
    }
    return {
        // 'isBase64Encoded': false,
        'statusCode': code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Max-Age': '86400',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 
                'X-Requested-With, X-HTTP-Method-Override, Content-Type, Authorization, Origin, Accept'
        },
        'body': msg
    };
};