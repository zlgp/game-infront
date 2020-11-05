<template>
  <div class="uploadingGame">
    <div class="uploading_form">
      <div class="uploading_form_top">
        <h1>上传内容</h1>
      </div>
      <div class="uploading_form_content">
        <el-form
          :model="uploadingFrom"
          ref="ruleForm"
          label-width="100px"
          class="uploadingFrom"
          :rules="rules"
        >
          <el-form-item label="游戏名称:" prop="game_name" size="small">
            <el-input v-model="uploadingFrom.game_name" placeholder="(请输入游戏名称)"></el-input>
          </el-form-item>
          <el-form-item label="游戏封面:" prop="cover" class="cover">
            <p>(图片大小为264X198px)</p>
            <el-upload
              list-type="picture-card"
              drag
              :limit="1"
              action="#"
              :before-upload="beforeUpload"
              :http-request="coverUpload"
              :on-remove="coverRemove"
              name="image"
            >
              <div class="el-upload__text upload_text">
                <i class="el-icon-plus"></i>
                <br />拖拽图片到该区域内
              </div>
              <el-button class="upload_btn_1" size="small" type="success">上传文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="游戏类型:" prop="category_id">
            <el-select v-model="uploadingFrom.category_id" placeholder="请选择游戏类型">
              <el-option
                :label="item.category_name"
                :value="item.id"
                v-for="(item,index) in CategoryList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏语言:" prop="language">
            <el-select v-model="uploadingFrom.language" placeholder="请选择语言">
              <el-option label="简体中文" :value="1"></el-option>
              <el-option label="繁体中文" :value="2"></el-option>
              <el-option label="英文" :value="3"></el-option>
              <el-option label="其他" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏介绍:" prop="summary">
            <el-input
              type="textarea"
              v-model="uploadingFrom.summary"
              placeholder="(300字以内)"
              :maxlength="300"
            ></el-input>
          </el-form-item>
          <el-form-item label="故事背景:" prop="background">
            <el-input
              type="textarea"
              v-model="uploadingFrom.background"
              placeholder="(300字以内)"
              :maxlength="300"
            ></el-input>
          </el-form-item>
          <el-form-item label="游戏特色:" prop="feature">
            <el-input
              type="textarea"
              v-model="uploadingFrom.feature"
              placeholder="(300字以内)"
              :maxlength="300"
            ></el-input>
          </el-form-item>
          <el-form-item label="游戏截图:" prop="photo_urls" class="cover">
            <p>(图片大小为1650X873px)</p>
            <el-upload
              list-type="picture-card"
              drag
              action="#"
              :before-upload="beforeUpload"
              name="image"
              :http-request="picUpload"
              :on-remove="picRemove"
              :file-list="fileList"
            >
              <div class="el-upload__text upload_text">
                <i class="el-icon-plus"></i>
                <br />拖拽图片到该区域内
              </div>
              <el-button class="upload_btn_1" size="small" type="success">上传文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="配置要求:" class="deploy_item" prop="deploy">
            <p>(请根据上传文件类型编写下面内容)</p>
            <div class="deploy_msg">
              <h1>Windows文件编写</h1>
              <ul>
                <li>
                  <p>最低配置要求</p>
                </li>
                <li>
                  <span>[内存]</span>
                  <el-input v-model="uploadingFrom.ram" placeholder="8GB"></el-input>
                </li>
                <li>
                  <span>[显卡]</span>
                  <el-input v-model="uploadingFrom.gpu" placeholder="nVidia GeForce GTX 1050 3GB"></el-input>
                </li>
                <li>
                  <span>[硬盘]</span>
                  <el-input v-model="uploadingFrom.hd" placeholder="12 GB"></el-input>
                </li>
                <li>
                  <span>[CPU]</span>
                  <el-input v-model="uploadingFrom.cpu" placeholder="Intel Core i5"></el-input>
                </li>
                <li>
                  <span>[系统]</span>
                  <el-input v-model="uploadingFrom.system" placeholder="64-bit Windows 7"></el-input>
                </li>
                <li>
                  <span>[文本]</span>
                  <el-input v-model="uploadingFrom.text" placeholder="中文简体"></el-input>
                </li>
              </ul>
            </div>
            <div class="deploy_msg">
              <h1>APP文件编写</h1>
              <ul>
                <li>
                  <p>最低配置要求</p>
                </li>
                <li>
                  <span>[IOS]</span>
                  <el-input v-model="uploadingFrom.ios" placeholder="iOS 11 或以上"></el-input>
                </li>
                <li>
                  <span>[安卓]</span>
                  <el-input
                    v-model="uploadingFrom.android"
                    placeholder="Android v7.0 (Nougat OS) 或以上"
                  ></el-input>
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="上传类型:" prop="upload_type" class="uploading_type">
            <p>(请根据上传文件类型上传文件)</p>
            <br />
            <div class="upload_box">
              <el-upload
                drag
                :limit="1"
                multiple
                action="#"
                :http-request="windowUpload"
                :on-remove="windowRemove"
              >
                <div class="el-upload__text">
                  <img src="../../assets/img/center/windows_icon.png" alt />
                  <br />拖拽文件到该区域内
                </div>
                <el-button class="upload_btn" size="small" type="success">上传文件</el-button>
              </el-upload>
              <el-upload
                drag
                :limit="1"
                multiple
                action="#"
                :http-request="azUpload"
                :on-remove="azRemove"
                accept=".apk"
              >
                <div class="el-upload__text">
                  <img src="../../assets/img/center/Android_icon.png" alt />
                  <br />拖拽文件到该区域内
                </div>
                <el-button class="upload_btn" size="small" type="success">上传文件</el-button>
              </el-upload>
              <div>
                <el-checkbox v-model="ischecked">使用西蒙签名</el-checkbox>

                <el-upload
                  drag
                  :limit="1"
                  multiple
                  action="#"
                  :http-request="iosUpload"
                  :on-remove="iosRemove"
                  :beforeUpload="iosBeforeUpload"
                >
                  <div class="el-upload__text">
                    <img src="../../assets/img/center/ios_icon.png" alt />
                    <br />拖拽文件到该区域内
                  </div>
                  <el-button class="upload_btn" size="small" type="success">上传文件</el-button>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="submit">
              <button @click.prevent="upload()">全部上传</button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import apiUrl from "../../../until/baseUrl";
import axios from "axios";
import loading from "../../../until/loading";
import getMsg from "../../../until/message";
import https from "https";
export default {
  data() {
    return {
      //获取接口地址
      baseUrl: "",
      uploadingFrom: {
        game_name: "",
        cover: "",
        category_id: "",
        language: "",
        summary: "",
        background: "",
        feature: "",
        photo_urls: [],
        ram: "",
        gpu: "",
        hd: "",
        cpu: "",
        system: "",
        text: "",
        ios: "",
        android: "",
        windows_down_url: "",
        windows_game_size: "",
        android_down_url: "",
        android_game_size: "",
        ios_down_url: "",
        ios_game_size: ""
      },
      fileList: [],
      rules: {
        game_name: [
          { required: true, message: "请输入游戏名称", trigger: "blur" }
        ],
        cover: [{ required: true, message: "请上传游戏封面", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择游戏类型", trigger: "change" }
        ],
        summary: [
          { required: true, message: "请填写游戏介绍", trigger: "blur" }
        ],
        background: [
          { required: true, message: "请填写游戏背景", trigger: "blur" }
        ],
        feature: [
          { required: true, message: "请填写游戏特色", trigger: "blur" }
        ],
        photo_urls: [
          { required: true, message: "请上传游戏截图", trigger: "blur" }
        ],
        deploy: [{ required: true, message: "请填写配置", trigger: "blur" }],
        upload_type: [
          { required: true, message: "请上传类型", trigger: "blur" }
        ]
      },
      // 游戏分类
      CategoryList: [],
      token: JSON.parse(localStorage.getItem("uerInfo")).token,
      ischecked: false,
      oid: "",
      x_token: "",
      size: ""
    };
  },
  mounted() {
    // 获取不同环境下的接口地址
    this.getCategory();
    this.getAPP();
  },
  methods: {
    //获取游戏分类
    getCategory() {
      this.$http.post("game/category/index", {}).then(res => {
        let { status, message } = res.data;
        if (status == 1) {
          this.CategoryList = res.data.data.slice(1);
        }
      });
    },
    // 上传前的限制
    beforeUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!isJPG) {
      //   this.$message.error("上传游戏封面只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isLt2M;
    },
    // 游戏封面上传成功钩子
    coverUpload(file) {
      let content = file.file;
      var formData = new FormData();
      formData.append("image", content);
      axios
        .post("game/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Mon-Api-Time":
              Date.parse(new Date()) / 10 + parseInt(10 * Math.random()),
            "Mon-Api-Sign": this.$sign.getsign({
              "mon-api-time":
                Date.parse(new Date()) / 10 + parseInt(10 * Math.random())
            })
          }
        })
        .then(res => {
          let { status } = res.data;
          let { path } = res.data.data;
          if (status == 1) {
            getMsg.msg("上传成功");
            this.uploadingFrom.cover = path;
          } else {
            getMsg.msg("上传失败");
          }
        });
    },
    // 游戏封面删除的钩子
    coverRemove(file) {
      getMsg.msg("您已删除上传的图片");
      this.uploadingFrom.cover = "";
    },
    // 游戏截图(数组来的)
    picUpload(file) {
      let uid = file.file.uid;
      let content = file.file;
      var formData = new FormData();
      formData.append("image", content);
      axios
        .post("game/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Mon-Api-Time":
              Date.parse(new Date()) / 10 + parseInt(10 * Math.random()),
            "Mon-Api-Sign": this.$sign.getsign({
              "mon-api-time":
                Date.parse(new Date()) / 10 + parseInt(10 * Math.random())
            })
          }
        })
        .then(res => {
          let { status } = res.data;
          let { path } = res.data.data;
          if (status == 1) {
            getMsg.msg("上传成功");
            this.uploadingFrom.photo_urls.push({ key: uid, url: path });
          } else {
            getMsg.msg("上传失败");
          }
        });
    },
    // 游戏截图删除后
    picRemove(file) {
      this.uploadingFrom.photo_urls.forEach((element, index) => {
        if (this.uploadingFrom.photo_urls[index].key == file.uid) {
          this.uploadingFrom.photo_urls.splice(index, 1);
        }
      });
      getMsg.msg("您已删除上传的图片");
    },
    // 上传文件
    windowUpload(file) {
      loading.start("上传中");
      let content = file.file;
      var formData = new FormData();
      formData.append("file", content);
      axios
        .post("game/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Mon-Api-Time":
              Date.parse(new Date()) / 10 + parseInt(10 * Math.random()),
            "Mon-Api-Sign": this.$sign.getsign({
              "mon-api-time":
                Date.parse(new Date()) / 10 + parseInt(10 * Math.random())
            })
          }
        })
        .then(res => {
          let { status } = res.data;
          let { path, game_size } = res.data.data;
          if (status == 1) {
            loading.end();
            getMsg.msg("上传成功");
            this.uploadingFrom.windows_down_url = path;
            this.uploadingFrom.windows_game_size = game_size;
          } else {
            loading.end();
            getMsg.msg("上传失败");
          }
        });
    },
    // 删除
    windowRemove() {
      this.uploadingFrom.windows_down_url = "";
    },
    azUpload(file) {
      loading.start("上传中");
      let content = file.file;
      var formData = new FormData();
      formData.append("file", content);
      axios
        .post("game/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Mon-Api-Time":
              Date.parse(new Date()) / 10 + parseInt(10 * Math.random()),
            "Mon-Api-Sign": this.$sign.getsign({
              "mon-api-time":
                Date.parse(new Date()) / 10 + parseInt(10 * Math.random())
            })
          }
        })
        .then(res => {
          let { status } = res.data;
          let { path, game_size } = res.data.data;
          if (status == 1) {
            loading.end();
            getMsg.msg("上传成功");
            this.uploadingFrom.android_down_url = path;
            this.uploadingFrom.android_game_size = game_size;
          } else {
            loading.end();
            getMsg.msg("上传失败");
          }
        });
    },
    azRemove() {
      this.uploadingFrom.android_down_url = "";
    },
    async iosUpload(file) {
      switch (this.ischecked) {
        case false:
          await this.uploadTolocal(file);
          break;
        case true:
          await this.uploadToXm(file);
          break;
      }
    },
    getAPP() {
      this.$http.post("member/user/info", {}, this.token).then(res => {
        let { status } = res.data;
        if (status == 1) {
          this.oid = res.data.data.app_id;
          this.x_token = res.data.data.app_token;
        }
      });
    },
    iosBeforeUpload(file) {
      if (this.ischecked == true && this.oid == "") {
        getMsg.msg("请前往签名认证页面填写完签名认证,再上传文件");
        return false;
      }
    },
    // 上传到西蒙
    async uploadToXm(file) {
      loading.start("上传中");
      this.uploadingFrom.ios_game_size = file.file.size;
      // 忽略证书
      const agent = new https.Agent({
        rejectUnauthorized: false
      });
      let content = file.file;
      var formData = new FormData();
      formData.append("data", content);
      formData.append("oid", this.oid);
      await axios
        .post(
          "http://137.59.187.240/upload/ipa",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Token": this.x_token
            }
          },
          { httpsAgent: agent }
        )
        .then(res => {
          let { code } = res.data;
          let { url } = res.data.data;
          if (code == 0) {
            loading.end();
            this.uploadingFrom.ios_down_url = url;

            getMsg.msg("上传成功");
          } else {
            loading.end();
            getMsg.msg("上传失败");
          }
        });
    },
    uploadTolocal(file) {
      loading.start("上传中");
      let content = file.file;
      var formData = new FormData();
      formData.append("file", content);
      axios
        .post("game/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Mon-Api-Time":
              Date.parse(new Date()) / 10 + parseInt(10 * Math.random()),
            "Mon-Api-Sign": this.$sign.getsign({
              "mon-api-time":
                Date.parse(new Date()) / 10 + parseInt(10 * Math.random())
            })
          }
        })
        .then(res => {
          let { status } = res.data;
          let { path, game_size } = res.data.data;
          if (status == 1) {
            loading.end();
            getMsg.msg("上传成功");
            this.uploadingFrom.ios_down_url = path;
            this.uploadingFrom.ios_game_size = game_size;
          } else {
            loading.end();
            getMsg.msg("上传失败");
          }
        });
    },
    iosRemove() {
      this.uploadingFrom.ios_down_url = "";
      this.ischecked = false;
    },
    upload() {
      this.$http
        .post("member/user/uploadGame", { ...this.uploadingFrom }, this.token)
        .then(res => {
          loading.start("上传中");
          let { status } = res.data;
          if (status == 1) {
            loading.end();
            getMsg.msg("上传成功");
            this.$router.go(0);
          } else {
                loading.end();
            getMsg.msg("上传失败");
          }
        });
    }
  }
};
</script>

<style lang="less">
.uploadingGame {
  flex: 1;
  background-color: #ffffff;
  .uploading_form {
    .uploading_form_top {
      display: flex;
      height: 78px;
      align-items: center;
      justify-content: center;
      h1 {
        font-size: 18px;
        font-weight: bold;
        color: #f14027;
      }
    }
    .uploading_form_content {
      padding: 0px 30px;
      box-sizing: border-box;
      .uploadingFrom {
        .el-form-item {
          margin-bottom: 30px;
        }
        .cover {
          margin-bottom: 90px;
        }
        .deploy_item {
          .deploy_msg {
            text-align: center;
            h1 {
              font-size: 16px;
              font-weight: 400;
              color: #000000;
            }
            ul {
              li {
                display: flex;
                padding-right: 11px;
                box-sizing: border-box;
                background-color: #fff;
                border: 1px solid #f5f5f5;
                align-items: center;
                height: 41px;
                &:first-child {
                  justify-content: center;
                }
                &:nth-child(odd) {
                  background-color: #fcfcfc;
                }
                span {
                  display: inline-block;
                  width: 200px;
                  font-size: 16px;
                  font-weight: 400;
                  color: #a0a2a4;
                }
                .el-input__inner {
                  border: none;
                  border-bottom: 1px solid #dcdfe6;
                }
              }
            }
          }
        }
        .upload_box {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: flex-end;
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

        p {
          font-size: 14px;
          font-weight: 400;
          color: #f14027;
        }
      }
    }
  }
  .el-upload--picture-card {
    line-height: 0px;
  }
  .el-upload {
    width: 128px;
    height: 105px;
    .el-upload-dragger {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #f6f7fa;
      overflow: visible;
      /deep/.el-upload__text {
        font-size: 12px;
        font-weight: 400;
        color: #a7aab5;
        text-align: center;
        img {
          margin-top: 10px;
        }
      }
      .upload_text {
        margin-top: 20px;
        i {
          margin-bottom: 17px;
        }
      }
    }
  }
  .upload_btn {
    background-color: #f14027;
    border: none;
    margin-top: 30px;
  }
  .upload_btn_1 {
    background-color: #f14027;
    border: none;
    margin-top: 60px;
  }
  .el-textarea__inner {
    height: 156px;
    background-color: #f6f7fa;
    border: 0px solid #a7aab5;
  }
}
</style>