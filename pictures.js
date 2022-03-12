const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema(
    {
        image:{
            type: String
        }
    }
)

module.exports = mongoose.model('pictures', imagesSchema)