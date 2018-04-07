const cards = [
  '<li class="card"><i class="fa fa-diamond"></i></li>',
  '<li class="card"><i class="fa fa-diamond"></i></li>',
  '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
  '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
  '<li class="card"><i class="fa fa-anchor"></i></li>',
  '<li class="card"><i class="fa fa-anchor"></i></li>',
  '<li class="card"><i class="fa fa-bolt"></i></li>',
  '<li class="card"><i class="fa fa-bolt"></i></li>',
  '<li class="card"><i class="fa fa-cube"></i></li>',
  '<li class="card"><i class="fa fa-cube"></i></li>',
  '<li class="card"><i class="fa fa-leaf"></i></li>',
  '<li class="card"><i class="fa fa-leaf"></i></li>',
  '<li class="card"><i class="fa fa-bicycle"></i></li>',
  '<li class="card"><i class="fa fa-bicycle"></i></li>',
  '<li class="card"><i class="fa fa-bomb"></i></li>',
  '<li class="card"><i class="fa fa-bomb"></i></li>'
];

let opencards = [],
  moves = 0,
  match = 0,
  firstCard = "",
  secondCard = "",
  timerValue,
  stars = 3;
  startGame = false;

$(".fa fa-repeat").click(resetGame);

//重启整个画面
function initGame() {
  $(".deck").empty();
  $(".timer").text("00:00");
  $(".move").html("0 Moves");
  $(".stars").empty();
  match = 0;
  moves = 0;
  creatCards();
  clearInterval(timer);
  $(".card").click(show);
  addStars();
}

function addStars() {
  for (var i = 0; i < 3; i++) {
    $(".stars").append('<li><i class="fa fa-star"></i></li>');
  }
}

function creatCards() {
  cardList = shuffle(cards);
  cardList.forEach(addCard);
}

function addCard(card) {
  $(".deck").append($(card));
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function enableClick() {
  opencards[0].click(show);
}

function show() {
  if (startGame == false) {
    startGame = true;
    timer();
  }

  if (opencards.length === 0) {
    $(this).toggleClass("show open");
    opencards.push($(this));
    firstCard = this.firstChild.className;
    disableClick();
  } else if (opencards.length === 1) {
    updateMoves();
    $(this).toggleClass("show open");
    opencards.push($(this));
    secondCard = this.firstChild.className;
    setTimeout(matchCards, 500);
  }
}

function disableClick() {
  opencards.forEach(function(card) {
    card.off("click");
  });
}

function matchCards() {
  if (firstCard === secondCard) {
    console.log("matchCards");
    opencards[0].addClass("match");
    opencards[1].addClass("match");
    removeOpenCards();
    setTimeout(checkResult, 500);
  } else {
    opencards[0].toggleClass("show open");
    opencards[1].toggleClass("show open");
    enableClick();
    removeOpenCards();
  }
}

function checkResult() {
  match += 1;
  if (match == 8) {
    timerValue = document.getElementsByClassName("timer").innerHTML;
    setTimeout(showWinBox,800);
  }
}

function removeOpenCards() {
  opencards = [];
}

//计时器
function timer() {
  let startTime = new Date().getTime();
  timer = setInterval(function() {
    let currenTime = new Date().getTime();
    let timePlayed = currenTime - startTime;
    let mins = Math.floor((timePlayed % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((timePlayed % (1000 * 60)) / 1000);
    timerValue = mins + " minutes " + secs + "seconds";
    if (secs < 10) {
      secs = "0" + secs;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }

    let lastCurrentTime = mins + ":" + secs;

    // Update timer on game screen and modal
    $(".timer").text(lastCurrentTime);
  }, 500);
}

function updateMoves() {
  moves += 1;
  $(".moves").html(`${moves}Moves`);
  if (moves == 18) {
    rate();
  } else if (moves == 36) {
    rate();
  } else if (moves == 48) {
    rate();
  }
}

function rate() {
  $(".stars li").first().remove();
  stars -= 1;
  $(".stars").append('<li><i class="fa fa-star-o"></i></li>');
}

//重启时间
function resetTimer() {
  if (timer) {
    clearInterval(timer);
  }
}

function showWinBox() {
  clearInterval(timer);
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    animation: true,
    customClass: "animated tade",
    title: "Congratulations! You Won!",
    text:
      "With " +
      moves +
      " Moves and " +
      stars +
      " Stars.\n wooo! " +
      " Ellapsed Time" +
      timerValue,
    type: "success",
    confirmButtonColor: "#d33",
    confirmButtonText: "Play again!"
  }).then(function(isConfirm) {
    if (isConfirm) {
      clearInterval(timer);
      initGame();
    }
  });
}

function resetGame() {
  moves = 0;
  match = 0;
  $(".deck").empty();
  $(".stars").empty();
  startGame = false;
  clearInterval(timer);
  $(".timer").text("00:00");
  initGame();
}

initGame();
