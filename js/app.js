//参考仓库 => https://github.com/Ayah2022/udacity

$(document).ready(function() {
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
    timer, //记录时间，但如果timer()没区分大小写，而这里又没声明，会出现error
    stars = 3;
  startGame = false;

  $("#reset-button").click(resetGame);

  //重启整个画面
  function initGame() {
    $(".deck").empty();
    $(".timer").text("00:00");
    $(".move").html("0");
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
      Timer(); //如果这里是小写，重启游戏后会出现error
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
      setTimeout(alertWin, 800);
    }
  }

  function removeOpenCards() {
    opencards = [];
  }

  //计时器
  function Timer() {
    let startTime = new Date().getTime();
    timer = setInterval(function() {
      let currenTime = new Date().getTime();
      let timePlayed = currenTime - startTime;
      let mins = Math.floor((timePlayed % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((timePlayed % (1000 * 60)) / 1000);
      timerValue = mins + " 分钟 " + secs + "秒";
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
    $(".moves").html(`${moves}`);
    if (moves == 18) {
      rate();
    } else if (moves == 36) {
      rate();
    } else if (moves == 48) {
      rate();
    }
  }

  function rate() {
    $(".stars li")
      .first()
      .remove();
    stars -= 1;
    $(".stars").append('<li><i class="fa fa-star-o"></i></li>');
  }

  function alertWin() {
    clearInterval(timer);
    swal({
      title: "很棒，您赢了!",
      text:
        "你一共走了 " +
        moves +
        " 步，得到 " +
        stars +
        " 颗星星\n 厉害! " +
        " 只用了" +
        timerValue,
      confirmButtonColor: "#d33",
      confirmButtonText: "重玩"
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
    $(".moves").text("0");
    initGame();
    setTimeout(alertRestart, 100);
  }

  function alertRestart() {
    swal({
      title: "确定删除吗？",
      text: "你将无法恢复它！",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "确定删除！"
    }).then(function(isConfirm) {
        if(isConfirm){
          initGame();
          swal("删除！", "你的文件已经被删除。", "success");
        }else {
          swal(
            "已取消！",
            "请继续游戏！"
          );
        }
    });
  }

  initGame();
});
