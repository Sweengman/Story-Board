const Character = require('../models/character')
const Scene = require('../models/scene')

module.exports = {
    index,
    new: newCharacter,
    show,
    create,
    delete: deleteCharacter,
    addToScene
}

async function addToScene(req, res, next) {
    const scene = await Scene.findById(req.params.id)
    scene.characters.push(req.body.characterId)
    await scene.save()
    res.redirect(`/scenes/${scene._id}`)
}

async function index(req, res, next) {
    const characters = await Character.find({})
    res.render('characters/index', {
        title: 'Created Characters',
        characters
    })
}

async function show(req, res, next) {
    const character = await Character.findById(req.params.id)
    res.render('characters/show', {
        title: character.name,
        character
    })
}

async function newCharacter(req, res, next) {
    res.render('characters/new', {title: 'Create Character'})
}

async function create(req, res, next) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    try{
        req.body.main = true
        const character = await Character.create(req.body)
        res.redirect(`/characters/${character._id}`)
    } catch(err) {
        console.error(err)
        res.render('characters/new')
    }
}

async function deleteCharacter(req, res, next) {
    const character = await Character.findOne({
        'reviews._id': req.params.id,
        'reviews.user': req.user._id
    })
    if (!character) return res.redirect('/characters')
    
  }