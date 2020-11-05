import Vue from 'vue'
import utils from "../until/Crypto";
export default {
    // 传时间戳就好了
    getsign: (time) => {
        let argument={
            "mon-api-did":"jK5d76g2Hg4",
            "mon-api-version":"1.0.0",
            "mon-device-type":"h5",
        }
        // 合并对象
        let newArgument=Object.assign(time,argument)
        // 排序的函数
        function objKeySort(newArgument) {
            //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            var newkey = Object.keys(newArgument).sort();
            var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
            for (var i = 0; i < newkey.length; i++) {
                //遍历newkey数组
                newObj[newkey[i]] = newArgument[newkey[i]];
                //向新创建的对象中按照排好的顺序依次增加键值对
            }
            return newObj; //返回排好序的新对象
        }
        var jsonstr = JSON.stringify(objKeySort(newArgument));
        // new RegExp捡索 "g"相当于全局的意思,不加只匹配到第一个
        var str1 = jsonstr.replace(new RegExp(':', 'g'), '=');

        var str2 = str1.replace(new RegExp(',', 'g'), '&');
        // substring提取介于俩个下标之前的字符串
        var str3 = str2.substring(1, str2.length - 1);
        var str4 = str3.replace(/\"/g, '')
        // 加密
        const encode_sign = utils.encrypt(str4, "kaisa6aG2iLsdHg4");
        return encode_sign
    }
}