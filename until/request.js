import vue from "vue"
import axios from "axios"
import { Message } from 'element-ui';
import router from "../src/router/index"
import store from "../src/store/index"


// axios.defaults.baseURL = process.env.NODE_ENV=='development'?"/api":"http://api.book.hyahm.com"
axios.defaults.baseURL = process.env.VUE_APP_BASEURL


const version = "1.0.0";
const did = "jK5d76g2Hg4";
const type = "h5";
// 统一设置请求头参数
axios.defaults.headers.common["Mon-Api-Version"] = version;
axios.defaults.headers.common["Mon-Api-Did"] = did;
axios.defaults.headers.common["Mon-Device-Type"] = type;

export default {
    post: (url, params, access_token) => {
        return new Promise((reslove, reject) => {
            axios.post(url, params, {
                headers: {
                    "Authorization": access_token,
                    "Mon-Api-Time":
                        Date.parse(new Date()) / 10 + parseInt(10 * Math.random()),
                    "Mon-Api-Sign": vue.prototype.$sign.getsign({
                        "mon-api-time":
                            Date.parse(new Date()) / 10 + parseInt(10 * Math.random())
                    })
                }
            }).then(res => {


                switch (res.data.code) {
                    case 1:
                        // 返回
                        reslove({
                            data: res.data,
                        })
                        break;
                    case 0:
                        Message.error({
                            message: res.data.msg,
                        });
                        reslove({
                            // 看返回的结果
                            data: res.data,
                        })
                        break;
                    case 20003:
                        Message.error({
                            message: res.data.msg,
                        });
                        reslove({
                            // 看返回的结果
                            data: res.data,
                        })
                        break;
                    case -99:
                        Message.error({
                            message: "token过期,请重新登录"
                        });
                        router.push("/index")
                        store.commit("logout")
                        break;
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
}