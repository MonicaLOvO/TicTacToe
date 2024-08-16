window.onload = start;
let iscircle = true;
let blocker;
let pieceList = [
  "piece1",
  "piece2",
  "piece3",
  "piece4",
  "piece5",
  "piece6",
  "piece7",
  "piece8",
  "piece9",
];
let gameboardlist = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const intervalSec = 2 * 1000;

/**
 * 
 * Hello 啊~ 明天的我~
 * 接下来要检查的部分是
 * 把player的ID换成名字这样就可以显示赢家(正确显示赢家)
 * 检查为什么Player2 下完了一步以后还能上传gamboard
 * 
 */

let roomNum;
let doublePlayerInterval;
let playerName;

let checkfristplayer=0;
let side;
let playerTwoID = null;
let playerOneID = null;
let intervalId;

let playerTwoInterval;

function start() {
  // alert("started");
  const startScene = document.getElementById("startScene");
  startScene.style.display = "flex";

  const endScene = document.getElementById("endScene");
  endScene.style.display = "none";

  blocker = document.getElementById("blocker");

  // document.getElementById("playerOne").value = "player 1";
  // document.getElementById("playerTwo").value = "player 2";
  // target.className = "circle";
  // target.innerHTML= "o";

  // if(target.innerHTML=="x")
  // {
  //     target.className = "cross";
  //     target.innerHTML= "x";
  // }
  // else
  // {
  //     target.className = "circle";
  //     target.innerHTML= "o";
  // }
}



function joinGame(){
  const room = document.getElementById("joinRoom");
  const startScene = document.getElementById("startScene");
  startScene.style.display = "none";
  room.style.display = "flex";
  let inputBoxPlayerOne = document.getElementById("playerOne");
  playerName =
    inputBoxPlayerOne.value == ""
      ? "Player2"
      : inputBoxPlayerOne.value;

  playerTwoID = Math.floor(10000000+Math.random() * 90000000);


}


function findGame(){
  side = "cross";
  let inputBoxRoom = document.getElementById("enterRoomID");
  let temp = inputBoxRoom.value;
  blocker.style.display = "block";
  let check = findRoom(temp);

  // playerTwoInterval = setInterval(() => {getGameBoard();}, intervalSec);

}


function Host(){
  side = "circle";
  roomNum = Math.floor(10000+Math.random() * 90000).toString();
  let inputBoxPlayerOne = document.getElementById("playerOne");
  playerName =
    inputBoxPlayerOne.value == ""
      ? "Player1"
      : inputBoxPlayerOne.value;
  playerOneID = Math.floor(10000000+Math.random() * 90000000);
  startGame();

  
}

function startGame() {
  blocker.style.display = "block";
  saveGameBoard();
  const startScene = document.getElementById("startScene");
  const target = document.getElementById("background");
  const roomSet = document.getElementById("joinRoom");
  target.style.display = "block";
  startScene.style.display = "none";
  roomSet.style.display = "none";

  const printRoom = document.getElementById("printRoom");
  printRoom.innerHTML = "Room number: "+roomNum+"<br/>Waiting For Another Player...";
}

function buttonClick(targetId) {

  const target = document.getElementById(targetId);
  const whosTurn = document.getElementById("whosTurn");

  blocker.style.display = "block";
  if (iscircle == true && side=="circle") {
    whosTurn.innerHTML = "cross" + "'s turn";
    whosTurn.className = "playerTwoColor";
    if (target.className == "circle") {
      console.log("there is not empty box")
      iscircle = true;
    } else if (target.className == "empty") {
      target.className = "circle";
      target.innerHTML = "o";
      target.classList.add("playerOneColor");
      iscircle = false;
    }else{
      console.log("there is not empty box")
      iscircle = true;
    }
  } else if(iscircle == false && side=="cross"){
    whosTurn.innerHTML = "circle" + "'s turn";
    whosTurn.className = "playerOneColor";
    if (target.className == "cross") {
      console.log("there is not empty box")
      iscircle = false;
    } else if (target.className == "empty") {
      target.className = "cross";
      target.innerHTML = "x";
      target.classList.add("playerTwoColor");
      iscircle = true;
    }else{
      console.log("there is not empty box")
      iscircle = false;
    }
  }
 
  winningcheck();
  saveGameBoard();
  // send to server
}


function winningcheck() {
  let winner = "";
  let circleCount = 0;
  let crossCount = 0;
  let winingcaseList = [
    // ---
    ["piece1", "piece2", "piece3"],
    ["piece4", "piece5", "piece6"],
    ["piece7", "piece8", "piece9"],
    // |
    ["piece1", "piece4", "piece7"],
    ["piece2", "piece5", "piece8"],
    ["piece3", "piece6", "piece9"],
    // x
    ["piece1", "piece5", "piece9"],
    ["piece3", "piece5", "piece7"],
  ];

  for (let list of winingcaseList) {
    crossCount = 0;
    circleCount = 0;
    for (let i = 0; i < list.length; i++) {
      const target = document.getElementById(list[i]);

      if (target.classList.contains("circle")) {
        circleCount += 1;
      } else if (target.classList.contains("cross")) {
        crossCount += 1;
      }
    }

    let winingcase = list;

    if (crossCount == 3) {
      for (let item of winingcase) {
        let temp = document.getElementById(item);

        if (temp.classList.contains("playerOneColor")) {
          temp.classList.remove("playerOneColor");
        } else {
          temp.classList.remove("playerTwoColor");
        }
        temp.classList.add("winnerColor");
      }
      winner = "cross";
      break;
    } else if (circleCount == 3) {
      for (let item of winingcase) {
        let temp = document.getElementById(item);
        if (temp.classList.contains("playerOneColor")) {
          temp.classList.remove("playerOneColor");
        } else {
          temp.classList.remove("playerTwoColor");
        }
        temp.classList.add("winnerColor");
      }

      winner = "circle";
      break;
    }
  }

  if (winner == "cross") {
    blocker.style.display = "block";
    setTimeout(() => {
      endScene(2);
    }, 1000);
  } else if (winner == "circle") {
    blocker.style.display = "block";
    setTimeout(() => {
      endScene(1);
    }, 1000);
  } else {
    let full = true;
    for (let i = 0; i < pieceList.length; i++) {
      let target = document.getElementById(pieceList[i]);
      if (target.className == "empty") {
        full = false;
        break;
      }
    }
    if (full == true) {
      blocker.style.display = "block";
      setTimeout(() => {
        endScene(0);
      }, 1000);
    }
  }

  
  // saveGameBoard();
}

function endScene(iscircle) {
  blocker.style.display = "none";
  const background = document.getElementById("background");
  const endScene = document.getElementById("endScene");
  const wintext = document.getElementById("winnertext");
  background.style.display = "none";

  if (iscircle == 1) {
    wintext.innerHTML = playerName + " Win!";
    wintext.classList.add("playerOneColor");
  } else if (iscircle == 2) {
    wintext.innerHTML = playerTwoName + " Win!";
    wintext.classList.add("playerTwoColor");
  } else if (iscircle == 0) {
    wintext.innerHTML = "It's A Tie!";
    wintext.className = "";
  }

  endScene.style.display = "flex";
}

function restartGame() {
  const background = document.getElementById("background");
  const endScene = document.getElementById("endScene");
  background.style.display = "block";
  endScene.style.display = "none";

  const whosTurn = document.getElementById("whosTurn");
  whosTurn.className = "";
  whosTurn.style.display = "none";

  for (let i = 0; i < pieceList.length; i++) {
    let target = document.getElementById(pieceList[i]);
    target.className = "empty";
  }
}

function saveGameBoard(doNotStartGet = false) {
  for (let i = 0; i < gameboardlist.length; i++) {
    for (let index = 0; index < gameboardlist[i].length; index++) {
      let num = 3 * i;

      let target = document.getElementById(pieceList[num + index]);

      if (target.classList.contains("circle")) {
        gameboardlist[i][index] = 0;
      } else if (target.classList.contains("cross")) {
        gameboardlist[i][index] = 1;
      } else {
        gameboardlist[i][index] = null;
      }
    }
  }
  saveGameBoardToServer(doNotStartGet);
}
async function saveGameBoardToServer(doNotStartGet) {
  console.log("-=-=- Save Game Board =-=-=");
  await fetch("https://localhost:7111/api/TicTacToe/saveGameBoard", {
    method: "Put",
    body: JSON.stringify({
      data: gameboardlist,
      playerOne: playerOneID,
      playerTwo: playerTwoID,
      turn: iscircle,
      roomID: roomNum,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if(!doNotStartGet)
  {
    if(side == "circle" && playerTwoID==null ){
      doublePlayerInterval = setInterval(() => {getGameBoard();}, intervalSec);
    }else{
      intervalId = setInterval(() => {getGameBoard();}, intervalSec);
    }
  }
  
}

async function getGameBoard() {
  try
  {
    const response = await fetch(
      "https://localhost:7111/api/TicTacToe/getGameBoard/"+ roomNum
    );
    const data = await response.json();

    if(data["roomID"] == null)
    {
      return;
    }
    
    checkWhosTurn(data);
    // host wait for second player
    checkSecoundplayer(data);
   
    // Check if other player make a move
    checkNewGameBoard(data);
  
    // playerTwoSpecial(data);
  
    //check if win
    winningcheck();
  }
  catch(e)
  {
    console.log(e);
  }
  
  
}
function checkSecoundplayer(data){
  if(data["playerTwo"]!=null){
    clearInterval(doublePlayerInterval);
    blocker.style.display = "none";
    const printRoom = document.getElementById("printRoom");
    printRoom.style.display = "none";
  }



}
function checkNewGameBoard(data){
  if(JSON.stringify(data["data"]) != JSON.stringify(gameboardlist))
  {
    gameboardlist = data["data"];
    clearInterval(intervalId);
    refreshGameBoard();
    blocker.style.display = "none";
  }

}
function checkWhosTurn(data){
  if(data["turn"]!= iscircle){
    iscircle = data["turn"];
    if(iscircle==true){
      whosTurn.innerHTML = "circle" + "'s turn";
      whosTurn.className = "playerOneColor";

    }else{
      whosTurn.innerHTML = "cross" + "'s turn";
      whosTurn.className = "playerTwoColor";
    }
    
  }
  

}
// function playerTwoSpecial(data){

//   console.log(playerOneID);
//   console.log(data);

//   if(playerOneID == null)
//   {
//     console.log(playerOneID);
//     console.log(data["playerOne"]);
//     playerOneID = data["playerOne"];
//     clearInterval(playerTwoInterval);
//     saveGameBoard(true);
//   }
//   clearInterval(playerTwoInterval);
//   console.log("-*-*/-/-*/-*/-*/*-/-");
// }


async function getEvent() {
  const response = await fetch(
    "https://localhost:7111/api/CEOSim/Item/readFile"
  );
  const data = await response.json();
}

async function findRoom(id) {
  console.log("-=-=- Find Room =-=-=");
  const response = await fetch("https://localhost:7111/api/TicTacToe/findRoom", {
    method: "Put",
    body: JSON.stringify({
      RoomID: id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();

  console.log(data)
  console.log("-*-/-*/-")
  if(data["roomID"] != null){
    roomNum = data["roomID"];
    playerOneID = data["playerOne"];
    startGame();
  }else{
    let inputBoxRoom = document.getElementById("enterRoomID");
    inputBoxRoom.value = null;
    inputBoxRoom.placeholder = "Room not exist";
  }
  blocker.style.display = "none";
}


function refreshGameBoard() {
  for (let i = 0; i < gameboardlist.length; i++) {
    for (let index = 0; index < gameboardlist[i].length; index++) {
      let num = 3 * i;

      let target = document.getElementById(pieceList[num + index]);

      if (gameboardlist[i][index] == 0) {
        target.className = "circle";
        target.innerHTML = "o";
        target.classList.add("playerOneColor");
      } else if (gameboardlist[i][index] == 1) {
        target.className = "cross";
        target.innerHTML = "x";
        target.classList.add("playerTwoColor");
      } else {
        target.className = "empty";
      }
    }
  }

  
}


