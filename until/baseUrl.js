let baseUrl = ""
function name() {
    if (process.env.NODE_ENV == "development") {
        baseUrl = 'http://game.hyahm.com/api.php'
    } else {
        baseUrl = 'http://game.hyahm.com/api.php'
    }
    return baseUrl
}

export default name