$(function () {
    $("#bar-fixed").hide();

    // 轮播图时间
    $('.carousel').carousel({
        interval: 2000
    })

    //监听页面滚动条长度
    $(window).bind("scroll", function () {
        //侧边导航出现和消失
        var s_top = parseInt($(window).scrollTop());
        if (s_top >= 550 && s_top <= 3150) {
            if (!$("#bar-fixed").is(":visible")) {
                try {
                    $("#bar-fixed").slideDown();
                } catch (e) {
                    $("#bar-fixed").show();
                }
            }
        } else {
            if ($("#bar-fixed").is(":visible")) {
                try {
                    $("#bar-fixed").slideUp();
                } catch (e) {
                    $("#bar-fixed").hide();
                }
            }
        }
        const c_color = ['background:rgb(149,224,136);color: rgb(61,168,44);', 'background: rgb(173, 173, 238); color: rgb(89, 89, 200);',
            'background: rgb(255, 186, 100); color: rgb(202, 128, 0);', 'background: rgb(99, 228, 118); color: rgb(10, 179, 127);',
            'background: rgb(172, 218, 79); color: rgb(121, 173, 15);', 'background: rgb(115, 188, 224); color: rgb(50, 136, 203);',
            'background: rgb(255, 152, 152); color: rgb(220, 83, 83);', 'background: rgb(248, 198, 141); color: rgb(213, 127, 29);']
        $('.modular-bg').each(function (i) {
            if ($(document).scrollTop() > $(this).offset().top - 200) {
                $('.bar-items').attr('style', 'background: none;');
                $('#item' + i + '').attr('style', c_color[i]);
            }
        });
    });

    addcontent();
    getGoodType();
    getGoods(); 
})

// 添加内容
function addcontent() {
    const items = [{
        cate_block: [{
            cate_name: '葱姜蒜类',
            cates_items: ['韭黄', '蒜苗', '大蒜', '生姜', '大葱', '小葱', '蒜苔', '洋葱', '藠头', '洋姜']
        }, {
            cate_name: '根茎菜类',
            cates_items: ['鲜百合', '芦笋', '萝卜', '胡萝卜', '竹笋', '葛根', '魔芋', '木薯', '凉薯', '山药']
        }, {
            cate_name: '叶菜类',
            cates_items: ['白菜', '小白菜', '生菜', '苋菜', '娃娃菜', '木耳菜', '香菜', '油麦菜', '空心菜', '菠菜']
        }, {
            cate_name: '豆菜类',
            cates_items: ['毛豆', '刀豆', '四季豆', '豆角', '扁豆', '豌豆', '荷兰豆', '四棱豆', '白玉豆', '狗爪豆']
        }, {
            cate_name: '茄果菜类',
            cates_items: ['辣椒', '西红柿', '茄子', '秋葵', '鲜玉米', '玉米笋']
        }, {
            cate_name: '食用菌',
            cates_items: ['松树菌', '元蘑', '珊瑚菌', '鹿茸菇', '栗蘑', '龙爪菇', '荷灵菇', '海鲜菇', '毛尖蘑', '姬菇']
        }]
    }, {
        cate_block: [{
            cate_name: '农用机械设备',
            cates_items: ['农用拖拉机', '农机配件', '耕整机', '食品加工机械', '果蔬机械', '植保机', '饲料机', '肥料机械', '发电设备', '屠宰及肉类加工设备']
        }, {
            cate_name: '肥料',
            cates_items: ['复合肥', '缓释肥', '螯合肥料', '单质肥', '生物肥', '水溶肥', '叶面肥', '有机肥', '间接肥料', '果实着色剂']
        }, {
            cate_name: '农药',
            cates_items: ['杀虫剂', '杀菌剂', '杀螨剂', '除草剂', '生物农药', '老鼠药', '植物生长调节剂', '助剂', '农药套餐', '拌种剂']
        }, {
            cate_name: '饲料',
            cates_items: ['青绿饲料', '预混料', '宠物饲料', '饼粕饲料', '蛋白质补充饲料', '干草类饲料', '谷物饲料', '秸秆饲料', '糠麸类饲料', '矿物质饲料']
        }, {
            cate_name: '农用百货',
            cates_items: ['农用工具', '劳保用品', '硫磺粉', '保水剂', '不锈钢管', '热熔胶', '塑料膜', '护栏', '栽培基质', '活性花粉']
        }, {
            cate_name: '排灌设备',
            cates_items: ['涵管', '管材管件', '滴灌喷灌', '过滤设备', '灌溉设备', '泵', '格栅', '排水板', '蓄水板']
        }]
    }, {
        cate_block: [{
            cate_name: '食用油',
            cates_items: ['牛油果油', '山茶油', '花生油', '橄榄油', '玉米油', '菜籽油', '葵花籽油', '色拉油', '火麻油', '亚麻籽油']
        }, {
            cate_name: '调味品',
            cates_items: ['菌油', '味精', '鸡精', '糖', '醋', '酱油', '蚝油', '调味酱', '剁椒', '调味油']
        }, {
            cate_name: '香辛料',
            cates_items: ['桂子', '莳萝子', '胡椒粉', '杜松子', '百里香', '干辣椒', '辣椒粉', '胡椒', '孜然', '花椒']
        }, {
            cate_name: '谷物粉淀粉',
            cates_items: ['淀粉', '面粉', '粘米粉', '黄豆面', '燕麦粉', '马蹄粉', '高粱面粉', '玉米面', '豆面', '红豆粉']
        }, {
            cate_name: '豆制品',
            cates_items: ['霉豆渣', '豆豉', '豆腐', '香干', '腐乳', '千张', '兰花干', '素鸡', '腐竹', '豆腐皮']
        }, {
            cate_name: '面食米食',
            cates_items: ['饽饽', '凉糕', '肠粉', '锅贴', '西米', '馒头', '焖子', '面条', '饺子', '汤圆']
        }]
    }, {
        cate_block: [{
            cate_name: '水果种苗',
            cates_items: ['姑娘果苗', '荸荠种苗', '猴脑果苗', '苹果树苗', '梨树苗', '西瓜苗', '猕猴桃苗', '桃树苗', '柑桔苗', '柚树苗']
        }, {
            cate_name: '花草类种子',
            cates_items: ['缬草种子', '阿米芹种子', '彩叶草种子', '蓝刺头种子', '六倍利种子', '凤仙花种子', '菖蒲种子', '福寿花种子', '剑麻种子', '稗子种子']
        }, {
            cate_name: '蔬菜种子',
            cates_items: ['碱蓬草种子', '小根蒜种子', '山葵种子', '豆瓣菜种子', '豆角种子', '花椒种子', '香菜种子', '荠菜种子', '韭菜种子', '苦苣种子']
        }, {
            cate_name: '水果类种子',
            cates_items: ['嘉宝果种子', '刺梨种子', '人参果种子', '菠萝蜜种子', '芒果种子', '柠檬种子', '蓝莓种子', '李子种子', '柿子种子', '猕猴桃种子']
        }, {
            cate_name: '粮油类种子',
            cates_items: ['薏米种子', '油葵种子', '花生种子', '高粱种子', '油菜籽种子', '小麦种子', '藜麦种子', '黄豆种子', '蓖麻种子', '大麦种子']
        }, {
            cate_name: '苗木类种子',
            cates_items: ['厚朴种子', '葛藤种子', '桉树种子', '马桑种子', '车桑子种子', '刨花润楠种子', '无患子种子', '九里香种子', '花楸种子']
        }]
    }, {
        cate_block: [{
            cate_name: '干果坚果',
            cates_items: ['柿饼', '红枣', '枸杞', '核桃', '瓜子', '板栗', '葡萄干', '桂圆干', '山楂干', '白果']
        }, {
            cate_name: '茶叶',
            cates_items: ['黑茶', '普洱', '乌龙茶', '绿茶', '红茶', '花草茶', '黄茶', '白茶', '茶粉']
        }, {
            cate_name: '肉制品加工',
            cates_items: ['熟羊肉', '火腿', '腊肉', '板鸭', '肉卷', '腌/咸鸭', '腌/咸肉', '腌/咸鹅', '腌/咸鸡', '烧鸡']
        }, {
            cate_name: '水产加工',
            cates_items: ['籽乌干', '章鱼干', '鱼鳞干', '鱿鱼干', '腌/咸螺', '蚬子干', '腌/咸鱼', '虾仁', '虾皮', '虾干']
        }, {
            cate_name: '营养滋补',
            cates_items: ['蜂蜜', '花粉', '桃胶', '雪燕', '皂角米', '鱼鳔', '蜂王浆']
        }, {
            cate_name: '速食品',
            cates_items: ['速冻蔬果', '饼干糕点', '蜜饯果脯', '休闲零食', '罐头', '方便食品', '糖果', '丸滑类', '冲饮']
        }]
    }, {
        cate_block: [{
            cate_name: '水产种苗',
            cates_items: ['鱼苗', '甲鱼苗', '虾苗', '蟹苗', '蛙苗', '蚝苗', '龟苗', '螺苗', '海参苗']
        }, {
            cate_name: '虾类',
            cates_items: ['对虾', '小龙虾', '基围虾', '米虾', '龙虾', '青虾', '皮皮虾', '牡丹虾', '蝼蛄虾', '蛎虾']
        }, {
            cate_name: '贝类',
            cates_items: ['生蚝', '珍珠贝', '鲍鱼', '蚌', '扇贝', '淡水螺', '蛤蜊', '蛏子', '青口', '海鲜礼盒装']
        }, {
            cate_name: '食用鱼类',
            cates_items: ['鲈鱼', '鲤鱼', '泥鳅', '银鱼', '草鱼', '黄鳝', '青鱼', '鲫鱼', '鲢鱼', '鲶鱼']
        }, {
            cate_name: '蟹类',
            cates_items: ['大闸蟹', '梭子蟹', '青蟹', '招潮蟹', '石蟹', '珍宝蟹', '长脚蟹', '岩头蟹', '雪蟹', '香槟蟹']
        }, {
            cate_name: '软体类',
            cates_items: ['墨鱼', '鱿鱼', '海蜇', '海参', '泥丁', '泥螺', '沙虫', '章鱼', '蚂蟥', '海肠']
        }]
    }, {
        cate_block: [{
            cate_name: '热带水果',
            cates_items: ['芒果', '荔枝', '龙眼', '菠萝', '火龙果', '香蕉', '榴莲', '木瓜', '莲雾', '山竹']
        }, {
            cate_name: '柑橘类',
            cates_items: ['柠檬', '柑桔', '金桔', '橙子', '柚子']
        }, {
            cate_name: '浆果类',
            cates_items: ['葡萄', '草莓', '树莓', '圣女果', '桑葚', '蓝莓', '黑果花楸果', '猕猴桃', '柿子', '百香果']
        }, {
            cate_name: '瓜果类',
            cates_items: ['西瓜', '甜瓜', '哈密瓜', '八月瓜', '火参果', '九月瓜', '地稍瓜']
        }, {
            cate_name: '核果仁果类',
            cates_items: ['苹果', '梨', '山楂', '沙果', '李子', '鲜枣', '杏', '杨梅', '青梅', '蜜桃']
        }]
    }, {
        cate_block: [{
            cate_name: '禽畜苗',
            cates_items: ['鸡苗', '鸭苗', '鹅苗', '猪苗', '鸵鸟苗', '土元苗', '鸸鹋苗', '鹧鸪苗', '豆虫苗', '鹌鹑苗']
        }, {
            cate_name: '肉类',
            cates_items: ['特种肉', '鸡副产品', '鸭副产品', '鹅副产品', '猪副产品', '牛副产品', '羊副产品', '特种副产品', '猪肉', '牛肉']
        }, {
            cate_name: '蛋类',
            cates_items: ['鸡蛋', '鸭蛋', '鹌鹑蛋', '鹅蛋', '鸽子蛋', '皮蛋', '咸蛋', '特种蛋', '甲鱼蛋', '种蛋']
        }, {
            cate_name: '活畜',
            cates_items: ['牛', '羊', '生猪', '马', '狗', '驴', '骡', '兔子', '猫', '骆驼']
        }, {
            cate_name: '活禽',
            cates_items: ['鸡', '鸭', '鹅', '鸽子', '鹧鸪', '鹌鹑']
        }, {
            cate_name: '特种类',
            cates_items: ['鹿', '貉子人工驯繁', '蜗牛', '娃娃鱼', '鳄鱼', '鳄鱼苗', '孔雀', '黑天鹅', '鬃狮蜥', '豹纹守宫']
        }]
    }]
}

var layer = layui.layer

// 获取数据库商品类型信息
function getGoodType() {
    $.ajax({
        method: 'GET',
        url: '/api/goodtype',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取商品类型失败！')
            }
            datahandle(res.data);
        }
    })
}

// 处理商品类型数据并渲染到页面上
function datahandle(data) {
    const imgpath = ['sgzw.png', 'sczw.png', 'qcrd.png', 'shuic.png', 'nfjg.png', 'lymm.png', 'zzzm.png', 'mmhc.png']
    const goodsTpye = []
    for (var i = 0; i < 8; i++) {
        goodsTpye.push({
            fatherType: data[0][i].typename,
            fTypeimg: 'https://files.cnhnb.com/pc/home/cate-' + imgpath[i],
            sonType: [],
        })
        for (var j = 0; j < 4; j++) {
            goodsTpye[i].sonType[j] = data[i + 1][j].typename
        }
    }
    $.each(goodsTpye, function (i, items) {
        $('.category-bg').append(
            '<div class="first-item"><a href="/p/sgzw/" target="_blank" class="o-line"><img alt="" class="cate-icon" src="' + goodsTpye[i].fTypeimg + '" lazy="loaded">' + goodsTpye[i].fatherType + '</a><div class="t-line ' + i + '"></div></div>'
        )
        $.each(items.sonType, function (j, k) {
            $('.' + i + '').append('<a href="#" target="_blank" class="second-cate" data-v-a3d08352="">' + k + '</a>')
        })
    })
}
//获取商品信息
function getGoods() {
    $.ajax({
        method: 'GET',
        url: '/api/goods',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取商品失败！')
            }
            // console.log(res.data);
        }
    })
}
