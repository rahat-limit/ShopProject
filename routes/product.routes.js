const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Product = require('../model/Product')
const auth = require('../middleware/auth')

router.post('/createProduct',
    [
        check('name', 'Enter in all fields').exists({ checkFalsy: true, checkNull: true }),
        check('title', 'Enter in all fields').exists({ checkFalsy: true, checkNull: true }),
        check('price', 'Enter in all fields').exists({ checkFalsy: true, checkNull: true }),
        check('description', 'Enter in all fields').exists({ checkFalsy: true, checkNull: true })
    ], auth,
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array()[0].msg })

        const { name, title, price, description, checked = false, sold = 0 } = req.body;

        const product = await Product.findOne({ name })

        if (product) return res.status(400).json({ msg: 'Product is already exists' })

        const newProduct = new Product({ name, title: title.toLowerCase(), price, description, checked, sold })

        await newProduct.save()

        return res.status(200).json({ product: newProduct })
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
})
router.get('/getProduct', auth, async (req, res) => {
    try { 
        const product = await Product.find()

        if (!product) return res.status(400).json({ msg: 'Products are not defined' })

        return res.status(200).json({ product })
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
})
router.delete('/deleteProduct/:id', auth, async (req, res) => {
    try { 
        const product = await Product.findByIdAndRemove(req.params.id)

        if (!product) return res.status(400).json({ msg: 'Product is not defined' })

        return res.status(200).json({ msg: 'Product deleted' })
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
})
router.put('/updateProduct/:id', auth, async (req, res) => {
    try { 
        const { name, title, price, description, checked = false, sold = 0 } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { name, title, price, description, checked, sold }) 

        if (!product) return res.status(400).json({ msg: 'Update error' })

        return res.status(200).json({ msg: 'Product updated' })
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
})

module.exports = router;