<template>
  <div class="detail">
    <Nav></Nav>
    <div class="area detail_box">
      <div class="detail_nav">首页&nbsp;&nbsp;>&nbsp;&nbsp;详情</div>
      <div class="detail_download">
        <div class="detail_download_left">
          <div class="detail_download_left_top">
            <div>
              <el-image :src="detailObj.cover">
                <div slot="error" class="image-slot">
                  <img src="../../assets/img/detail/Details_default_pic.png" alt />
                </div>
              </el-image>
            </div>
            <div class="detail_msg">
              <h1>{{detailObj.game_name}}</h1>
              <p>
                游戏类型：
                <span>{{detailObj.category_name}}</span>
              </p>
              <p>
                游戏语言:
                <span>{{detailObj.language}}</span>
              </p>
              <p>
                游戏大小：
                <span>{{detailObj.game_size}}</span>
              </p>
              <p>
                上传时间：
                <span>{{detailObj.create_time}}</span>
              </p>
              <div class="load_way">
                <a
                  :href="detailObj.window_file"
                  v-if="detailObj.window_file!=''"
                  :download="detailObj.window_file"
                  @click="download()"
                >
                  <button>
                    <img src="../../assets/img/detail/windows_icon.png" alt />
                    windows下载
                  </button>
                </a>
                <a
                  :href="detailObj.az_file"
                  v-if="detailObj.az_file!=''"
                  :download="detailObj.az_file"
                  @click="download()"
                >
                  <button>
                    <img src="../../assets/img/detail/Android_icon.png" alt />
                    安卓下载
                  </button>
                </a>
                <a
                  :href="detailObj.ios_file"
                  v-if="detailObj.ios_file!=''"
                  :download="detailObj.ios_file"
                  @click="download()"
                >
                  <button>
                    <img src="../../assets/img/detail/ios_icon.png" alt />
                    ios下载
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div class="detail_download_left_content">
            <div class="detail_download_title">
              <p class="line"></p>
              <h1>游戏截图</h1>
            </div>
            <div class>
              <el-carousel indicator-position="outside">
                <el-carousel-item v-for="(item,index) in detailObj.game_pic" :key="index">
                  <img :src="item" alt />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="detail_download_title">
              <p class="line"></p>
              <h1>游戏介绍</h1>
            </div>
            <div class="recommend">{{detailObj.game_intr}}</div>
            <div class="detail_download_title">
              <p class="line"></p>
              <h1>故事背景</h1>
            </div>
            <div class="bg">{{detailObj.game_bag}}</div>
            <div class="detail_download_title">
              <p class="line"></p>
              <h1>游戏特色</h1>
            </div>
            <div class="special">{{detailObj.game_fea}}</div>
            <div v-if="windows!=''">
              <div class="detail_download_title">
                <p class="line"></p>
                <h1>配置要求</h1>
              </div>
              <div class="deploy">
                <ul>
                  <li>
                    <p>最低配置要求</p>
                  </li>
                  <li>
                    <span>[内存]</span>
                    <p>{{windows.ram}}</p>
                  </li>
                  <li>
                    <span>[显卡]</span>
                    <p>{{windows.gpu}}</p>
                  </li>
                  <li>
                    <span>[硬盘]</span>
                    <p>{{windows.hd}}</p>
                  </li>
                  <li>
                    <span>[CPU]</span>
                    <p>{{windows.cpu}}</p>
                  </li>
                  <li>
                    <span>[系统]</span>
                    <p>{{windows.system}}</p>
                  </li>
                  <li>
                    <span>[文本]</span>
                    <p>{{windows.text}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="app!=''">
              <div class="detail_download_title" style="margin-top:30px">
                <p class="line"></p>
                <h1>配置要求</h1>
              </div>
              <div class="deploy">
                <ul>
                  <li>
                    <p>最低配置要求</p>
                  </li>
                  <li>
                    <span>[IOS]</span>
                    <p>{{app.ios}}</p>
                  </li>
                  <li>
                    <span>[安卓]</span>
                    <p>{{app.az}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="detail_download_title" style="margin-top:50px">
              <p class="line"></p>
              <h1>评论</h1>
            </div>
            <div class="comment">
              <textarea
                name
                id
                cols="30"
                rows="10"
                class="comment_box"
                placeholder="请填写评论"
                v-model="content"
              ></textarea>
              <button @click="referComment()">提交评论</button>
            </div>
            <div class="comment_box">
              <div v-if="commentListData.length!=0">
                <ul
                  class="infinite-list"
                  v-infinite-scroll="load"
                  style="overflow:auto"
                  :infinite-scroll-disabled="disabled"
                >
                  <li
                    v-for="(item,index) in commentListData"
                    :key="index"
                    class="infinite-list-item"
                  >
                    <div class="userInfo_box">
                      <div>
                        <img :src="item.header_image" alt />
                        <span>{{item.comment_name}}</span>
                      </div>
                      <span>{{item.create_time}}</span>
                    </div>
                    <p>{{item.content}}</p>
                    <a class="el-icon-thumb" title="点赞" @click="giveLike(item.comment_id)"></a>
                    <i>({{item.vote_nums}})</i>
                  </li>
                </ul>
              </div>
              <div v-if="commentListData.length==0" class="nocomment">暂无评论</div>
            </div>
          </div>
        </div>
        <div class="detail_download_right">
          <div class="detail_download_title">
            <p class="line"></p>
            <h1>猜你喜欢</h1>
          </div>
          <div>
            <ul>
              <li v-for="(item,index) in LikeGamesList" :key="index">
                <!-- <goDetail :id="item.id"> -->
                <el-image lazy :src="item.cover">
                  <div slot="error" class="image-slot">
                    <img src="../../assets/img/index/default_horizontal_pic.png" alt />
                  </div>
                </el-image>
                <div class="game_title">{{item.game_name}}</div>
                <!-- </goDetail> -->
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
import loading from "../../../until/loading.js";
import getMsg from "../../../until/message";
export default {
  components: {
    Nav,
    Foot
  },
  data() {
    return {
      id: this.$route.params.id,
      detailObj: {},
      LikeGamesList: [],
      windows: {},
      app: {},
      content: "",
      commentList: [],
      commentListData: [],
      // 是否加载更多
      hasMore: false,
      disabled: false,
      page: 1,
      // 用户id
      userId: JSON.parse(localStorage.getItem("uerInfo")).id,
      token: JSON.parse(localStorage.getItem("uerInfo")).token,
      total_page: ""
    };
  },
  mounted() {
    this.getDetail();
    this.getLikeGames();
    this.getComment();
  },
  methods: {
    getDetail() {
      this.$http
        .post("games/personalGames/lookInfoById", { id: this.id },"Bearer "+this.token)
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            this.detailObj = res.data.data;
            this.windows = this.detailObj.window_conf;
            this.app = this.detailObj.app_conf;
          }
        });
    },
    // 获取猜你喜欢
    getLikeGames() {
      this.$http.post("game/game/userLike", { id: this.id }).then(res => {
        let { code, msg } = res.data;
        if (code == 1) {
          this.LikeGamesList = res.data.data;
        }
      });
    },
    download() {
      this.$http
        .post("/games/personalGames/downNum", { game_id: this.detailObj.id },"Bearer "+this.token)
        .then(res => {});
    },
    // 获取评论
    getComment() {
      this.$http
        .post("game/game/comments", {
          game_id: this.id,
          page: this.page
        })
        .then(res => {
          let { code } = res.data;
          if (code == 1) {
            this.commentListData = [
              ...this.commentListData,
              ...res.data.data.list
            ];
            this.total_page = res.data.data.total_page;
          }
        });
    },
    // 提交评论
    referComment() {
      this.$http
        .post("game/game/postComment", {
          game_id: this.id,
          content: this.content,
          member_id: this.userId
        })
        .then(res => {
          loading.start("评论中");
          let { code, msg } = res.data;
          if (code == 1) {
            this.commentListData = [];
            this.page = 1;
            this.disabled = false;
            this.getComment();
            this.content = "";
            loading.end();
            getMsg.msg("评论成功");
          } else {
            loading.end();
            getMsg.msg("评论失败");
          }
        });
    },
    // 点赞评论
    giveLike(comment_id) {
      this.$http
        .post("game/game/vote", {
          comment_id,
          member_id: this.userId
        })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            getMsg.msg("点赞成功");
            this.commentListData = [];
            this.page = 1;
            this.disabled = false;
            this.getComment();
          }
        });
    },
    load() {
      if (this.page < this.total_page) {
        this.disabled = false;
        this.page += 1;
        this.getComment();
      } else {
        this.disabled = true;
      }
    }
  }
};
</script>

<style lang="less">
.detail {
  .detail_box {
    .detail_nav {
      height: 60px;
      display: flex;
      align-items: center;
    }
    .detail_download {
      display: flex;
      justify-content: space-between;
      .detail_download_left {
        width: 64%;
        .detail_download_left_top {
          display: flex;
          margin-bottom: 40px;
          .el-image {
            width: 198px;
            height: 264px;
          }
          .detail_msg {
            margin-left: 31px;
            flex: 1;
            h1 {
              font-size: 28px;
              font-weight: 400;
              color: #000000;
            }
            p {
              margin-top: 13px;
              font-size: 12px;
              font-weight: 400;
              color: #9d9e9d;
              span {
                color: #000000;
              }
            }
            .load_way {
              width: 100%;
              display: flex;
              margin-top: 62px;
              a {
                cursor: pointer;
                button {
                  min-width: 150px;
                  height: 56px;
                  background: #f14027;
                  border-radius: 5px;
                  color: #fff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 20px;
                  img {
                    width: 24px;
                    height: 24px;
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }
        .detail_download_left_content {
          .recommend {
            font-size: 16px;
            font-weight: 400;
            color: #333333;
            line-height: 30px;
            margin-bottom: 49px;
          }
          .bg {
            font-size: 16px;
            font-weight: 400;
            color: #333333;
            line-height: 30px;
            margin-bottom: 49px;
          }
          .special {
            font-size: 16px;
            font-weight: 400;
            color: #333333;
            line-height: 30px;
            margin-bottom: 49px;
          }
          .deploy {
            ul {
              li {
                display: flex;
                padding-left: 30px;
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
                p {
                  font-size: 14px;
                  font-weight: 400;
                  color: #000000;
                }
              }
            }
          }
          .comment {
            width: 100%;
            .comment_box {
              width: 100%;
              text-indent: 10px;
            }
            button {
              width: 100px;
              background-color: #f14027;
              color: #fff;
              height: 40px;
              margin-top: 30px;
              cursor: pointer;
            }
          }
          .comment_box {
            min-height: 100px;
            width: 100%;
            margin-top: 50px;
            position: relative;
            ul {
              height: 500px;
              li {
                border-bottom: 1px solid #eeeeee;
                padding: 10px 0px;
                .userInfo_box {
                  display: flex;
                  justify-content: space-between;
                  img {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    border-radius: 100%;
                  }
                }
                span {
                  color: #075db3;
                }
                p {
                  margin: 30px 0px;
                }
                a {
                  cursor: pointer;
                  &:hover {
                    color: pink;
                  }
                }
              }
            }
            .nocomment {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .detail_download_right {
        ul {
          li {
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
      }
    }
  }
  .detail_download_title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .line {
      width: 5px;
      height: 22px;
      background: #f14027;
      margin-right: 15px;
    }
    h1 {
      font-size: 22px;
      font-weight: bold;
      color: #333333;
    }
  }
  //   轮播图
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>