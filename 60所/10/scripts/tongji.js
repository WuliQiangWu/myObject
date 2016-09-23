var _hmt = _hmt || [];

var getParameterFromUrl = function(url, name, defaultVal) {
    var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
    var arr = url.match(reg);
    if (arr) {
        return decodeURI(arr[2]);
    }
    if (defaultVal) {
        return defaultVal;
    }
    return null;
}

var source = getParameterFromUrl(location.href, "source", "undefined");
//console.log(source);
_hmt.push([ '_setCustomVar', 1, 'source', source, 3 ]);

(function() {
    var hm = document.createElement("script");
    //hm_baidu_key在config.js中定义
    hm.src = "//hm.baidu.com/hm.js?" + Config.getBaiduTongjiKey();
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();