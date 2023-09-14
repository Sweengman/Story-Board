const express = require('express')
const router = express.Router()
const characterCtrl = require('../controllers/characters')
const character = require('../models/character')

router.get('/characters', characterCtrl.index)
router.get('/characters/new', characterCtrl.new)
router.get('/characters/:id', characterCtrl.show)
router.post('/characters', characterCtrl.create)
router.post('/scenes/:id/characters', characterCtrl.addToScene)


module.exports = router