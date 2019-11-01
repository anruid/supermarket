window.onload = function(){
    searchEffect();
    timeBack();
}

// 头部JS效果
function searchEffect(){
     // 头部搜索效果
    // 1.获取当前banner高度
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var search = document.querySelector(".jd_search");
    // 2.获取当前屏幕滚动时，banner滚动初屏幕的距离
    window.onscroll = function(){
        var offTop = document.documentElement.scrollTop;
        // console.log(offTop);
        var opacity = 0;
        if( offTop < bannerHeight){
            // 3.计算出比例值，获取透明度，设置背景颜色样式
            opacity = offTop/bannerHeight;
             // 设置样式
        search.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
        }else{
            search.style.backgroundColor = "rgb(233,35,34)";
        }
       
    }
}

// 倒计时效果
function timeBack(){
    // 1.获取展示时间的span
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    // 获取当前时间
    var myDate = new Date();
    var myHour = myDate.getHours();
    var myMinute = myDate.getMinutes();
    var mySecond = myDate.getSeconds();
    var nowTime = myHour*60*60 + myMinute*60 + mySecond;
    console.log(nowTime);
    // 2.设置倒计时，以秒为单位
     var totalTime = 20*60*60 - nowTime; //1*60*60
    //  3.开启定时器
     var timerId = setInterval(function(){
         totalTime--;
        //  判断倒计时是否完成
        if(totalTime < 0){
            // 清除倒计时
            clearInterval(timerId);
            return;
        }
        //  得到剩余时间 时 分  秒
        // 获取 时 
        var hour = Math.floor(totalTime/3600);
        // 获取 分
        var minute = Math.floor(totalTime%3600/60);
        // 获取 秒
        var second = Math.floor(totalTime%60);
        // 将时间填充到span中
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);

        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);

        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
     },1000);
}