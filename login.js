'use strict';

const makeRequest = require('./makeRequest');

const postData = {
    "sessions": [{
        "username": process.env.HIVE_USERNAME,
        "password": process.env.HIVE_PASSWORD,
        "caller": "WEB"
    }]
};

module.exports = () => {
    return makeRequest.post('auth/sessions', postData);
}
