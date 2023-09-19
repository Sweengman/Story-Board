const express = require('express')
const router = express.Router()
const sceneCtrl = require('../controllers/scenes')

router.get('/', sceneCtrl.index)
router.get('/new', sceneCtrl.new)
router.get('/:id', sceneCtrl.show)
router.get('/:id/newChild', sceneCtrl.newChild)
router.post('/newChild', sceneCtrl.createChild)
router.post('/', sceneCtrl.create)
module.exports = router