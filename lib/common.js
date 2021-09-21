const fs = require('fs')

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        data = JSON.parse(data)
        resolve(data)
      }
    })
  })
}

const positionToCoordinates = (position, side) => {
  const horizontal = (x) => side === "top" ? x : 2 - x
  const vertical = (y) => side === "top" ? y : 4 - y
  switch (position) {
    case 'GK':
      return [1, vertical(0)]
    case 'RB':
      return [horizontal(0), vertical(1)]
    case 'CB':
      return [horizontal(1), vertical(1)]
    case 'LB':
      return [horizontal(2), vertical(1)]
    case 'RM':
      return [horizontal(0), vertical(2)]
    case 'CM':
      return [horizontal(1), vertical(2)]
    case 'LM':
      return [horizontal(2), vertical(2)]
    case 'RWF':
      return [horizontal(0), vertical(3)]
    case 'ST':
      return [horizontal(1), vertical(3)]
    case 'LWF':
      return [horizontal(2), vertical(3)]
  }
}

const calculateDefense = (players) => {
  const position = players[0].position
  switch (position) {
    case 'GK':
      return Math.round((parseInt(players[0].skill['div']) +
        parseInt(players[0].skill['han']) +
        parseInt(players[0].skill['pos']) +
        parseInt(players[0].skill['ref']) +
        parseInt(players[0].skill['spd'])) / 5)
    default:
      if (players.length > 1) {
        return players.reduce((p1, p2) => (
          Math.round((parseInt(p1.skill['pac']) + parseInt(p2.skill['pac']) +
            parseInt(p1.skill['def']) + parseInt(p2.skill['def']) +
            parseInt(p1.skill['phy']) + parseInt(p2.skill['phy'])
          ) / 6)
        ))
      } else if (players.length === 1) {
        return Math.round((parseInt(players[0].skill['pac']) +
          parseInt(players[0].skill['def']) +
          parseInt(players[0].skill['phy'])) / 3)
      }
  }
}

const calculatePass = (players) => {
  if (players[0].position === 'GK') return 0
  if (players.length > 1) {
    return players.reduce((p1, p2) => (
      Math.round((parseInt(p1.skill['pas']) + parseInt(p2.skill['pas']) +
        parseInt(p1.skill['dri']) + parseInt(p2.skill['dri']) +
        parseInt(p1.skill['phy']) + parseInt(p2.skill['phy'])
      ) / 6)
    ))
  } else if (players.length === 1) {
    return Math.round((parseInt(players[0].skill['pas']) +
      parseInt(players[0].skill['dri']) +
      parseInt(players[0].skill['phy'])) / 3)
  }
}

const calculateFinishing = (players) => {
  if (players[0].position === 'GK') return 0
  if (players.length > 1) {
    return players.reduce((p1, p2) => (
      Math.round((parseInt(p1.skill['pac']) + parseInt(p2.skill['pac']) +
        parseInt(p1.skill['dri']) + parseInt(p2.skill['dri']) +
        parseInt(p1.skill['sho']) + parseInt(p2.skill['sho'])
      ) / 6)
    ))
  } else if (players.length === 1) {
    return Math.round((parseInt(players[0].skill['pac']) +
      parseInt(players[0].skill['dri']) +
      parseInt(players[0].skill['sho'])) / 3)
  }
}

module.exports = {
  getRandomNumber,
  readFile,
  positionToCoordinates,
  calculateDefense,
  calculatePass,
  calculateFinishing
}
