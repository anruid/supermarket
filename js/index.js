window.onload = function(){
    searchEffect();
    timeBack();
    bannerEffect();
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
        var scrollTop =window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
        // console.log(scrollTop);
        var opacity = 0;
        if( scrollTop <= bannerHeight){
            // 3.计算出比例值，获取透明度，设置背景颜色样式
            opacity = (scrollTop/bannerHeight).toFixed(1);
             // 设置样式
        search.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
        }else{
            search.style.backgroundColor = "rgba(233,35,34,1)";
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
    // 2.设置倒计时，以秒为单位
     var totalTime = 23*60*60 - nowTime; //1*60*60
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

// 轮播图
function bannerEffect(){
    // 1.设置修改轮播图结构
    // a.开始位置添加原始最后一张
    // b.结束位置添加原始第一张
    var banner = document.querySelector(".jd_banner");
    var imgBox = banner.querySelector("ul:first-of-type");
    var first = imgBox.querySelector("li:first-of-type");
    var last = imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
    // 设置样式
    var lis = imgBox.querySelectorAll("li");
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count*bannerWidth+"px";
    for(var i=0; i< lis.length; i++){
        lis[i].style.width = bannerWidth+"px";
    }
    var index = 1;
    // 设置默认偏移
    imgBox.style.left = -bannerWidth+"px";
    // 当屏幕变化时重新计算宽度
    window.onresize = function(){
        bannerWidth = banner.offsetWidth;
    imgBox.style.width = count*bannerWidth+"px";
    for(var i=0; i< lis.length; i++){
        lis[i].style.width = bannerWidth+"px";
    }
    imgBox.style.left = (-index*bannerWidth)+"px";
    }
    // 实现点标记切换
    var setIndicator = function(index){
        var indicators = banner.querySelector("ul:last-of-type").querySelectorAll("li");
    // 清除其他li元素的active样式
    for(var i=0; i<indicators.length; i++){
        indicators[i].classList.remove("active");
    }
    // 为当前li元素添加样式
    indicators[index-1].classList.add("active");
    }
    // 5.实现自动轮播
    var timerId;
    var startTime = function(){
        timerId = setInterval(function(){
            index++;
            // 添加过渡效果
            imgBox.style.transition = "left 0.3s ease-in-out";
            // 设置偏移
            imgBox.style.left = (-bannerWidth*index)+"px";
            setTimeout(function(){
                if(index == count-1){
                    index = 1;
                    imgBox.style.transition = "none";
                    imgBox.style.left = (-bannerWidth*index)+"px";
                }
            },500);
        },2000);
    }
    startTime();
    // 6.实现手动轮播
    var startX,moveX,distanceX;
    // 标记当前过渡效果是否执行完毕
    var isEnd = true;
    // 获取触摸开始手指位置
    imgBox.addEventListener("touchstart",function(e){
        // 当触摸时清除定时器
        // console.log(123)
        clearInterval(timerId);
        // 获取手指触摸位置
        startX = e.targetTouches[0].clientX;
    });
    // 为图片添加触摸滑动过程事件
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd == true){
            // 记录手指活动过程中的位置
        moveX = e.targetTouches[0].clientX;
        // 计算与开始位置差异
        distanceX = moveX - startX;
        // 保证效果正常应当清除之前可能添加过渡样式
        imgBox.style.transition = "none";
        // left操作实际基于原始坐标
        // 实现元素偏移，基于之前轮播偏移距离
        imgBox.style.left = -index*bannerWidth + distanceX + "px";
        }
    });
    // 触摸离开(结束)后效果
    imgBox.addEventListener("touchend",function(e){
        // 松开手指，标记当前过渡效果正在执行
        isEnd = false;
        // 获取当前滑动距离判断是否超出指定范围
        if(Math.abs(distanceX)>50){
            // 判断滑动方向
            if(distanceX>0){
                // 上一张
                index--;
            }else{
                // 下一张
                index++;
            }
            // 翻页
            imgBox.style.transition = "left 0.3s ease-in-out";
            imgBox.style.left = -index*bannerWidth + "px";
        }else if(Math.abs(distanceX) > 0){//判断用户是否滑动过
            // 回弹
            imgBox.style.transition = "left 0.3s ease-in-out";
            imgBox.style.left = -index*bannerWidth + "px";
        }
        // 将上一次move所产生的数据重置为0
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
    // 当前元素过渡效果执行完毕时，触发事件
    imgBox.addEventListener("webkitTransitionEnd",function(){
        // 如果到了最后一张（count-1），回到第一张index=1
        // 如果到了第一张，回到索引count-2
        if(index == count-1){
            index = 1;
        // 清除过渡
        imgBox.style.transition = "none";
        // 设置偏移
        imgBox.style.left = -index*bannerWidth+"px";
        }else if(index == 0){
            index = count-2;
        // 清除过渡
        imgBox.style.transition = "none";
        // 设置偏移
        imgBox.style.left = -index*bannerWidth+"px";
        }
        // 设置标记
        setIndicator(index);
        // 过渡后开启定时器
        setTimeout(function(){
            isEnd = true;
            // 清除之前的定时器
            clearInterval(timerId);
            // 重新开始定时器
            startTime();
        },300);
            // isEnd = true;
            // // 清除之前的定时器
            // clearInterval(timerId);
            // // 重新开始定时器
            // startTime();
    });
}