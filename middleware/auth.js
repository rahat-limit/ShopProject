const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) return res.status(400).json({ msg: 'Sign In or Sign Up' })

        const user = jwt.verify(token, process.env.JWT_ACCESS_KEY)
    
        req.user = user

        next()
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
}