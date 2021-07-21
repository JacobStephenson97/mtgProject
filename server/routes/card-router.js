const express = require('express')

const CardCtrl = require('../controllers/card-ctrl')

const router = express.Router()

router.get('/:name', CardCtrl.getCardByName)

module.exports = router