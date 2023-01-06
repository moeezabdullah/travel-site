export.handler = function(events, context, callback) {
    callback(null, {
        statusCode: 200,
        body: 'Welcome to the secret area'
    })
}