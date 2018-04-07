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

let opencards = [];

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
  if (opencards.length === 0) {
    $(this).toggleClass('show open');
    opencards.push($(this));
    firstCard = this.firstChild.className;
    //disableClick;
  } else if (opencards.length === 0) {
    //updateMoves();
    updateMoves();
    $(this).toggleClass('show open');
    opencards = this.firstChild.className;
    //setTimeout();
  }

  console.log(this)
  console.log(opencards)
}

//function check() {
  //$(this).toggleClass("show card");
  //opencards.push($(this));
  //console.log(opencards)
//}

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

function updateMoves(){

}

 $(".deck").on("click","li",function(){
   //显示卡片
   show.call(this);
   //open.push(this);
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
