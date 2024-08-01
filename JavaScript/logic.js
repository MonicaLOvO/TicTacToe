window.onload = start;
let iscircle = true;
let blocker;
let pieceList = ["piece1", "piece2", "piece3", "piece4", "piece5", "piece6", "piece7", "piece8", "piece9", ];   
let gameboardlist=[
  [null,null,null],
  [null,null,null],
  [null,null,null]];
let playerOneName;
let playerTwoName;

function start() {
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


function startGame() {
  const startScene = document.getElementById("startScene");
  const target = document.getElementById("background");
  target.style.display = "block";
  startScene.style.display = "none";
  
  let inputBoxPlayerOne = document.getElementById("playerOne");
  let inputBoxPlayerTwo  = document.getElementById("playerTwo");
  
  playerOneName = inputBoxPlayerOne.value == "" ? inputBoxPlayerOne.placeholder : inputBoxPlayerOne.value;
  playerTwoName = inputBoxPlayerTwo.value == "" ? inputBoxPlayerTwo.placeholder : inputBoxPlayerTwo.value;
}

function buttonClick(targetId) {
  console.log(targetId);
  const target = document.getElementById(targetId);
  const whosTurn = document.getElementById("whosTurn");

  if (iscircle == true) {
    whosTurn.innerHTML = playerTwoName + "'s turn";
    whosTurn.className = "playerTwoColor";
    if (target.className == "circle") {
      target.className = "empty";
      iscircle = false;
    } else if (target.className == "empty") {
      target.className = "circle";
      target.innerHTML = "o";
      target.classList.add("playerOneColor");
      iscircle = false;
    }
  } else {
    whosTurn.innerHTML = playerOneName + "'s turn";
    whosTurn.className = "playerOneColor";
    if (target.className == "cross") {
      target.className = "empty";
      iscircle = true;
    } else if (target.className == "empty") {
      target.className = "cross";
      target.innerHTML = "x";
      target.classList.add("playerTwoColor");
      iscircle = true;
    }
  }

  winningcheck();
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

    let winingcase=list;

    if (crossCount == 3) {
      for (let item of winingcase) {
        let temp = document.getElementById(item);

        if(temp.classList.contains("playerOneColor"))
        {
          temp.classList.remove("playerOneColor");
        }
        else{
          temp.classList.remove("playerTwoColor");
        }
        temp.classList.add("winnerColor");
      }
      winner = "cross";
      break;
    } else if (circleCount == 3) {
      for (let item of winingcase) {
        let temp = document.getElementById(item);
        if(temp.classList.contains("playerOneColor"))
          {
            temp.classList.remove("playerOneColor");
          }
          else{
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
    setTimeout(() => {endScene(2);}, 1000);
  } else if (winner == "circle") {
    blocker.style.display = "block";
    setTimeout(() => {endScene(1);}, 1000);
  }else{
    let full = true;
    for(let i =0; i<pieceList.length; i++){
      let target = document.getElementById(pieceList[i]);
      console.log(target.className);
      if(target.className == "empty"){
        full=false;
        break;
      }

    }
    if(full==true){
      blocker.style.display = "block";
      setTimeout(() => {endScene(0);}, 1000);
    }
  }
  saveGameBoard();
}

function endScene(iscircle){
  blocker.style.display = "none";
  const background = document.getElementById("background");
  const endScene = document.getElementById("endScene");
  const wintext = document.getElementById("winnertext");
  background.style.display = "none";

  if(iscircle==1){
    console.log("circle win!");
    wintext.innerHTML = playerOneName + " Win!";
    wintext.classList.add("playerOneColor");

  }
  else if (iscircle==2){
    console.log("cross win!");
    wintext.innerHTML = playerTwoName + " Win!";
    wintext.classList.add("playerTwoColor");

  }else if (iscircle==0){
    console.log("It's A Tie!");
    wintext.innerHTML = "It's A Tie!";
    wintext.className = "";
    
  }

  endScene.style.display = "flex";
}

function restartGame(){
  const background = document.getElementById("background");
  const endScene = document.getElementById("endScene");
  background.style.display = "block";
  endScene.style.display = "none";


  const whosTurn = document.getElementById("whosTurn");
  whosTurn.className = "";
  whosTurn.style.display = "none";


  for(let i =0; i<pieceList.length; i++){
    let target = document.getElementById(pieceList[i]);
    target.className = "empty";
  }
}

function saveGameBoard(){
  for(let i =0; i<gameboardlist.length; i++){
    for(let index =0; index<gameboardlist[i].length; index++){
      let num = 3*i;

      let target = document.getElementById(pieceList[num+index]);
      
      if(target.classList.contains("circle")){
        gameboardlist[i][index] = 0;

      }else if(target.classList.contains("cross")){
        gameboardlist[i][index] = 1;

      }else{
        gameboardlist[i][index] = null;

      }
    }
  }
  console.log(gameboardlist);
  console.log("\n");

}

function 