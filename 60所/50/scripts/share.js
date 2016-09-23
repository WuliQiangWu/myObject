$(document).ready(function() {
    if (Global.isWeiXin()) {
        $.getJSON(Config.getServerFullContextPath() + "/m/wx/config?_=" + new Date().getTime(), {
            url : location.href
        }, function(data) {
            var cfg = {
                debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId : data.appId, // 必填，公众号的唯一标识
                timestamp : data.timestamp, // 必填，生成签名的时间戳
                nonceStr : data.noncestr, // 必填，生成签名的随机串
                signature : data.signature,// 必填，签名，见附录1
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone' ]
            };

            wx.config(cfg);

            var configShareData = Config.getShareData();
            var shareData = {
                title : configShareData.title, // 分享标题
                desc : configShareData.description, // 分享描述
                link : configShareData.url, // 分享链接
                imgUrl : configShareData.pic, // 分享图标
                type : 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl : '' // 如果type是music或video，则要提供数据链接，默认为空
            }

            shareData.complete = function() {
                setTimeout(function() {
                    $("#weixin-promot").addClass("cover");
                }, 500);
            }
            shareData.success = function(data) {
                //alert(JSON.stringify(data));
                //http://tongji.baidu.com/open/api/more?p=guide_trackPageview
                var pageURL = "/bdtj/share/weixin?ret=" + data.errMsg + "&path=" + document.location.pathname;
                _hmt.push([ '_trackPageview', pageURL ]);

                //http://tongji.baidu.com/open/api/more?p=guide_trackEvent
                _hmt.push([ '_trackEvent', 'share-weixin', 'type', data.errMsg ]);
                _hmt.push([ '_trackEvent', 'share-weixin', 'path', document.location.pathname ]);
            }

            wx.ready(function() {
                //alert(JSON.stringify(shareData));
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);
                wx.onMenuShareQZone(shareData);
            })
        });

        $("#s_btn").click(function() {
            $("#weixin-promot").removeClass("cover");
        })
        $("#weixin-promot").click(function() {
            $(this).addClass("cover");
        })
    } else {
        $("#s_btn").addClass("-mob-share-open");
        mobShare.config({
            appkey : Config.getMobShareKey(), // appkey
            params : Config.getShareData()
        });
    }
})