<template>
  <div class="index">
    <Nav></Nav>
    <div class="banner">
      <div class="area form_box">
        <!-- 登录 -->
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-if="userInfo==null?true:false"
        >
          <h1 class="form_title">账号登录</h1>
          <el-form-item prop="account">
            <el-input v-model="loginForm.email" placeholder="请输入邮箱账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
              type="password"
              autocomplete="off"
              @blur="loginPassword()"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="Login()">登录</el-button>
          </el-form-item>
          <el-form-item class="operation">
            <ul>
              <li class="forget_password" @click="dialogForgetVisible=true">忘记密码</li>
              <li class="register" @click="dialogResigterVisible=!dialogForgetVisible">立即注册</li>
            </ul>
          </el-form-item>
        </el-form>
        <!-- 忘记密码 -->
        <el-dialog
          :visible.sync="dialogForgetVisible"
          width="440px"
          @close="ForgetClose()"
          :close-on-click-modal="false"
        >
          <el-form
            :model="forgetForm"
            :rules="rules"
            ref="ruleForm"
            label-width="auto"
            class="forget_ruleForm"
          >
            <h1 class="form_title">忘记密码</h1>
            <el-form-item prop="account" label="邮箱号" label-position="left">
              <el-input v-model="forgetForm.email" placeholder="请输入邮箱账号"></el-input>
            </el-form-item>
            <el-form-item prop="code" label-position="left" label="验证码" id="code">
              <el-input v-model="forgetForm.code" placeholder="请输入邮箱验证码"></el-input>
              <el-button class="code_btn" @click="passwordBackCode()">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="newPassword" label="新密码" label-position="left">
              <el-input
                v-model="forgetForm.password"
                placeholder="请输入新的密码"
                type="password"
                autocomplete="off"
                @blur="forgetPassword()"
              ></el-input>
            </el-form-item>
            <el-form-item prop="rePassword" label="确认密码" label-position="left">
              <el-input
                v-model="forgetForm.repassword"
                placeholder="请再次输入的密码"
                type="password"
                autocomplete="off"
                @blur="forgetRepassword()"
              ></el-input>
            </el-form-item>

            <el-button class="confim" @click="passwordBack()">确定</el-button>

            <el-form-item class="operation">
              <ul>
                <li class="forget_password">已有账号?</li>
                <li class="register" @click="dialogForgetVisible=false">立即登录</li>
              </ul>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 立即注册 -->
        <el-dialog
          :visible.sync="dialogResigterVisible"
          width="440px"
          @close="ResigterClose()"
          :close-on-click-modal="false"
        >
          <el-form
            :model="resigterForm"
            :rules="rules"
            ref="ruleForm"
            label-width="auto"
            class="forget_ruleForm"
          >
            <h1 class="form_title">注册</h1>
            <el-form-item prop="user_email" label="邮箱号" label-position="left">
              <el-input v-model="resigterForm.email" placeholder="请输入邮箱账号"></el-input>
            </el-form-item>
            <el-form-item prop="code" label-position="left" label="验证码" id="code">
              <el-input v-model="resigterForm.code" placeholder="请输入邮箱验证码"></el-input>
              <el-button class="code_btn" @click="registerCode()">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="password" label="新密码" label-position="left">
              <el-input
                v-model="resigterForm.password"
                placeholder="请输入新的密码"
                type="password"
                autocomplete="off"
                @blur="registerPassword()"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码" label-position="left">
              <el-input
                v-model="resigterForm.repassword"
                placeholder="请再次输入的密码"
                type="password"
                autocomplete="off"
                @blur="registerRepassword()"
              ></el-input>
            </el-form-item>
            <el-button class="confim" @click="register()">注册</el-button>

            <el-form-item class="operation">
              <ul>
                <li class="forget_password">已有账号?</li>
                <li class="register" @click="dialogResigterVisible=false">立即登录</li>
              </ul>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
    <!-- 精选游戏 -->
    <div class="featured area">
      <h1>精选游戏</h1>
      <ul>
        <li v-for="(item,index) in getFeaturedList" :key="index">
          <goDetail :id="item.id">
            <el-image lazy :src="item.cover">
              <div slot="error" class="image-slot">
                <img src="../../assets/img/index/default_pic.png" alt />
              </div>
            </el-image>
            <div class="game_title">{{item.game_name}}</div>
          </goDetail>
        </li>
      </ul>
    </div>
    <!-- 经典游戏 -->
    <div class="classics area">
      <h1>经典游戏</h1>
      <ul>
        <li v-for="(item,index) in getClassicsList" :key="index">
          <goDetail :id="item.id">
            <el-image lazy :src="item.cover">
              <div slot="error" class="image-slot">
                <img src="../../assets/img/index/default_horizontal_pic.png" alt />
              </div>
            </el-image>
            <div class="game_title">{{item.game_name}}</div>
          </goDetail>
        </li>
      </ul>
    </div>
    <!-- 更多选择 -->
    <div class="choose area">
      <div class="choose_box">
        <div class="choose_box_left">
          <div class="choose_box_left_title">
            <h1>更多选择</h1>
            <ul>
              <li
                v-for="(item,index) in CategoryList"
                :key="index"
                :class="{li_active:index==tagCurrent}"
                @click="categoryChange(index,item.id)"
              >{{item.category_name}}</li>
            </ul>
            <div class="choose_more">更多选择</div>
          </div>
          <div class="choose_box_left_content">
            <div v-if="ischoose">
              <ul>
                <li v-for="(item,index) in moreGamesList" :key="index">
                  <goDetail :id="item.id">
                    <el-image lazy :src="item.cover">
                      <div slot="error" class="image-slot">
                        <img src="../../assets/img/index/default_horizontal_pic.png" alt />
                      </div>
                    </el-image>
                    <div class="game_title">{{item.game_name}}</div>
                  </goDetail>
                </li>
              </ul>
            </div>
            <div class="chooseNodata">
              <noData v-if="!ischoose"></noData>
            </div>
          </div>
        </div>
        <div class="choose_box_right">
          <div class="choose_box_right_title">
            <h1>游戏下载排行</h1>
          </div>
          <div class="choose_box_right_content">
            <ul>
              <li
                v-for="(item,index) in DownRankGamesList"
                :key="index"
                :class="{rank_active:current==index}"
                @click="current=index"
              >
                <span class="order">{{index+1}}</span>
                <p class="name">{{item.game_name}}</p>
                <p class="sort">{{item.category_name}}</p>
                <goDetail :id="item.id">
                  <u>下载</u>
                </goDetail>
                <a>{{item.down_counts}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Nav from "@/nav.vue";
import Foot from "@/foot.vue";
import goDetail from "@/goDetail.vue";
import noData from "@/noData.vue";
import { mapMutations, mapState } from "vuex";
import loading from "../../../until/loading.js";
import getMsg from "../../../until/message";
export default {
  components: {
    Nav,
    Foot,
    goDetail,
    noData
  },
  data() {
    return {
      userInfo: localStorage.getItem("uerInfo"),
      // 登录
      loginForm: {
        email: "",
        password: ""
      },
      //   忘记密码
      forgetForm: {
        email: "",
        code: "",
        password: "",
        repassword: ""
      },
      //   注册
      resigterForm: {
        email: "",
        code: "",
        password: "",
        repassword: ""
      },
      rules: {
        user_email: [
          { required: true, message: "请输入邮箱账号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      //   忘记密码
      dialogForgetVisible: false,
      // 注册
      dialogResigterVisible: false,
      //   标签选择
      tagCurrent: 0,
      current: 0,
      // 游戏分类
      CategoryList: [],
      // 精选游戏
      getFeaturedList: [],
      // 获取经典游戏
      getClassicsList: [],
      // 下载排行
      DownRankGamesList: [],
      category_id: 1,
      moreGamesList: [],
      ischoose: false
    };
  },
  mounted() {
    this.getFeatured();
    this.getClassics();
    this.getCategory();
    this.getDownRankGames();
    this.getMoreChoose();
  },
  methods: {
    // 获取精选游戏
    getFeatured() {
      this.$http
        .post("games/wholeGames/selection  ", { limit: 5 })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            this.getFeaturedList = res.data.data;
          }
        });
    },
    // 获取经典游戏
    getClassics() {
      this.$http.post("games/wholeGames/classics", { limit: 8 }).then(res => {
        let { code, msg } = res.data;
        if (code == 1) {
          this.getClassicsList = res.data.data;
        }
      });
    },
    // 获取游戏的分类
    getCategory() {
      this.$http.post("games/wholeGames/classify", {}).then(res => {
        let { code, msg } = res.data;
        if (code == 1) {
          this.CategoryList = res.data.data.list;
        }
      });
    },
    // 游戏下载排行版
    getDownRankGames() {
      this.$http.post("games/wholeGames/rank", {}).then(res => {
        let { code, msg } = res.data;
        if (code == 1) {
          this.DownRankGamesList = res.data.data;
        }
      });
    },
    // 更多选择
    getMoreChoose() {
      this.$http
        .post("games/wholeGames", { category_id: this.category_id,page:1 })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            this.ischoose = true;
            this.moreGamesList = res.data.data.list;
          } else if (code == 20003) {
            this.ischoose = false;
          }
        });
    },
    async categoryChange(index, category_id) {
      this.tagCurrent = index;
      this.category_id = category_id;
      await this.getMoreChoose();
    },
    // 获取短信验证码
    getCode(email) {
      this.$http
        .post("user/register/sendEmail", {
          email: email
        })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            getMsg.msg("验证码已发送到邮箱,请注意查收");
          }
        });
    },
    // 注册的短信验证码
    registerCode() {
      this.getCode(this.resigterForm.email);
    },
    // 注册的密码加密
    registerPassword() {
      this.resigterForm.password = this.$md5(this.resigterForm.password);
    },
    // 注册的重复密码加密
    registerRepassword() {
      this.resigterForm.repassword = this.$md5(this.resigterForm.repassword);
    },
    // 注册
    register() {
      this.$http
        .post("user/register", {
          ...this.resigterForm
        })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            getMsg.msg("注册成功,请登陆");
            this.dialogResigterVisible = false;
          }
        });
    },
    ResigterClose() {
      this.resigterForm = {
        user_email: "",
        code: "",
        password: "",
        repassword: ""
      };
    },
    // 找回密码的短信验证码
    passwordBackCode() {
      this.getCode(this.forgetForm.email);
    },
    // 找回密码
    passwordBack() {
      this.$http
        .post("user/forgetPassword ", {
          ...this.forgetForm
        })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            getMsg.msg("修改密码成功");
            this.dialogForgetVisible = false;
          }
        });
    },
    ForgetClose() {
      this.forgetForm = {
        user_email: "",
        code: "",
        password: "",
        repassword: ""
      };
    },
    forgetPassword() {
      this.forgetForm.password = this.$md5(this.forgetForm.password);
    },
    forgetRepassword() {
      this.forgetForm.repassword = this.$md5(this.forgetForm.repassword);
    },
    loginPassword() {
      this.loginForm.password = this.$md5(this.loginForm.password);
    },
    Login() {
      this.$http
        .post("/user/login", {
          ...this.loginForm
        })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            // 开启loading
            loading.start("登陆中");
            // 弹出消息
            getMsg.msg(msg);
            //  刷新登录状态
            this.login(res.data.data);
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          }
        });
    },
    // 映射为this.$store.commit.login('login',{token:"1111111" })
    ...mapMutations(["login"])
    //  切换游戏类型
  },
  computed: mapState(["hasLogin", "uerInfo"])
};
</script>

<style lang="less">
.index {
  .banner {
    background: url("../../assets/img/index/banner_pic.png") no-repeat center;
    height: 620px;
    .form_box {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .demo-ruleForm {
        width: 299px;
        height: 341px;
        background-color: #f8f6f4;
        text-align: center;
        padding: 0px 20px;
        box-sizing: border-box;
        .form_title {
          font-size: 16px;
          font-weight: 700;
          color: #000000;
          margin: 30px 0px;
        }
        /deep/.el-form-item {
          .el-form-item__content {
            margin-left: 0 !important;
            .el-input {
              background-color: #fff;
            }
            .el-button {
              width: 100%;
              background-color: #f14027;
              color: #fff;
              height: 40px;
            }
            ul {
              display: flex;
              margin-top: 13px;
              .forget_password {
                font-size: 12px;
                font-weight: 400;
                color: #000000;
                flex: 1;
                cursor: pointer;
                display: flex;
                justify-content: center;
              }
              .register {
                font-size: 12px;
                font-weight: 400;
                color: #f14027;
                flex: 1;
                display: flex;
                justify-content: center;
                cursor: pointer;
              }
            }
          }
        }
      }
      .el-dialog__body {
        padding-top: 0px;
        .forget_ruleForm {
          width: 100%;
          box-sizing: border-box;
          padding: 0px 20px;
          .form_title {
            font-size: 16px;
            font-weight: 700;
            color: #000000;
            margin: 30px 0px;
            text-align: center;
          }
          .confim {
            width: 100%;
            background-color: #f14027;
            color: #fff;
            height: 40px;
            margin-top: 10px;
          }
          /deep/.el-form-item {
            .el-form-item__content {
              .el-input {
                background-color: #fff;
              }

              ul {
                display: flex;
                margin-top: 13px;
                .forget_password {
                  font-size: 12px;
                  font-weight: 400;
                  color: #000000;
                  flex: 1;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                }
                .register {
                  font-size: 12px;
                  font-weight: 400;
                  color: #f14027;
                  flex: 1;
                  display: flex;
                  justify-content: flex-start;
                  cursor: pointer;
                }
              }
            }
          }
          #code {
            /deep/.el-form-item__content {
              /deep/.el-input {
                width: 150px !important;
                margin-right: 20px;
              }
              .code_btn {
                width: 111px;
                background: #ed614e;
                color: #fff;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  //精选游戏
  .featured {
    h1 {
      font-size: 22px;
      font-weight: bold;
      color: #333333;
      margin: 60px 0px 30px 0px;
    }
    ul {
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      li {
        position: relative;
        cursor: pointer;
        width: 20%;
        .el-image {
          display: block;
          width: 220px;
          height: 264px;
        }
        .game_title {
          height: 50px;
          background: #ffffff;
          box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
          width: 220px;
          font-size: 18px;
          font-weight: 400;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          line-height: 50px;
        }
      }
    }
  }
  .classics {
    h1 {
      font-size: 22px;
      font-weight: bold;
      color: #333333;
      margin: 60px 0px 30px 0px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        position: relative;
        cursor: pointer;
        width: 25%;
        margin-bottom: 25px;
        .el-image {
          display: block;
          width: 282px;
          height: 159px;
        }
        .game_title {
          height: 50px;
          background: #ffffff;
          box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
          width: 282px;
          font-size: 18px;
          font-weight: 400;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          line-height: 50px;
        }
      }
    }
  }
  .choose {
    .choose_box {
      display: flex;
      .choose_box_left {
        width: 74%;
        position: relative;
        .choose_box_left_title {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 30px 0px;
          h1 {
            width: 94px;
            font-size: 22px;
            font-weight: bold;
            color: #333333;
            margin: 0px 90px 0px 0px;
          }
          ul {
            flex: 1;
            display: flex;

            li {
              padding: 5px;
              background-color: #ffffff;
              border-radius: 5px;
              color: #000000;
              border-radius: 5px;
              font-size: 12px;
              margin-right: 10px;
              cursor: pointer;
            }
          }
          .choose_more {
            width: 51px;
            font-size: 12px;
            font-weight: 400;
            color: #f14027;
          }
        }
        .choose_box_left_content {
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 33.333%;
              position: relative;
              cursor: pointer;
              margin-bottom: 25px;
              .el-image {
                display: block;
                width: 282px;
                height: 159px;
              }
              .game_title {
                height: 50px;
                background: #ffffff;
                box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
                width: 282px;
                font-size: 18px;
                font-weight: 400;
                color: #000000;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                line-height: 50px;
              }
            }
          }
          .chooseNodata {
            width: 100%;
            height: 100%;
          }
        }
      }
      .choose_box_right {
        flex: 1;
        margin-left: 24px;
        .choose_box_right_title {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 30px 0px;
          h1 {
            font-size: 22px;
            font-weight: bold;
            color: #333333;
            margin: 0px 90px 0px 0px;
          }
        }
        .choose_box_right_content {
          background-color: #ffffff;
          box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
          ul {
            padding: 30px 0px;
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 43px;
              border-bottom: 1px solid #eeeeee;
              padding: 0px 14px;
              cursor: pointer;
              .order {
                font-size: 12px;
                font-weight: 400;
                color: #333333;
              }
              .name {
                width: 52px;
                font-size: 12px;
                font-weight: 400;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .sort {
                font-size: 12px;
                font-weight: 400;
                color: #999999;
              }
              u {
                font-size: 12px;
                font-weight: 400;
                color: #f14027;
              }
              a {
                font-size: 12px;
                font-weight: 400;
                color: #f14027;
              }
            }
          }
        }
      }
    }
  }
  .li_active {
    background-color: #f14027 !important;
    color: #ffffff !important;
  }
  .rank_active {
    background: #f6f6f6 !important;
  }
}
</style>