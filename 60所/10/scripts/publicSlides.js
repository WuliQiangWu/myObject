// JavaScript Document
(function($){
	$.fn.tabUl=function(settings){
		settings=$.extend({
		    slide:"#ulList",//切换包含的选项内容
		    triggerLeft:"#triggerLeft",//上一条			   
		    triggerRight:"#triggerRight",//下一条			   
		    tabSelected:"#tabSelected",//选择按钮切换			  	   
		    autoPlay:"true",//自动播放  					 
		    time:3000//切换播放时间				 
		},settings);

		return this.each(function(){
			var next=$(settings.triggerRight);
			var prev=$(settings.triggerLeft);
			var content=$(settings.slide);
			var tabSelected=$(settings.tabSelected);
			content.children().first().show();	
			var slideView=function(i){
				content.children().eq(i).fadeIn().siblings().hide();
				tabSelected.children().eq(i).attr("id","selected_option").siblings().removeAttr("id");
			};
		    //自动切换内容
		    var item=0;
		    var els=content.children().length;
		    var timer=function(){
			    slideView(item);		   
			    item=(item+1) % els;		   
		    };
		    next.click(function(){
			    if(item<6){
			        clearInterval(timer);
			        item++;
			        slideView(item)
			    }
		    });
		    prev.click(function(){
			    if(item>0){
				    clearInterval(timer);
				    item--;
				    slideView(item);
			    }
		    });
		    tabSelected.children().hover(function(){
			    clearInterval(timer);			   
			    var index=tabSelected.children().index(this);
			    slideView(index);
		    },function(){
			    timer=setInterval(function(){
				    slideView(item); 
			    },3000);			   

		    });
		});
    }
})(jQuery);
 