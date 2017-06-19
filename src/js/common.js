/*
    name:常用JS文件
    date:2017-2-9
    author:UI
*/
/*
------------------------------
    name:设置网页字体大小，7.5表示750视觉稿,大于750宽度的设备应该访问PC端
    date:2016-12-28
    author:UI
*/
var deviceWidth = document.documentElement.clientWidth;
if(deviceWidth > 750){
	deviceWidth = 750;
};
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
$(function(){
    // 切换按钮
    switchBtn();
    // 响应式图片
    responsiveImg();
});
/*
    name:底部栏 
    date:2017-6-16
    author:wmj
*/
$.fn.extend({ 
   bottomList:function(opts){
        var _self = this,
            _this = $(this);//底部包围标签
        opts = jQuery.extend({
            btns: [{
                icon: '&#xe602;',
                name: '首页',
                isCurrent:1
            }, {
                icon: '&#xe61a;',
                name: '办理',
                isCurrent:0
            }, {
                icon: '&#xe636;',
                name: '登记',
                isCurrent:0
            }, {
                icon: '&#xe667;',
                name: '客服',
                isCurrent:0
            }, {
                icon: '&#xe608;',
                name: '专享',
                isCurrent:0
            }],
            cevent: [
                function (btn) {},
                function (btn) {},
                function (btn) {},
                function (btn) {},
                function (btn) {}
            ]
        }, opts || {});
        // 初始化
        var bottomA='';
        for(var i=0;i<opts.btns.length;i++){
            var current=opts.btns[i].isCurrent?'current':'';
            bottomA+='<a class="barLi '+current+'" href="javascript:;">'+
                        '<i class="iconfont">'+opts.btns[i].icon+'</i>'+
                        '<p>'+opts.btns[i].name+'</p>'+
                    '</a>';
        }
        $(this).append(bottomA);
        // 绑定事件
        var linkObj=$(this).find('a');
        linkObj.each(function(j){
            var link=$(this);
            $(this).click(function(){
                linkObj.removeClass('current');
                link.addClass('current');
                opts.cevent[j](link);
            });
        });
   } 
});
/*
    name:轮播图
    date:2017-06-19
    author:wmj
*/
$.fn.extend({
    icarousel:function(opts){
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            images:[
                {imgsrc:'images/carousel/1.jpg',link:'http://www.baidu.com',isCurrent:1},
                {imgsrc:'images/carousel/2.jpg',link:'http://www.baidu.com',isCurrent:0},
                {imgsrc:'images/carousel/3.jpg',link:'http://www.baidu.com',isCurrent:0},
                {imgsrc:'images/carousel/4.jpg',link:'http://www.baidu.com',isCurrent:0}
            ],
            tickTime:''
        }, opts || {});
        //初始化
        var imgString='<ul class="carousel-img">',
        diotString='<ul class="carousel-diot">';
        for (var i = 0; i <opts.images.length; i++) {
            var cimg=opts.images[i].isCurrent?'current':'';
            imgString+='<li imgsort="'+i+'" class=" '+cimg+'"><a href="'+opts.images[i].link+'"><img class="responsive-img" src="'+opts.images[i].imgsrc+'"/></a></li>';
            diotString+='<li class=" '+cimg+'"></li>';
        }
        _this.append(imgString+'</ul>').append(diotString+'</ul>');
        var imgLis =_this.find('.carousel-img');
        var imgLi =imgLis.find('li');
        var diots =_this.find('.carousel-diot').find('li');
        var imgIndex = 1;
        var startX, startY, moveEndX, moveEndY, X, Y, cLi, sort;
        bindEvent();
        if (opts.tickTime) {
            autoPlay();
        }
        function bindEvent(){
            _this.on('touchstart', function(e) {
                e.preventDefault();
                startX = e.originalEvent.changedTouches[0].pageX,
                    startY = e.originalEvent.changedTouches[0].pageY;
                cLi = imgLis.find('.current');
                sort = parseInt(cLi.attr('imgsort'));
            });
            _this.find('.carousel-img a').on('touchmove', function(e) {
                e.preventDefault();
                moveEndX = e.originalEvent.changedTouches[0].pageX,
                    moveEndY = e.originalEvent.changedTouches[0].pageY,
                    X = moveEndX - startX,
                    Y = moveEndY - startY;
                if (Math.abs(X) > Math.abs(Y) && X > 0) { //右滑
                    imgIndex++;
                    cLi.removeClass('current');
                    if (sort == 0) {
                        imgLi.eq(imgLi.length - 1).addClass('current').css('zIndex', imgIndex);
                        diots.removeClass('current');
                        diots.eq(imgLi.length - 1).addClass('current');
                    } else {
                        imgLi.eq(sort - 1).addClass('current').css('zIndex', imgIndex);
                        diots.removeClass('current');
                        diots.eq(sort - 1).addClass('current');
                    }
                } else if (Math.abs(X) > Math.abs(Y) && X < 0) { //左滑
                    imgIndex++;
                    cLi.removeClass('current');
                    if (sort == (imgLi.length - 1)) {
                        imgLi.eq(0).addClass('current').css('zIndex', imgIndex);
                        diots.removeClass('current');
                        diots.eq(0).addClass('current');
                    } else {
                        imgLi.eq(sort + 1).addClass('current').css('zIndex', imgIndex);
                        diots.removeClass('current');
                        diots.eq(sort + 1).addClass('current');
                    }
                }
            });
            _this.find('.carousel-img a').on('touchend', function(e) { //点击事件
                moveEndX = e.originalEvent.changedTouches[0].pageX,
                    moveEndY = e.originalEvent.changedTouches[0].pageY,
                    X = moveEndX - startX,
                    Y = moveEndY - startY;
                if (X == 0 && Y == 0) {
                    window.location = $(this).attr('href');
                }
            });
        }
        function autoPlay(){
            var carTimer=setInterval(function(){
                cLi=imgLis.find('.current');
                sort=parseInt(cLi.attr('imgsort'));
                imgIndex++;
                cLi.removeClass('current');
                if (sort==(imgLi.length-1)) {
                    imgLi.eq(0).addClass('current').css('zIndex',imgIndex);
                    diots.removeClass('current');
                    diots.eq(0).addClass('current');
                }else{
                    imgLi.eq(sort+1).addClass('current').css('zIndex',imgIndex);
                    diots.removeClass('current');
                    diots.eq(sort+1).addClass('current');
                }
            },opts.tickTime);
        }
    }
});
/*
    name:下拉框
    date:2017-2-15
    author:wmj
*/
function DroptList(id){
    this.ID=id;
    this.oValue=$('#'+id).find('.dropValue').eq(0);
    this.oList=$('#'+id).find('.dropList').eq(0);
}
DroptList.prototype.init=function(svalue){
    var svalue=svalue || 0;
    var _this=this;
    this.oValue.bind('click',function(){
        _this.showDropt();
    });
    _this.setValue(svalue);
}
DroptList.prototype.setValue=function(svalue){
    var _this=this;
    var options=this.oList.find('li');
    for(var i=0;i<options.length;i++){
        if (options.eq(i).attr('svalue')==svalue) {
            options.removeClass('selected');
            options.eq(i).addClass('selected');
            this.oValue.html(options.eq(i).children('.valueLi').html());
            break;
        }
    }
}
DroptList.prototype.showDropt=function(){
    var _this=this;
    _this.oList.css('bottom',0);
    //添加阴影
    var shade = document.createElement("div");
    shade.setAttribute('class', 'shade');
    shade.setAttribute('closeTag', _this.ID);
    shade.addEventListener('touchmove',function(ev){
        ev.preventDefault();//禁止滑屏
    });
    shade.onclick=function(){
        document.body.removeChild(this);
        _this.hideDropt();
    };
    document.body.appendChild(shade);
    _this.oList.find('.valueLi').bind('click',function(){
        _this.oList.find('li').removeClass('selected');
        $(this).parent().addClass('selected');
        _this.oValue.html($(this).html());
        _this.hideDropt();
    });
    $('body').addClass('bhpop');
    $('html').addClass('bhpop');
}
DroptList.prototype.hideDropt=function(){
    this.oList.css('bottom',-this.oList.height()+'px');
    $('[closeTag='+this.ID+']').remove();
    $('body').removeClass('bhpop');
    $('html').removeClass('bhpop');
}
/* 
    name:弹出窗口
    date:2016-12-28
    author:wumj
*/
function popWindow(winobj,width,height){
    var objwinId=winobj.attr('id');
    var shade2 = document.createElement("div");
    shade2.setAttribute('class', 'shade');
    shade2.setAttribute('closeTag', objwinId);
    shade2.addEventListener('touchmove',function(ev){
        ev.preventDefault();//禁止滑屏
    });
    shade2.onclick=function(){
        document.body.removeChild(this);
        winobj.hide();
    }
    document.body.appendChild(shade2);
    // 设置弹窗内容最大高度
    if (height) {
        $('.pop-content').css('height', height);
    }else{
        $('.pop-content').css('height', 'auto');
        $('.pop-content').css('max-height', $(window).height()*0.7 + 'px');
    }
    if (width) {
        winobj.css('width',width);
    }else{
        winobj.css('width','50%');
    }
    setPositionCenter(winobj);
    winobj.show();
}
/* 
    name:关闭弹出窗口
    date:2016-12-28
    author:mj
*/
function closePop(popobj){
    var closeId=popobj.attr('id');
    $('[closeTag='+closeId+']').remove();
    popobj.hide();
}
/* 
    name:设置居中位置
    date:2016-12-28
    author:mj
*/
function setPositionCenter(pop) {
    var pcss={'top':'','left':''};
    pcss.top=($(window).height() - pop.height()) / 2 + 'px';
    pcss.left=($(window).width() - pop.width()) / 2 + 'px';
    pop.css(pcss);
}
/* 
    name:发送验证码
    date:2016-12-28
    author:mj
*/
function sendCode(btnObj) {
    var wait = 59;
    var codeTimer=0;
    if (!btnObj.hasClass('disabled')) {
        if(codeTimer){
            clearInterval(codeTimer);
        }
        time(btnObj);
    }
    function time(btn) {
        if (wait == 0) {
            btn.removeClass('disabled');
            btn.html('重新获取');
            wait = 59;
        } else {
            btn.addClass('disabled');
            btn.html('重新获取(' + wait + ')');
            wait--;
            codeTimer=setTimeout(function() {
                time(btn);
            },1000);
        }
    }
}
/* 
    name:切换按钮
    date:2016-12-28
    author:mj
*/
function switchBtn(){
    $('.switch').bind('click',function(){
        if ($(this).hasClass('on')) {
            $(this).html('&#xe6da;');
            $(this).removeClass('on');
        }else{
            $(this).html('&#xe6db;');
            $(this).addClass('on');
        }
    });
}
/* 
    name:响应式图片
    date:2016-12-28
    author:wumj
*/
function responsiveImg() {
    isLoadImg($('.responsive-img'), function() {
        $('.responsive-img').each(function() {
            $(this).parent().css('overflow', 'hidden');
            var pw = $(this).parent().width();
            var ph = $(this).parent().height();
            var tw = $(this).width();
            var th = $(this).height();
            if (tw / th >= pw / ph) {
                var imgcss1 = {
                    'height': '100%',
                    'width': 'auto',
                    'marginTop': 'auto'
                };
                $(this).css(imgcss1);
                $(this).css('marginLeft', (parseInt($(this).parent().width()) - $(this).width()) / 2 + 'px');
            } else {
                var imgcss2 = {
                    'height': 'auto',
                    'width': '100%',
                    'marginLeft': 'auto'
                };
                $(this).css(imgcss2);
                $(this).css('marginTop', (parseInt($(this).parent().height()) - $(this).height()) / 2 + 'px');
            }
        });
    });
}
/* 
    name:判断指定图片是否已经加载
    parameter：图片集合，加载完成后的回调函数
    date:2017-02-07
    author:wumj
*/
function isLoadImg(imgobj, callback) {
    var t_img; // 定时器
    var isLoad = true; // 控制变量
    imgobj.each(function() {
        // 找到为0就将isLoad设为false，并退出each
        if ($(this).height() === 0) {
            isLoad = false;
            return false;
        }
    });
    // 加载完毕
    if (isLoad) {
        clearTimeout(t_img); // 清除定时器
        // 回调函数
        callback();
        // 为false，因为找到了没有加载完成的图，将调用定时器递归
    } else {
        isLoad = true;
        t_img = setTimeout(function() {
            isLoadImg(imgobj, callback); // 递归扫描
        }, 100); // 设置100毫秒就扫描一次，可调整
    }
}