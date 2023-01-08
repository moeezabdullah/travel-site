exports.handler = function(events, context, callback) {
    const secretContent = `
    <h3>Welcome to the secret area</h3>
    <p>Your password was correct</p>
    `
    
    let body

    if (events.body) {
        body = JSON.parse(events.body)
    } else {
        body = {}
    }

    if (body.password == "javascript") {
        callback(null, {
            statusCode: 200,
            body: secretContent
        })

    } else {
        callback(null, {
            statusCode: 401
            
        })
    }

    
    
    
}