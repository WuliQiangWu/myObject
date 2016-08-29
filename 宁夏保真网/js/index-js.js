/**
 * Created by pc on 2016/8/26.
 */
window.onload=function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        autoplay: 2500,
        loop: true,
        effect: 'fade'
    });
}