const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Distributors = new Schema({
    nameDistributor: {type: String, unique: true},
}, {
    timestamps: true
})
module.exports = mongoose.model('distributor', Distributors)