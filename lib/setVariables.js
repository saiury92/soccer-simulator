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
      position: ``,
      Player: ``,
      withTeam: ``,
      direction: ``,
      zoneName: ``
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

const setGameVariables = (team, side) => {
  const teamGroupByPosition = _.groupBy(team.players, 'position')
  team.players.forEach(player => {
    player.playerID = common.getRandomNumber(1000000000000, 99999999999999999)
    player.coordinates = common.positionToCoordinates(player.position, side)
    player.offside = false
    player.hasBall = false
    player.stats = {
      'goals': 0,
      'shots': {
        'total': 0,
        'on': 0,
        'off': 0
      },
      'cards': {
        'yellow': 0,
        'red': 0
      },
      'passes': {
        'total': 0,
        'on': 0,
        'off': 0
      },
      'tackles': {
        'total': 0,
        'on': 0,
        'off': 0,
        'fouls': 0
      }
    }
    if (player.position == 'GK') player.stats.saves = 0
  })
  team.teamID = common.getRandomNumber(1000000000000, 99999999999999999)
  team.zones = []
  for (const position in teamGroupByPosition) {
    let zone = {
      name: position,
      players: teamGroupByPosition[position],
      defense: common.calculateDefense(teamGroupByPosition[position]),
      pass: common.calculatePass(teamGroupByPosition[position]),
      finishing: common.calculateFinishing(teamGroupByPosition[position]),
      coordinates: common.positionToCoordinates(position, side)
    }
    team.zones.push(zone)
  }
  return team
}

const koDecider = (team1, matchDetails) => {
  matchDetails.ball.zoneName = 'CM'
  matchDetails.ball.position = common.positionToCoordinates('CM', 'top')
  matchDetails.ball.withTeam = team1.teamID
  return team1
}

module.exports = {
  populateMatchDetails,
  setGameVariables,
  koDecider
}
