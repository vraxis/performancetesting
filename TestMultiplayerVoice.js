'use strict'

const autocannon = require('autocannon');




function testMessagesApi(serverUrl) {
    const testConfig = {
        server: serverUrl,
        urlPath: '/messages/22'
    }    
    const testInstance = testApi(testConfig);
    process.once('SIGINT',() => {testInstance.stop() });
    testInstance.on('tick', () => console.log('running'))
    autocannon.track(testInstance, {outputStream:process.stdout, progressBarString:'running [:bar] :percent'});
}


function testApi({server="",urlPath=""}= {}) {
    return autocannon({
        url: server+urlPath,
        duration: 5
    },console.log);
}

module.exports = {
    testMessagesApi:testMessagesApi
}