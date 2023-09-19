const Character = require('../models/character')
const Scene = require('../models/scene')

module.exports = {
    index,
    new: newCharacter,
    show,
    create,
    remove: removeCharacter,
    addToScene,
    delete: deleteCharacter,
    edit,
    change
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
        title: 'All Characters',
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
    req.body.affiliation = [req.body.affiliationBeg, req.body.affiliationEnd]
    req.body.user = req.user._id
    req.body.userName = req.user.name
    req.body.userAvatar = req.user.avatar
    try{
        const character = await Character.create(req.body)
        res.redirect(`/characters/${character._id}`)
    } catch(err) {
        console.error(err)
        res.render('characters/new')
    }
}

async function removeCharacter(req, res, next) {
    try {
        const scene = await Scene.findOne({
            'characters': req.params.id,
            'user': req.user._id
        })
        scene.characters.remove(req.params.id)
        await scene.save()
        res.redirect(`/scenes/${scene._id}`)
    } catch(err) {
        console.error(err)
        return res.redirect('/home')
}
    
}


async function deleteCharacter(req, res, next) {
    try {
        await Character.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })
        res.redirect(`/scenes/${scene._id}`)
    } catch(err) {
        console.error(err)
        return res.redirect('/home')
}
}

async function edit(req, res, next) {
    if (req.user) {
        const character = await Character.findById(req.params.id)
        res.render('characters/edit', {title: `Edit ${character.name}`, character})
    } else return res.redirect('/home')

}

async function change(req, res, next) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    if (req.user) {
        req.body.affiliation = [req.body.affiliationBeg, req.body.affiliationEnd]
        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.userAvatar = req.user.avatar
    } else return res.redirect('/characters')
    try {
        await Character.updateOne({_id: req.params.id}, {$set: req.body})
        res.redirect(`/characters/${req.params.id}`)
    } catch(err) {console.error(err)}
}