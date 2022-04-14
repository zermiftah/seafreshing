const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({msg : "Access Denied", code: 401})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).json({msg : 'Invalid token', code: 400})
    }
}