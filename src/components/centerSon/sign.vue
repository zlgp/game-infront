<template>
  <div class="sign">
    <div class="sign_box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="X-Token" prop="app_token" class="x_token">
          <el-input v-model="ruleForm.app_token"></el-input>
        </el-form-item>
        <el-form-item label="设备id" prop="app_id">
          <!-- <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>-->
          <el-input v-model="ruleForm.app_id"></el-input>
        </el-form-item>
        <el-form-item label="api地址" prop="app_url">
          <el-input v-model="ruleForm.app_url"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit">
            <button @click.prevent="singSubmit()">提交</button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import getMsg from "../../../until/message";
import loading from "../../../until/loading";
export default {
  data() {
    return {
      ruleForm: {
        app_token: "",
        app_id: "",
        app_url: "",
      },
      rules: {
        app_token: [
          { required: true, message: "请输入X-Toekn", trigger: "blur" }
        ],
        app_id: [
          { required: true, message: "请输入设备id", trigger: "change" }
        ],
        app_url: [
          { required: true, message: "请输入url地址", trigger: "change" }
        ]
      },
      token: JSON.parse(localStorage.getItem("uerInfo")).token
    };
  },

  mounted() {
    // Bus.$on("iosMsg", data => {
    //   console.log(data,"data");

    //   this.ruleForm.size = data;
    // });
    this.getAPP();
  },
  methods: {
    // 获取app_id等参数
    getAPP() {
      this.$http.post("member/user/info", {}, this.token).then(res => {
        let { status } = res.data;
        if (status == 1) {
          this.ruleForm.app_token = res.data.data.app_token;
          this.ruleForm.app_id = res.data.data.app_id;
          this.ruleForm.app_url = res.data.data.app_url;
        }
      });
    },
    singSubmit() {
      this.$http
        .post("member/user/saveAppInfo", { ...this.ruleForm }, this.token)
        .then(res => {
          loading.start("提交中");
          let { status } = res.data;
          if (status == 1) {
            loading.end();
            getMsg.msg("提交成功");
            this.$router.go(0);
          } else {
            loading.end();
            getMsg.msg("提交失败");
          }
        });
    }
  },
};
</script>

<style lang="less">
.sign {
  flex: 1;
  min-height: 680px;
  background-color: #fff;

  .sign_box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0px 50px;
    box-sizing: border-box;
    .el-form {
      width: 100%;
      .x_token {
        margin-bottom: 50px;
      }
      .submit {
        margin-top: 80px;
        display: flex;
        justify-content: center;
        align-content: center;
        button {
          width: 187px;
          height: 51px;
          background: #f14027;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>