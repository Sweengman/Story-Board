const express = require('express')
const router = express.Router()
const characterCtrl = require('../controllers/characters')
const character = require('../models/character')

router.get('/characters', characterCtrl.index)
router.get('/characters/new', characterCtrl.new)
router.get('/characters/:id', characterCtrl.show)
router.get('/characters/:id/edit', characterCtrl.edit)
router.post('/characters', characterCtrl.create)
router.post('/scenes/:id/characters', characterCtrl.addToScene)
router.delete('/scenes/characters/:id', characterCtrl.remove)
router.delete('/characters/:id', characterCtrl.delete)
router.put('/characters/:id/edit', characterCtrl.change)

module.exports = router