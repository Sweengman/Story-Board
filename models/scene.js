const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sceneSchema = new Schema({
    name: String,
    mainScope: Boolean,
    parentScope: String,
    currentScope: String,
    childScopes: [String],
    characters: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    objects: [String],
    conditions: [String],
    affiliation: [String],
    description: String
})

module.exports = mongoose.model('Scene', sceneSchema)

