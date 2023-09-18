const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sceneSchema = new Schema({
    name: String,
    mainScope: Boolean,
    parentScope: String,
    currentScope: String,
    childScopes: [String],
    characters: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    objects: [String],
    conditions: [String],
    affiliation: [String],
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
    userAvatar: String
})

module.exports = mongoose.model('Scene', sceneSchema)

