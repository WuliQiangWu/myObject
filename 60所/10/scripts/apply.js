
$(function() {
    $("#schoolName").autocomplete({
        source : function(request, response) {
            $.ajax({
                url : "http://wlftest-api.chinacloudapp.cn/university/query",
                dataType : "jsonp",
                data : {
                    k : request.term
                },
                success : function(data) {
                    response($.map(data, function(item) {
                        return {
                            label : item.Name,
                            value : item.Name,
                            id : item.ID
                        }
                    }));
                }
            });
        },
        minLength : 0,
        select : function(event, ui) {
            $("#schoolId").val(ui.item.id);
        }
    });

    $("#weChatPhotoUploadFile").change(function() {
        var file = $(this).val();
        if (file && file.length > 0) {
            var fileName = file.split('\\');
            var fileName = fileName[fileName.length - 1];
            $("#fileName").val(fileName).removeClass("aply-ulfr-covr aply-ulfr-codt");
        }
    });

    $("input, select").blur(function() {
        validateElement($(this).attr("id"));
    });

    $("#submitId").click(function() {
        var nameFlag = validateElement("trueName");
        if (!nameFlag) {
            return nameFlag;
        }

        var schoolFlag = validateElement("schoolName");
        if (!schoolFlag) {
            return schoolFlag;
        }

        var schoolIdFlag = validateElement("schoolId");
        if (!schoolIdFlag) {
            return schoolIdFlag;
        }

        var educationFlag = validateElement("educationLevel");
        if (!educationFlag) {
            return educationFlag;
        }

        var enrolYearFlag = validateElement("enrolYear");
        if (!enrolYearFlag) {
            return enrolYearFlag;
        }

        var mobileFlag = validateElement("mobile");
        if (!mobileFlag) {
            return mobileFlag;
        }

        var idCardNoFlag = validateElement("idCardNo");
        if (!idCardNoFlag) {
            return idCardNoFlag;
        }

        var weChatPhotoFlag = validateElement("weChatPhoto");
        if (!weChatPhotoFlag) {
            return weChatPhotoFlag;
        }
        
        $("#loading-wait").toggleClass("cover");
        $("#StudentForm").submit();
        return false;
    });

    function validateElement(elementId) {
        var message = {};
        if (elementId == 'trueName') {
            message = {
                'require' : '姓名不能为空',
                'minLength' : "姓名长度不能小于1",
                'maxLength' : '姓名长度不能大于8'
            }
        } else if (elementId == 'schoolName' || elementId == 'schoolId') {
            message = {
                'require' : '请输入并选择学校'
            }
        } else if (elementId == 'educationLevel') {
            message = {
                'require' : '请选择学历'
            }
        } else if (elementId == 'enrolYear') {
            message = {
                'require' : '请选择入学年份'
            }
        } else if (elementId == 'mobile') {
            message = {
                'require' : '手机号不能为空',
                'mobile' : '请输入有效的手机号'
            }
        } else if (elementId == 'idCardNo') {
            message = {
                'require' : '身份证不能为空',
                'idCardNo' : '请输入有效的身份证'
            }
        } else if (elementId == 'weChatPhoto') {
            message = {
                'require' : '请上传微信截图'
            }
        }

        var $iconElement = $('<input type="text" class="aply-mil-hint" readonly="readonly">');
        var $infoElement = $(".hint");
        var $element = $("#" + elementId);
        var value = $element.val();

        //require="true" 验证必填
        if ($element.attr("require") == 'true') {
            if (elementId == 'schoolId') {
                var $targetElement = $("#schoolName");
                if (value == '') {
                    if ($targetElement.next().size() == 0) {
                        $targetElement.after($iconElement.clone());
                    }
                    $infoElement.html(message['require']);
                    return false;
                } else {
                    $targetElement.next().remove();
                    $infoElement.html("");
                }
            } else if (elementId == 'weChatPhoto') {
                var $targetElement = $("#aply-uccj");
                if (value == '') {
                    if ($targetElement.next().size() == 0) {
                        $targetElement.after($iconElement.clone());
                    }
                    $infoElement.html(message['require']);
                    return false;
                } else {
                    $targetElement.next().remove();
                    $infoElement.html("");
                }
            } else {
                if (value == '') {
                    if ($element.next().size() == 0) {
                        $element.after($iconElement.clone());
                    }
                    $infoElement.html(message['require']);
                    return false;
                } else {
                    $element.next().remove();
                    $infoElement.html("");
                }
            }
        }

        //data-mobile="true" 验证手机号
        if ($element.data("mobile")) {
            var reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                if ($element.next().size() == 0) {
                    $element.after($iconElement.clone());
                }
                $infoElement.html(message['mobile']);
                return false;
            } else {
                $element.next().remove();
                $infoElement.html("");
            }
        }

        //data-idcardno="true" 验证身份证
        if ($element.data("idcardno")) {
            if (!idCardNoUtil.checkIdCardNo(value)) {
                if ($element.next().size() == 0) {
                    $element.after($iconElement.clone());
                }
                $infoElement.html(message['idCardNo']);
                return false;
            } else {
                $element.next().remove();
                $infoElement.html("");
            }
        }

        //data-digits="true" 验证正整数
        if ($element.data("digits")) {
            var reg = /^[1-9]+[0-9]*]*$/;
            console.log(reg.test(value));
            if (!reg.test(value)) {
                if ($element.next().size() == 0) {
                    $element.after($iconElement.clone());
                }
                $infoElement.html(message['digits']);
                return false;
            } else {
                $element.next().remove();
                $infoElement.html("");
            }
        }

        //data-min="200" 验证最小值
        if ($element.data("min")) {
            var min = $element.data("min");
            if (min > value) {
                if ($element.next().size() == 0) {
                    $element.after($iconElement.clone());
                }
                $infoElement.html(message['min']);
                return false;
            } else {
                $element.next().remove();
                $infoElement.html("");
            }
        }

        //data-minlength="2" 验证最小长度
        console.log($element.data("minlength"));
        if ($element.data("minlength")) {
            var minLength = $element.data("minlength");
            if (minLength > value.length) {
                if ($element.next().size() == 0) {
                    $element.after($iconElement.clone());
                }
                $infoElement.html(message['minLength']);
                return false;
            } else {
                $element.next().remove();
                $infoElement.html("");
            }
        }

        //data-maxLength="8" 验证最大长度
        if ($element.data("maxlength")) {
            var maxLength = $element.data("maxlength");
            if (maxLength < value.length) {
                if ($element.next().size() == 0) {
                    $element.after($iconElement.clone());
                }
                $infoElement.html(message['maxLength']);
                return false;
            } else {
                $element.next().remove();
                $infoElement.html("");
            }
        }

        return true;
    }
})

var idCardNoUtil = {
    /* 省,直辖市代码表 */
    provinceAndCitys : {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙古",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙江",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        99 : "其他"
    },

    /* 每位加权因子 */
    powers : [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" ],

    /* 第18位校检码 */
    parityBit : [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ],

    /* 性别 */
    genders : {
        male : "男",
        female : "女"
    },

    /* 校验地址码 */
    checkAddressCode : function(addressCode) {
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check)
            return false;
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
            return true;
        } else {
            return false;
        }
    },

    /* 校验日期码 */
    checkBirthDayCode : function(birDayCode) {
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check)
            return false;
        var yyyy = parseInt(birDayCode.substring(0, 4), 10);
        var mm = parseInt(birDayCode.substring(4, 6), 10);
        var dd = parseInt(birDayCode.substring(6), 10);
        var xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false;// 生日不能大于当前日期
        } else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
            return true;
        } else {
            return false;
        }
    },

    /* 计算校检码 */
    getParityBit : function(idCardNo) {
        var id17 = idCardNo.substring(0, 17);
        /* 加权 */
        var power = 0;
        for (var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
        }
        /* 取模 */
        var mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },

    /* 验证校检码 */
    checkParityBit : function(idCardNo) {
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },

    /* 校验15位或18位的身份证号码 */
    checkIdCardNo : function(idCardNo) {
        // 15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if (!check)
            return false;
        // 判断长度为15位或18位
        if (idCardNo.length == 18) {
            return idCardNoUtil.check18IdCardNo(idCardNo);
        } else {
            return false;
        }
    },

    // 校验18位的身份证号码
    check18IdCardNo : function(idCardNo) {
        // 18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check)
            return false;
        // 校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check)
            return false;
        // 校验日期码
        var birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check)
            return false;
        // 验证校检码
        // return idCardNoUtil.checkParityBit(idCardNo);
        return check;
    }
};