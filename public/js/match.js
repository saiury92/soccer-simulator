// User Settings
var gamelength = 10000;
var speed = 20;
// -----------------------
var matchInfo;
var its = 0;
var logs = "";
var pause = false;

setupPitch()

function startMatch() {
  setPositions();
}

function setPositions() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var result = JSON.parse(this.responseText);

      var c = document.getElementById("map");
      var ctx = c.getContext("2d");

      for (var position in result.kickOffTeamGroupByPosition) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        var shortName = ''
        for (player of result.kickOffTeamGroupByPosition[position]) {
          shortName = shortName + ' ' + player.shortName
        }
        switch (position) {
          case 'GK':
            ctx.fillText(shortName, 250, 60)
            break;
          case 'RB':
            ctx.fillText(shortName, 15, 150)
            break;
          case 'CB':
            ctx.fillText(shortName, 210, 150)
            break;
          case 'LB':
            ctx.fillText(shortName, 405, 150)
            break;
          case 'RM':
            ctx.fillText(shortName, 15, 400)
            break;
          case 'CM':
            ctx.fillText(shortName, 210, 400)
            break;
          case 'LM':
            ctx.fillText(shortName, 405, 400)
            break;
          case 'RWF':
            ctx.fillText(shortName, 15, 650)
            break;
          case 'ST':
            ctx.fillText(shortName, 210, 650)
            break;
          case 'LWF':
            ctx.fillText(shortName, 405, 650)
            break;
        }
      }

      for (var position in result.secondTeamGroupByPosition) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        var shortName = ''
        for (player of result.secondTeamGroupByPosition[position]) {
          shortName = shortName + ' ' + player.shortName
        }
        switch (position) {
          case 'GK':
            ctx.fillText(shortName, 250, 790)
            break;
          case 'RB':
            ctx.fillText(shortName, 405, 700)
            break;
          case 'CB':
            ctx.fillText(shortName, 210, 700)
            break;
          case 'LB':
            ctx.fillText(shortName, 15, 700)
            break;
          case 'RM':
            ctx.fillText(shortName, 405, 450)
            break;
          case 'CM':
            ctx.fillText(shortName, 210, 450)
            break;
          case 'LM':
            ctx.fillText(shortName, 15, 450)
            break;
          case 'RWF':
            ctx.fillText(shortName, 405, 200)
            break;
          case 'ST':
            ctx.fillText(shortName, 210, 200)
            break;
          case 'LWF':
            ctx.fillText(shortName, 15, 200)
            break;
        }
      }

      ctx.beginPath();
      ctx.arc(300, 35, 15, 0, Math.PI * 2);
      ctx.fill();

      document.getElementById("result").innerHTML = result.kickOffTeam.name + ": " + result.kickOffTeamStatistics.goals + " - " + result.secondTeamStatistics.goals + " :" + result.secondTeam.name;
    }
  };
  http.open("GET", "/getstartPOS", true);
  http.send();
}

function setupPitch() {
  var c = document.getElementById("map");
  var ctx = c.getContext("2d");
  ctx.canvas.width = 600;
  ctx.canvas.height = 800;

  ctx.beginPath();
  ctx.fillStyle = '#ff751a';
  ctx.fillRect(250, 10, 100, 50);

  for (i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#ff751a';
    ctx.fillRect((15 + i * 15 + i * 180), 100, 180, 50);

    ctx.beginPath();
    ctx.fillStyle = '#47d147';
    ctx.fillRect((15 + i * 15 + i * 180), 150, 180, 50);
  }

  for (i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#ff751a';
    ctx.fillRect((15 + i * 15 + i * 180), 350, 180, 50);

    ctx.beginPath();
    ctx.fillStyle = '#47d147';
    ctx.fillRect((15 + i * 15 + i * 180), 400, 180, 50);
  }

  for (i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#ff751a';
    ctx.fillRect((15 + i * 15 + i * 180), 600, 180, 50);

    ctx.beginPath();
    ctx.fillStyle = '#47d147';
    ctx.fillRect((15 + i * 15 + i * 180), 650, 180, 50);
  }

  ctx.beginPath();
  ctx.fillStyle = '#47d147';
  ctx.fillRect(250, 740, 100, 50);

  ctx.stroke();
}

function pauseGame() {
  pause = true;
}

function playGame() {
  pause = false;
  getMatch();
}

function getMatch() {
  setInterval(function () {
    if (pause == true) {
      clearInterval()
    } else if (its > gamelength) {
      return
    } else {
      moveBall("/moveBall");
    }
  }, speed);
}

function moveBall(endpoint) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      its++;
      var result = JSON.parse(this.responseText);
      console.log(result);
    }
  };
  http.open("GET", endpoint, true);
  http.send();
}