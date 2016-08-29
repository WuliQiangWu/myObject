/**
 * Created by pc on 2016/8/27.
 */
+function(){
   $('btn').click(function(){
       $.get('text.php',{
           userName:$('#user').html(),
           userAge:$('#age').html()
       },
       function(data,textStatus){
           var userName = $(data)
       })
   })
}()