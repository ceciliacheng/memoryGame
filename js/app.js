/*
 * 创建一个包含所有卡片的数组
 */
const cards = ['<li class="card"><i class="fa fa-diamond"></i></li>',
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
          '<li class="card"><i class="fa fa-bomb"></i></li>'];

let open = [];



//重启整个画面
function initGame(){
  $(".deck").empty();
  match = 0;
  moves = 0;
  $('.move').text('0');
  $('.fa-star').removeClass('fa-star-o').addClass('fa-star');
  resetTimer();
  $('.timer').text('0');
  creatCards();
}

function creatCards(){
 cardList = shuffle(cards);
 cardList.forEach(addCard);
}

function addCard(card){
  $(".deck").append($(card));
}

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function show() {
  this.className = 'card open show';
}

function check(target) {

  if (open.length == 2) {
    if (open[0].firstChild.className == open[1].firstChild.className) {
      open[0].className = "card match";
      open[1].className = "card match";
      if(target.className.includes('open show')){
        return;
      }
      open.length = 0;
    } else {
      setTimeout(function(){
        open[0].className = "card";
        open[1].className = "card";
        open.length = 0;
      },500);
    }
  }

  if($('.card.match').length == 18){
    alert('恭喜你，你通关了');
  }
}

//计时器
function timer(){
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

            let lastCurrentTime = mins + ':' + secs;

            // Update timer on game screen and modal
            $(".timer").text(lastCurrentTime);
  },500)
}

function Star(move){
  let stars = 3;
  if (moves > star3 && moves < star2){
      $('.stars i').eq(2).removeClass('fa-star').addClass('fa-star-o');
      stars = 2;
  } else if (moves > star2 && moves < star1) {
    $('.stars i').eq(1).removeClass('fa-star').addClass('fa-star-o');
    stars = 1;
  } else if (moves > star1) {
    $('.stars i').eq(0).removeClass('fa-star').addClass('fa-star-o');
  }
  return { score : stars };
}


 $(".deck").on("click","li",function(event){
   //显示卡片
   show.call(this);
   open.push(this);
   //检测
   check(event.target);

   //星级评分
   Star();
 });

 $(".restart").on("click",function(){
   initGame();

 });

 //重启时间
 function resetTimer(){
   if(timer) {
     clearInterval(timer);
     }
 }

 initGame();
