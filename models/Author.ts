const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, require: true},
    books: {type: Array, require: false}
})

module.exports = model('Author', schema)
