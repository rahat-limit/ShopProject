const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const auth = require('../middleware/auth')

router.post('/register', 
    [
        check('email', 'Enter in all fields').exists({checkFalsy: true, checkNull: true}),
        check('name', 'Enter in all fields').exists({checkFalsy: true, checkNull: true}),
        check('password1', 'Enter in all fields').exists({checkFalsy: true, checkNull: true}),
        check('password2', 'Enter in all fields').exists({checkFalsy: true, checkNull: true}),
        check('email', 'Incorrect Email').normalizeEmail().isEmail(),
        check('password1', 'Password should be at least 6 characters long').isLength({ min: 6 }),
        check('password2', 'Password should be at least 6 characters long').isLength({ min: 6 }),
        check('password1', 'Confirm password an again').custom((value, { req }) => {
            if (value == req.body.password2) {
                return new Error()
            }
        })
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array()[0].msg })

        const { email, name, password1, role = 0 } = req.body;

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ msg: 'An account is already registered' })

        const hashPassword = await bcrypt.hash(password1, 10)

        const newUser = new User ({
            email,
            name,
            password: hashPassword,
            role
        })

        await newUser.save()

        return res.status(200).json({ id: newUser._id })
    } catch (e) {
        return res.status(500).json({ msg: e.message })
}})
router.post('/login',
    [
        check('email', 'Enter in all fields').exists({ checkFalsy: true, checkNull: true }),
        check('password', 'Enter in all fields').exists({ checkFalsy: true, checkNull: true }),
        check('email', 'Incorrect Email').normalizeEmail().isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({ min: 6 })
    ],
    async (req ,res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array()[0].msg })

        const { email, password } = req.body;

        const candidate = await User.findOne({ email })

        if (!candidate) return res.status(400).json({ msg: 'Email is not registered' })

        const isMatch = bcrypt.compare(password, candidate.password)

        if (!isMatch) return res.status(400).json({ msg: 'Wrong password' })

        const token = await jwt.sign({ user: candidate }, process.env.JWT_ACCESS_KEY, { expiresIn: '1d' })

        return res.status(200).json({ token, candidate })
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
})
router.get('/getUser', auth, async (req ,res) => {
    try {
        const user = await User.findById(req.user.user._id)

        const token = await jwt.sign({ user }, process.env.JWT_ACCESS_KEY, { expiresIn: '1d' })
        return res.status(200).json({ token, user })
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
})

module.exports = router;