import Vue from 'vue'
import CryptoJS from 'crypto-js'
var keyStr = 'MonitoR6G2iLdHg4';
var IV = 'MonitoR6G2iLdHg4';
export default {//加密
    encrypt(str) {
        // keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
        var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var iv = CryptoJS.enc.Utf8.parse(IV);
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }, //秘钥必须为：8/16/32位

    //解密
    decrypt(str) {
        // keyStr = keyStr ? keyStr : 'abcdefgabcdefg12'
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var iv = CryptoJS.enc.Utf8.parse(IV);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        // return CryptoJS.enc.Utf8.stringify(decrypt).toString();
        return decrypted.toString(CryptoJS.enc.Utf8)
    }

}