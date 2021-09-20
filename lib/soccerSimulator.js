
const setVariables = require('./setVariables')

const initiateGame = async (team1, team2) => {
  let matchDetails = setVariables.populateMatchDetails(team1, team2)
  return matchDetails
}

module.exports = { initiateGame }
