'use strict';
const makeRequest = require('./makeRequest');

module.exports = data => {
    const sessionId = data.sessions[0].sessionId

    return makeRequest.get('nodes', sessionId);
}
