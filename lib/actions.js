const common = require('../lib/common')


const selectAction = (possibleActions) => {
  let goodActions = []
  for (const thisAction of possibleActions) {
    let tempArray = Array(thisAction.points).fill(thisAction.name)
    goodActions = goodActions.concat(tempArray)
  }
  return goodActions[common.getRandomNumber(0, goodActions.length - 1)]
}

const findBallActions = (teamHasBall, teamWithoutBall, zoneName) => {
  let possibleActions = populateActionsJSON()
  let params = []
  let zoneHasBall = teamHasBall.zones.find(zone => zone.name === zoneName)
  let zoneWithoutBall = teamWithoutBall.zones.find(zone => zone.name === zoneName)
  switch (zoneName) {
    case 'GK':
      params = [0, 100, 0]
      break
    default:
      let percentPass = Math.round((zoneHasBall.pass / (zoneHasBall.pass + zoneWithoutBall.defense) * 100))
      console.log(zoneHasBall.pass, zoneWithoutBall.defense)
      params = [0, percentPass, (100 - percentPass)]
  }
  console.log(params)
  return populatePossibleActions(possibleActions, ...params)
}

function populatePossibleActions(possibleActions, a, b, c) {
  //a-shoot b-pass, c-tackle
  possibleActions[0].points = a
  possibleActions[1].points = b
  possibleActions[2].points = c
  return possibleActions
}

const populateActionsJSON = () => {
  return [{
    'name': 'shoot',
    'points': 0
  }, {
    'name': 'pass',
    'points': 0
  }, {
    'name': 'tackle',
    'points': 0
  }]
}

module.exports = {
  findBallActions,
  selectAction
}

