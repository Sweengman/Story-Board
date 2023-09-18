const Character = require('../models/character')
const Scene = require('../models/scene')

module.exports = {
    index,
    new: newScene,
    show,
    create,
    newChild,
    createChild
}

async function createChild(req, res, next) {
    req.body.mainScope = false
    req.body.currentScope = req.body.name
    req.body.affiliation = [req.body.affiliationBeg, req.body.affiliationEnd]
    req.body.user = req.user._id
    req.body.userName = req.user.name
    req.body.userAvatar = req.user.avatar
    req.body.objects = req.body.objects.split(',')
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

async function newChild(req, res, next) {
    const parentScene = await Scene.findById(req.params.id)
    res.render('scenes/newChild', {title: 'New Scene', parentScene})
}
async function index(req, res, next) {
    const scenes = await Scene.find({mainScope: true})
    res.render('scenes/index', {
        title: 'Master Scenes',
        scenes
    })
}

async function show(req, res, next) {
    const scene = await Scene.findById(req.params.id).populate('characters')
    const parentScene = await Scene.findOne({currentScope:scene.parentScope})
    const childScenes = await Scene.find({parentScope: scene.currentScope})
    const characters = await Character.find({_id: {$nin: scene.characters}} ).sort('name')
    res.render('scenes/show', {
        title: scene.name,
        scene,
        parentScene,
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
    req.body.affiliation = [req.body.affiliationBeg, req.body.affiliationEnd]
    req.body.user = req.user._id
    req.body.userName = req.user.name
    req.body.userAvatar = req.user.avatar
    req.body.objects = req.body.objects.split(',')
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