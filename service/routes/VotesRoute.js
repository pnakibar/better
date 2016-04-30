var express = require('express')
var router = express.Router()
const VotesController = require('../controllers/VotesController')
const shortid = require('shortid')

/* GET home page. */

router.get('/bets', (req, res, next) => {
  console.log(VotesController.getBets)
  res.json(VotesController.getBets())
})

router.post('/bets', (req, res, next) => {
  res.json(VotesController.addBet(req.body))
})

router.get('/bets/:id', (req, res, next) => {
  const id = req.params.id
  if (shortid.isValid(id)) {
    res.json(VotesController.getBets(id)[0] || 'none')
  } else {
    res.status(406)
    res.json({message: 'Invalid key', err: 'INVALID_KEY'})
  }
})

router.post('/bets/vote', (req, res, next) => {
  console.log(req.body.id)
  console.log(req.body.action)
  res.json(VotesController.voteBet(req.body.id, req.body.action))
})

module.exports = router
