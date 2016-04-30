var express = require('express')
var router = express.Router()
const VotesController = require('../controllers/VotesController')
const shortid = require('shortid')

/* GET home page. */

router.get('/bets', (req, res, next) => {
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

router.post('/bets/:id/:action', (req, res, next) => {
  const id = req.params.id
  const action = req.params.action
  if (action === 'do' || action === 'dont') res.json(VotesController.voteBet(id, action))
  else {
    res.status(401)
    res.json({err: 'action now allowed'})
  }
})

module.exports = router
