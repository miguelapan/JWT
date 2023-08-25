const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    try{
        const authenticateToken = jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }catch(err){
        res.status(400).json('WRONG TOKEN')
    }

}