/*var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical',
    nextButton : '.arrowdiv'
});*/
var mySwiper = new Swiper('.swiper-container', {
    direction : 'vertical',
    loop : false,
    mousewheelControl : true,
    nextButton : '.arrowdiv'
});
$(".About").click(function() {
    $(".index_2_popups").css("display", "block")
})
/*歌曲*/
// $("#media").get(0).play();
var audioStatus = "mp31";
$("#media").on("playing", function() {
    $("#audio_btn").removeClass().addClass("on");
    document.cookie = "mp3=on;path=/;";
});
$("#media").on("pause", function() {
    $("#audio_btn").removeClass().addClass("off");
    document.cookie = "mp3=off;path=/;";
});

$("#audio_btn").on("click", function() {
    if ($(this).hasClass("on")) {
        $("#media").get(0).pause();

    } else {
        $("#media").get(0).play();
    }

    $(this).toggleClass("on off");
    return false;
});