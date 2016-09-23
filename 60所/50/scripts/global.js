/**
 * 网站前端Global全局加载处理
 * @namespace Global
 */
var Global = function() {

    // private functions & variables

    // public functions
    return {

        /**
         * 判断微信访问
         */
        isWeiXin : function() {
            var url = location.href;
            if (url.indexOf("_weixin_") > -1) {
                return true;
            }
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },

        /**
         * 从URL路径字符串中提取参数值
         */
        getParameterFromUrl : function(url, name, defaultVal) {
            var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
            var arr = url.match(reg);
            if (arr) {
                return arr[2];
            }
            if (defaultVal) {
                return defaultVal;
            }
            return null;
        },

        init : function() {

        }
    }

}();