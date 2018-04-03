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

let open = [],
  resart = false,
  star3 = 18,
  star2 = 36,
  star1 = 54;

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

initGame();

//重启整个画面
function initGame(){
  var renew = shuffle(cards);
  $(".deck").empty();
  match = 0;
  moves = 0;
  $('.move').text('0');
  $('.fa-star').removeClass('fa-star-o').addClass('fa-star');
  second = 0;
  resetTimer()
  $('.timer').text('$second')
  shuffle(cards).forEach(function(card){
    $(".deck").append($(card));
  });
}

//重启时间
function resetTimer(){
  if(timer) {
    clearInterval(timer);
    }
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

function check() {
  if (open.length == 2) {
    if (open[0].firstChild.className === open[1].firstChild.className) {
      $(".deck").open[0].className = "card match";
      $(".deck").open[1].className = "card match";
      open.length = 0;
    } else {
      setTimeout(function(){
        open[0].className = "card";
        open[1].className = "card";
        open.length = 0;
      },800);
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

function ratingStar(){

}
/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
 $(".deck").on("click","li",function(){
   //显示卡片
   show.call(this);
   open.push(this);
   //检测
   check();

   //星级评分

 });

 $(".restart").on("click",function(){
   console.log('hello');
   initGame();

 });

 timer();
