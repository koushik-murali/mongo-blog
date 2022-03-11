const Mongoose = require('mongoose')
const marked = require('marked')
const purify = require('dompurify')
const { JSDOM } = require ('jsdom')
const dompurify = purify(new JSDOM().window)
const slugify = require ('slugify')

const articleSchema = new Mongoose.Schema({
    title:{
        require: true,
        type: String
    },
    author:{
        require: true,
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    body:{
        type: String,
        require: true
    },
    sanitizedHTML : {
        type: String,
        required: true
    },
    Slugify: {
        type: String,
        required: true,
        unique: true
    }
})

articleSchema.pre('validate', function(next) {

        this.Slugify = slugify(this.title, {lower: true, strict: true})
        this.sanitizedHTML = dompurify.sanitize(marked.parse(this.body))    
        next()
})

module.exports = Mongoose.model('articles', articleSchema)