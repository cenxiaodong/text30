$(function () {
    //标记是否为移动端(移动端为true)(pc端为false)
    var inmodel = true
    // 发送ajax请求
    function init() {
        $.ajax({
            type: 'get',
            url: './data/data.json',
            dataType: 'json',
            success: function (result) {
                // 获取屏幕宽度
                if ($(window).width() >= 768) {
                    inmodel = false
                } else {
                    inmodel = true
                }
                // 调用模板引擎生成动态
                var html = template('bannerTemp', { 'list': result, inmodel: inmodel })
                $('.carousel-inner').html(html)
                //  生成点标记动态
                var htmlIndex = template('bannerIndex', { 'list': result })
                $('.carousel-indicators').html(htmlIndex)
            }

        })
    }
    init()
    // jquery中对浏览器窗口大小进行计数
    $(window).on('resize', function () {
        // 获取当前屏幕的宽度
        var width = $(window).width()
        if ((inmodel && width > 768) || (!inmodel && width < 768)) {
            inmodel = width > 768 ? false : true
            init()
        }
    })
    // 实现移动端手动轮播
    var startX,distanceX
    var carousel = $('.carousel-inner')[0]
    carousel.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].clientX
    })
    carousel.addEventListener('touchend',function(e){
       distanceX = e.changedTouches[0].clientX - startX
        console.log(distanceX)
        if(Math.abs(distanceX) > 50){
             if(distanceX > 50){
                // 正数>50向左移动
                $('.carousel').carousel('prev')
             }else{
                // 否则向下一张移动
                $('.carousel').carousel('next')
             }

        }
    })
  
})