const Character = require('../models/character')
const Scene = require('../models/scene')

module.exports = {
    index,
    new: newScene,
    show,
    create
}

async function index(req, res, next) {
    const scenes = await Scene.find({mainScope: true})
    res.render('scenes/index', {
        title: 'Scenes',
        scenes
    })
}

async function show(req, res, next) {
    const scene = await Scene.findById(req.params.id)
    const childScenes = await Scene.find({parentScope: scene})
    const characters = await Character.find({_id: {$nin: scene.characters}} ).sort('name')
    res.render('scenes/show', {
        title: scene.name,
        scene,
        characters,
        childScenes
    })
}

async function newScene(req, res, next) {
    res.render('scenes/new', {title: 'New Master Scene'})
}

async function create(req, res, next) {
    req.body.mainScope = true
    req.body.currentScope = req.body.name
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    try{
        req.body.main = true
        const scene = await Scene.create(req.body)
        res.redirect(`/scenes/${scene._id}`)
    } catch(err) {
        console.error(err)
        res.render('scenes/new')
    }
}