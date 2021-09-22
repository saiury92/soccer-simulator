const common = require('../lib/common')

const selectAction = (possibleActions) => {
  let goodActions = []
  for (const thisAction of possibleActions) {
    let tempArray = Array(thisAction.points).fill(thisAction.name)
    goodActions = goodActions.concat(tempArray)
  }
  return goodActions[common.getRandomNumber(0, goodActions.length - 1)]
}

const findBallActions = (zoneHasBall, zoneWithoutBall, zoneName) => {
  let possibleActions = populateActionsJSON()
  let params = []
  switch (zoneName) {
    case 'GK':
    case 'RB':
    case 'LB':
      params = [0, 100, 0]
      break
    case 'RWF':
    case 'ST':
    case 'LWF':
      let percentFinishing = Math.round((zoneHasBall.finishing / (zoneHasBall.finishing + zoneWithoutBall.defense) * 100))
      console.log(zoneHasBall.finishing, zoneWithoutBall.defense)
      params = [percentFinishing, 0, (100 - percentFinishing)]
      break
    default:
      let percentPass = Math.round((zoneHasBall.pass / (zoneHasBall.pass + zoneWithoutBall.defense) * 100))
      console.log(zoneHasBall.pass, zoneWithoutBall.defense)
      params = [0, percentPass, (100 - percentPass)]
  }
  console.log(params)
  return populatePossibleActions(possibleActions, ...params)
}

const populatePossibleActions = (possibleActions, a, b, c) => {
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

const selectPassZone = (possibleZones) => {
  let goodZones = []
  for (const thisZone of possibleZones) {
    let tempArray = Array(thisZone.points).fill(thisZone.name)
    goodZones = goodZones.concat(tempArray)
  }
  return goodZones[common.getRandomNumber(0, goodZones.length - 1)]
}

const findPassZones = (zoneName) => {
  let possibleZones = populateZonesJSON()

  // GK, RB, CB, LB, RM, CM, LM, RWF, ST, LWF
  switch (zoneName) {
    case 'GK':
      params = [0, 20, 60, 20, 0, 0, 0, 0, 0, 0]
      break
    case 'RB':
      params = [10, 0, 10, 0, 40, 40, 0, 0, 0, 0]
      break
    case 'CB':
      params = [10, 10, 0, 10, 20, 30, 20, 0, 0, 0]
      break
    case 'LB':
      params = [10, 0, 10, 0, 0, 40, 40, 0, 0, 0]
      break
    case 'RM':
      params = [0, 10, 10, 0, 0, 10, 0, 0, 70, 0]
      break
    case 'CM':
      params = [0, 10, 10, 10, 10, 0, 10, 0, 50, 0]
      break
    case 'LM':
      params = [0, 0, 10, 10, 0, 10, 0, 0, 70, 0]
      break
    case 'ST':
      params = [0, 0, 0, 0, 30, 40, 30, 0, 0, 0]
      break
  }
  return populatePossibleZones(possibleZones, ...params)
}

const populatePossibleZones = (possibleZones, a, b, c, d, e, f, g, h, i, j) => {
  // a-GK, b-RB, c-CB, d-LB, e-RM, f-CM, g-LM, h-RWF, i-ST, j-LWF
  possibleZones[0].points = a
  possibleZones[1].points = b
  possibleZones[2].points = c
  possibleZones[3].points = d
  possibleZones[4].points = e
  possibleZones[5].points = f
  possibleZones[6].points = g
  possibleZones[7].points = h
  possibleZones[8].points = i
  possibleZones[9].points = j
  return possibleZones
}

const populateZonesJSON = () => {
  return [{
    'name': 'GK',
    'points': 0
  }, {
    'name': 'RB',
    'points': 0
  }, {
    'name': 'CB',
    'points': 0
  }, {
    'name': 'LB',
    'points': 0
  }, {
    'name': 'RM',
    'points': 0
  }, {
    'name': 'CM',
    'points': 0
  }, {
    'name': 'LM',
    'points': 0
  }, {
    'name': 'RWF',
    'points': 0
  }, {
    'name': 'ST',
    'points': 0
  }, {
    'name': 'LWF',
    'points': 0
  }]
}

module.exports = {
  selectAction,
  findBallActions,
  selectPassZone,
  findPassZones,
}

