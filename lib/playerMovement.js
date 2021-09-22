const common = require('./common')
const actions = require('./actions')

const decideMovement = (matchDetails) => {
  let {
    zoneName, withTeam
  } = matchDetails.ball
  let { kickOffTeam, secondTeam } = matchDetails
  let teamHasBall = kickOffTeam.teamID === withTeam ? kickOffTeam : secondTeam
  let teamWithoutBall = kickOffTeam.teamID !== withTeam ? kickOffTeam : secondTeam
  let zoneHasBall = teamHasBall.zones.find(zone => zone.name === zoneName)
  let zoneWithoutBall = teamWithoutBall.zones.find(zone => zone.name === zoneName)
  let possibleActions = actions.findBallActions(zoneHasBall, zoneWithoutBall, zoneName)
  let action = actions.selectAction(possibleActions)

  console.log('action', action)
  handleBallPlayerActions(matchDetails, teamHasBall, teamWithoutBall, action, zoneName)

  return matchDetails
}

const handleBallPlayerActions = (matchDetails, teamHasBall, teamWithoutBall, action, zoneName) => {
  let zoneHasBall = teamHasBall.zones.find(zone => zone.name === zoneName)
  let sideHasBall = (matchDetails.kickOffTeam.teamID === teamHasBall.teamID) ? 'top' : 'bottom'
  let sideWithoutBall = sideHasBall === 'top' ? 'bottom' : 'top'
  switch (action) {
    case 'tackle':
      matchDetails.ball.withTeam = teamWithoutBall.teamID
      matchDetails.ball.zoneName = common.coordinatesToPosition(matchDetails.ball.position, sideWithoutBall)
      matchDetails.iterationLog.push(`Zone ${matchDetails.ball.zoneName} of team ${teamWithoutBall.name} successfully winning the ball`)
      break
    case 'shoot':
      matchDetails.iterationLog.push(`Zone ${zoneHasBall.name} of ${teamHasBall.name} dribbled the ball past the defender `)
      let GKZone = teamWithoutBall.zones.find(zone => zone.name === 'GK')
      let percentGoal = Math.round((zoneHasBall.finishing / (zoneHasBall.finishing + GKZone.defense) * 100))
      let goalEvents = []
      goalEvents = goalEvents.concat(Array(percentGoal).fill('isGoal'))
      goalEvents = goalEvents.concat(Array(100 - percentGoal).fill('noGoal'))
      let statusGoal = goalEvents[common.getRandomNumber(0, goalEvents.length - 1)]
      console.log('statusGoal', statusGoal)
      if (statusGoal === 'isGoal' && sideHasBall === 'top') {
        matchDetails.kickOffTeamStatistics.goals++
        matchDetails.ball.withTeam = matchDetails.secondTeam.teamID
        matchDetails.ball.zoneName = 'CM'
        matchDetails.ball.position = common.positionToCoordinates('CM', 'bottom')
        matchDetails.iterationLog.push(`Goal Scored by zone ${zoneHasBall.name} of ${teamHasBall.name}`)
      } else if (statusGoal === 'isGoal' && sideHasBall === 'bottom') {
        matchDetails.secondTeamStatistics.goals++
        matchDetails.ball.withTeam = matchDetails.kickOffTeam.teamID
        matchDetails.ball.zoneName = 'CM'
        matchDetails.ball.position = common.positionToCoordinates('CM', 'top')
        matchDetails.iterationLog.push(`Goal Scored by zone ${zoneHasBall.name} of ${teamHasBall.name}`)
      } else {
        matchDetails.ball.withTeam = teamWithoutBall.teamID
        matchDetails.ball.zoneName = 'GK'
        matchDetails.ball.position = common.positionToCoordinates('GK', sideWithoutBall)
        matchDetails.iterationLog.push(`The ${matchDetails.ball.zoneName} of team ${teamWithoutBall.name} successfully save the ball`)
      }
      break
    case 'pass':
      let possibleZones = actions.findPassZones(zoneName)
      let passZone = actions.selectPassZone(possibleZones)
      matchDetails.ball.zoneName = passZone
      matchDetails.ball.position = common.positionToCoordinates(passZone, sideHasBall)
      matchDetails.iterationLog.push(`Zone ${zoneHasBall.name} of team ${teamHasBall.name} successfully passed the ball to zone ${passZone} of team ${teamHasBall.name}`)
      break
  }
}

module.exports = {
  decideMovement,
  handleBallPlayerActions
}