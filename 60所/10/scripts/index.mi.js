var mySwiper=new Swiper(".swiper-container",{direction:"vertical",loop:!1,mousewheelControl:!0,nextButton:".arrowdiv"});$(".About").click(function(){$(".index_2_popups").css("display","block")});var audioStatus="mp31";$("#media").on("playing",function(){$("#audio_btn").removeClass().addClass("on");document.cookie="mp3=on;path=/;"});$("#media").on("pause",function(){$("#audio_btn").removeClass().addClass("off");document.cookie="mp3=off;path=/;"});
$("#audio_btn").on("click",function(){$(this).hasClass("on")?$("#media").get(0).pause():$("#media").get(0).play();$(this).toggleClass("on off");return!1});$.getJSON(Config.getServerFullContextPath()+"/m/total-contract?_="+(new Date).getTime(),null,function(a){a=a.totalNum;if(9999<=a)$(".index-spl-li").each(function(){$(this).html(9)});else if(0<=a&&9999>a){var a="000"+a,b=a.substring(a.length-4,a.length);$(".index-spl-li").each(function(a){$(this).html(b.charAt(a))})}});
