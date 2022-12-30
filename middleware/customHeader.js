const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key
        if (apiKey === 'nagu') {
            next()
        }else{
            res.status(403)
            res.send({error: 'algo salió mal'})
        }
    } catch (error) {
        res.status(403)
        res.send({error: 'algo salió mal'})
    }
}

module.exports = customHeader