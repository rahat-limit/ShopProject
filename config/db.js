const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`DB has connected`)
    } catch (e) {
        console.log(e.message)
    }
}