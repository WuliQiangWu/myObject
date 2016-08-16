/**
 * Created by pc on 2016/8/5.
 */
window.onload=function(){
    $(document).ready(function(){
        $("#_table tr td").mouseover(function(){
            $(this).parent().find("td").css("background-color","#85cfda");
        });
    });
    /* 当鼠标在表格上移动时，离开的那一行背景恢复 */
    $(document).ready(function(){
        $("#_table tr td").mouseout(function(){
            var bgc = $(this).parent().attr("bg");
            $(this).parent().find("td").css("background-color",bgc);
        });
    });

    $(document).ready(function(){
        var color="#edf5f6"
        $("#_table tr:even td").css("background-color",color);  //改变偶数行背景色
        /* 把背景色保存到属性中 */
        $("#_table tr:odd").attr("bg",color);
        $("#_table tr:even").attr("bg","#fff");
    })
};

//下拉列表
function selectDown(select,icon,list){
    function changeUp(){
        $(list).slideUp();
        $(icon).removeClass('iconchange');
        $(select).css({backgroundColor:'#fff'});
        $(select).addClass('border');
        tf=false;
    }
    var tf=false;
    $(select).on('click',function(){
        tf=!tf;
        if(tf){
            this.style.backgroundColor='#ffffff';
            $(list).slideDown();
            $(icon).addClass('iconchange');
            $(this).removeClass('border');
        }else{
            this.style.backgroundColor='#fff';
            $(list).slideUp();
            $(icon).removeClass('iconchange');
            $(this).addClass('border');
        }

    });

    var _p = $('.border p');
    var aLi=$(list).children();
    aLi.on('click',function(ev){
        var value= _p.html();
        var index=aLi.index(this);
        var val=aLi.eq(index).html();
        $('.select').children('p').html(val);
        aLi.eq(index).html(value);
        changeUp();
        return false;
    })
}
selectDown('.select','.icon','.list');
//点击去掉input里面的值
$(document).ready(function(){
    $("input").focus(function(){
        var input_txt=$(this).val();
        if(input_txt==this.defaultValue){
            $(this).val("");
        }
    });
    $('input').blur(function(){
        var input_txt=$(this).val();
        if(input_txt==""){
            $(this).val(this.defaultValue);
        }
    })
})