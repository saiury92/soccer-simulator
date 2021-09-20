const express = require('express')
const fs = require('fs')
const soccerSimulator = require('./lib/soccerSimulator')
const common = require('./lib/common')
const app = express()

app.use(express.static("public"))

app.get('/', (req, res) => {
  res.redirect('/match.html')
})

app.get("/getstartPOS", (req, res) => {
  common.readFile("teams/england.json").then((team1) => {
    common.readFile("teams/italy.json").then((team2) => {
      soccerSimulator.initiateGame(team1, team2).then((matchSetup) => {
        res.status(200).send(matchSetup)
      }).catch((error) => {
        console.error("Error: ", error);
      });
    })
  })
})


app.listen(5000, () => {
  console.log('server listening on port 5000....')
})

