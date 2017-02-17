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

});
/*
    name:面向对象下拉框
    date:2017-2-15
    author:UI
*/
function DroptList(id){
	this.oValue=$('#'+id).find('.dropValue').eq(0);
	this.oList=$('#'+id).find('.dropList').eq(0);
}
DroptList.prototype.init=function(){
	var _this=this;
	this.oValue.bind('click',function(){
		_this.showDropt();
	});
}
DroptList.prototype.showDropt=function(){
	var _this=this;
	_this.oList.css('bottom',0);
    //添加阴影
    var shade = document.createElement("div");
    shade.setAttribute('class', 'shade');
    shade.onclick=function(){
        document.body.removeChild(this);
        _this.hideDropt();
    }
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
    $('.shade').remove();
    $('body').removeClass('bhpop');
    $('html').removeClass('bhpop');
}
