var Config = function() {

    // private functions & variables

    // public functions
    return {
        
        getServerFullContextPath : function() {
            return 'http://www.roseone.net/stu';
        },
        
        getBaiduTongjiKey : function() {
            return 'ff726038c8ada31267ce816f6422aa43';
        },

        getMobShareKey : function() {
            return 'cb081316faf8';
        },

        getShareData : function() {
            return {
                url : 'http://www.roseone.net/job2/index.html', // 分享链接
                title : '用手机赚钱，1单赚50元，过年赚5000！', // 分享标题
                description : '用手机赚钱，1单赚50元，过年赚5000！', // 分享内容
                pic : 'http://www.roseone.net/job/images/s-portrait_03.jpg' // 分享图片
            }
        }
    }
    
}();
