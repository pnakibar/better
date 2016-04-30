'use strict'
const UUID = require('uuid')
const shortid = require('shortid')
class VotesController {
  constructor () {
    this.bets = [
      {
        id: 'S1ob3_b-',
        name: 'Test',
        description: 'Test Description',
        votes: {
          do: 0,
          dont: 0
        },
        age: new Date(Date.now())
      }
    ]
  }

  getBets () {
    this.organizeBets()
    return this.bets
  }

  getBet (id) {
    return this.bets.filter((bet) => bet.id === id)
  }

  voteBet (id, action) {
    if (action !== 'do' && action !== 'dont')
      return 'invalid action'

    const betIndex = this.bets.findIndex((bet) => bet.id === id)
    console.log(betIndex)

    if (betIndex < 0) return 'not found'


    this.bets[betIndex].votes[action]++

    return this.getBets()
  }

  addBet (bet) {
    bet.id = UUID.v4()
    bet.age = new Date(Date.now())
    bet.votes = {
      do: 0,
      dont: 0
    }
    this.bets.push(bet)
    return this.getBets()
  }

  organizeBets () {
    const votesTotal = (bet) => (bet.votes.do + bet.votes.dont) * 10
    const valueDate = (bet) => bet.age.getTime()
    const betValue = (bet) => valueDate(bet) - votesTotal(bet)

    const compareBets = (bet1, bet2) => {
      const bet1Value = betValue(bet1)
      const bet2Value = betValue(bet2)
      if (bet1Value > bet2Value) return -1
      if (bet2Value > bet1Value) return 1
      return 0
    }

    this.bets.sort(compareBets)
    return this.bets
  }
}

module.exports = new VotesController()
