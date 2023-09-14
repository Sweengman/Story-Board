const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new Schema({
    name: String,
    scene: [{type: Schema.Types.ObjectId, ref: 'Scene'}],
    motivations: [String],
    goals: [String],
    affiliation: String,
    description: String
})

module.exports = mongoose.model('Character', characterSchema)

