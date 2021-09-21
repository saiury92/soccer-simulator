const common = require('./common')
const actions = require('./actions')

const decideMovement = (matchDetails) => {
  let {
    zoneName, withTeam
  } = matchDetails.ball
  let { kickOffTeam, secondTeam } = matchDetails
  let teamHasBall = kickOffTeam.teamID === withTeam ? kickOffTeam : secondTeam
  let teamWithoutBall = kickOffTeam.teamID !== withTeam ? kickOffTeam : secondTeam
  let possibleActions = actions.findBallActions(teamHasBall, teamWithoutBall, zoneName)
  let action = actions.selectAction(possibleActions)

  console.log('action', action)

  return matchDetails
}

module.exports = {
  decideMovement
}