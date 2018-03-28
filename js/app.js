/*
 * 创建一个包含所有卡片的数组
 */
var cards = ['<li class="card"><i class="fa fa-diamond"></i></li>',
          '<li class="card"><i class="fa fa-diamond"></i></li>',
          '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
          '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
          '<li class="card"><i class="fa fa-anchor"></i></li>',
          '<li class="card"><i class="fa fa-anchor"></i></li>',
          '<li class="card"><i class="fa fa-bolt"></i></li>',
          '<li class="card"><i class="fa fa-bolt"></i></li>',
          '<li class="card"><i class="fa fa-cube"></i></li>',
          '<li class="card"><i class="fa fa-cube"></i></li>',
          '<li class="card"><i class="fa fa-left"></i></li>',
          '<li class="card"><i class="fa fa-left"></i></li>',
          '<li class="card"><i class="fa fa-bicycle"></i></li>',
          '<li class="card"><i class="fa fa-bicycle"></i></li>',
          '<li class="card"><i class="fa fa-bomb"></i></li>',
          '<li class="card"><i class="fa fa-bomb"></i></li>',
          '<li class="card"><i class="fa fa-diamond"></i></li>',
          '<li class="card"><i class="fa fa-diamond"></i></li>',]

var open = []

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
shuffle(cards).forEach(function(card){
  $(".deck").append($(card));
});
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
   //检测
 });
