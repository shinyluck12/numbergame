// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호 > 유저번호 Up!!
// Reset버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다.(더 이상 추측불가, 버튼이 disable)
// 유저가 1~100범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.

let computerNum = 0;
let playBtn = document.querySelector("#play-button");
let userInput = document.querySelector("#user-input");
let resultArea = document.querySelector("#result-area");
let resetBtn = document.querySelector("#reset-btn");
let chances = 5;
let gameOver = false;
let chanceArea = document.querySelector("#chance-area");
let history = [];

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.ceil(Math.random() * 100);
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  // 데이터 유효성 검사
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해 주세요.";
    return;
  }
  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
    return;
  }

  chances--;
  chanceArea.innerText = `남은 기회 : ${chances} 회`;
  if (userValue < computerNum) {
    resultArea.textContent = "UP!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN!!!";
  } else {
    resultArea.textContent = "맞추셨습니다!";
    gameOver = true;
  }
  history.push(userValue);
  console.log(history);
  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playBtn.disabled = true;
  }
}

function reset() {
  // user input창이 깨끗하게 정리되고
  userInput.value = "";
  // 새로운번호 생성
  pickRandomNum();
  resultArea.textContent = "결과값이 여기 나옵니다";
  chanceArea.textContent = "남은 기회 : 5 회";
  playBtn.disabled = false;
}

pickRandomNum();
