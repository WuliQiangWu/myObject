/**
 * Created by pc on 2016/9/20.
 */
'use strict';
window.onload= function(){

    (function(){
        var ordList=document.getElementsByClassName('ord-list')[0];
        //console.log(ordList);
        var oList=ordList.getElementsByTagName('li');
        for(var i=0;i<oList.length;i++){
            oList[i].index=i;
            if(i%2==0){
                oList[i].style.backgroundColor="#fff";
            }
            else{
                oList[i].style.backgroundColor="#f4f4f4";
            }
        }
    })()
};
