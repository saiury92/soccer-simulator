const common = require('./common')
const _ = require('lodash');

const populateMatchDetails = (team1, team2) => {
  return {
    matchID: common.getRandomNumber(1000000000000, 99999999999999999),
    kickOffTeam: team1,
    kickOffTeamGroupByPosition: _.groupBy(team1.players, 'position'),
    secondTeam: team2,
    secondTeamGroupByPosition: _.groupBy(team2.players, 'position'),
    ball: {
      position: [0, 1],
      Player: ``,
      withTeam: ``,
      direction: ``
    },
    kickOffTeamStatistics: {
      goals: 0,
      shots: {
        'total': 0,
        'on': 0,
        'off': 0
      },
    },
    secondTeamStatistics: {
      goals: 0,
      shots: {
        'total': 0,
        'on': 0,
        'off': 0
      },
    },
    iterationLog: []
  }
}

module.exports = {
  populateMatchDetails
}
