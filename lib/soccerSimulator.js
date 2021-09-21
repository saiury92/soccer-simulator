
const setVariables = require('./setVariables')
const playerMovement = require('./playerMovement')

const initiateGame = async (team1, team2) => {
  let matchDetails = setVariables.populateMatchDetails(team1, team2)
  let kickOffTeam = setVariables.setGameVariables(matchDetails.kickOffTeam, 'top')
  let secondTeam = setVariables.setGameVariables(matchDetails.secondTeam, 'bottom')
  kickOffTeam = setVariables.koDecider(kickOffTeam, matchDetails)
  matchDetails.iterationLog.push(`Team to kick off - ${kickOffTeam.name}`)
  matchDetails.iterationLog.push(`Second team - ${secondTeam.name}`)
  matchDetails.kickOffTeam = kickOffTeam
  matchDetails.secondTeam = secondTeam
  return matchDetails
}

const playIteration = async (matchDetails) => {
  matchDetails.iterationLog = []
  matchDetails = playerMovement.decideMovement(matchDetails)
  return matchDetails
}

module.exports = {
  initiateGame,
  playIteration
}
