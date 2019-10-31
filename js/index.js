window.onload = function(){
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
        }
       
    }
    
}