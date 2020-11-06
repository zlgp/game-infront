<template>
  <div>
    <div class="center">
      <Nav></Nav>
      <div class="center_content area">
        <div class="center_content_left">
          <div class="center_content_left_top">
            <div class="avatar">
              <el-avatar :size="40" src>
                <img src="../../assets/img/center/Avatar_icon.png" />
              </el-avatar>
            </div>
            <p class="username">liao</p>
            <button class="outlogin" @click="outLoing()">退出</button>
          </div>
          <div class="center_content_left_bottom">
            <el-menu
              :default-active="current"
              class="el-menu-vertical-demo"
              active-text-color="#F14027"
              @select="select"
            >
              <el-menu-item index="0">
                <span slot="title">上传的游戏</span>
              </el-menu-item>
              <el-menu-item index="1">
                <span slot="title">上传游戏</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <span>签名认证</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">西蒙</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </div>
        <!-- 上传的游戏 -->
        <GameList v-if="current=='0'"></GameList>
        <Uploading v-if="current=='1'"></Uploading>
        <sign v-if="current=='1-1'"></sign>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Nav from "@/nav.vue";
import Foot from "@/foot.vue";
import GameList from "@/centerSon/gameList.vue";
import Uploading from "@/centerSon/uploadingGame.vue";
import sign from "@/centerSon/sign.vue";
import { mapMutations } from "vuex";
import getMsg from "../../../until/message";
export default {
  components: {
    Nav,
    Foot,
    GameList,
    Uploading,
    sign
  },
  data() {
    return {
      choose_list: ["上传的游戏", "上传游戏", "签名认证"],
      sing_place: ["西蒙"],
      current: "0",
      token: JSON.parse(localStorage.getItem("uerInfo")).token
    };
  },
  methods: {
    select(index) {
      this.current = index;
    },
    outLoing() {
      this.logout();
      this.$router.push("/index");
      // this.$http
      //   .post("member/logout/index", {}, "Bearer " + this.token)
      //   .then(res => {
      //     let { status } = res.data;
      //     if (status == 1) {
      //       getMsg.msg("退出成功");
      //       this.logout();
      //       this.$router.push("/index");
      //     }
      //   });
    },
    ...mapMutations(["logout"])
  }
};
</script>

<style lang="less">
.center {
  min-height: 100vh;
  .center_content {
    margin-top: 60px;
    display: flex;
    .center_content_left {
      width: 24%;
      margin-right: 25px;
      .center_content_left_top {
        height: 238px;
        background: #ffffff;
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
        // display: flex;
        // justify-content: center;
        text-align: center;
        overflow: hidden;
        .avatar {
          margin-top: 30px;
        }
        .username {
          margin: 24px 0px 69px 0px;
        }
        .outlogin {
          width: 142px;
          height: 31px;
          background: #f14027;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .center_content_left_bottom {
      height: 413px;
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
      margin-top: 30px;
      overflow: hidden;
      .el-menu {
        // margin-top: 51px;
        li {
          text-align: center;
        }
      }
    }
  }

  .center_active {
    background-color: #eeeeee !important;
    color: #f14027 !important;
  }
  .son_li_active {
    color: #f14027 !important;
  }
}
</style>