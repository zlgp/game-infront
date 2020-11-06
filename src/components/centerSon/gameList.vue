<template>
  <div class="gameList">
    <div v-if="haveData">
      <h1>进入的游戏</h1>
      <ul>
        <li
          v-for="(item,index) in UploadGamesList"
          :key="index"
          @mouseenter="current=index"
          @mouseleave="current=-1"
        >
          <el-image lazy src>
            <div slot="error" class="image-slot">
              <img src="../../assets/img/index/default_horizontal_pic.png" alt />
            </div>
          </el-image>
          <div class="game_title">{{item.game_name}}</div>
          <div class="game_msg" v-if="current==index">
            <h4>{{item.game_name}}</h4>
            <h5>{{item.category_name}}</h5>
            <h6 v-if="item.status==1">已审核</h6>
            <h6 v-if="item.status==2">待审核</h6>
            <div class="game_btn">
              <goDetail :id="item.id">
                <button class="detail">查看详情</button>
              </goDetail>
              <button class="del" @click="deleteGanme(item.id)">删除</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="search_block">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="total"
          prev-text="上一页"
          next-text="下一页"
          @current-change="handleCurrentChange"
          :page-size="20"
          :current-page="page"
        ></el-pagination>
      </div>
    </div>
    <noData v-if="!haveData"></noData>
  </div>
</template>

<script>
import goDetail from "@/goDetail.vue";
import noData from "@/noData.vue";
import getMsg from "../../../until/message";
export default {
  components: {
    goDetail,
    noData
  },
  data() {
    return {
      total: 0,
      current: -1,
      UploadGamesList: [],
      page: 1,
      token: JSON.parse(localStorage.getItem("uerInfo")).token,
      haveData: true
    };
  },
  mounted() {
    this.getUploadGames();
  },
  methods: {
    // 获取上传的游戏
    getUploadGames() {
      this.$http
        .post("games/personalGames/List", { page: this.page }, "Bearer " + this.token)
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            this.Data = true;
            this.UploadGamesList = res.data.data.list;
            this.total = res.data.data.total_page;
          } else if (code == 20003) {
            this.Data = false;
          } else {
            this.Data = true;
          }
        });
    },
    async handleCurrentChange(val) {
      this.page = val;
      await this.getUploadGames();
    },
    // 删除游戏
    deleteGanme(id) {
      this.$confirm("您确认删除吗?", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("games/personalGames/deleteById", { id: id }, "Bearer " + this.token)
            .then(res => {
              let { code } = res.data;
              if (code == 1) {
                this.getUploadGames();
              }
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less">
.gameList {
  flex: 1;
  position: relative;
  h1 {
    font-size: 22px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 30px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      cursor: pointer;
      margin-bottom: 25px;
      width: 33.33%;
      .el-image {
        display: block;
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
      .game_msg {
        position: absolute;
        bottom: 0px;
        z-index: 1111;
        width: 282px;
        min-height: 103px;
        background: #ffffff;
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
        padding: 0px 16px;
        box-sizing: border-box;
        overflow: hidden;
        h4 {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
          margin-top: 10px;
          margin-bottom: 5px;
        }
        h5 {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          margin-bottom: 5px;
        }
        h6 {
          margin-bottom: 5px;
          color: red;
        }
        .game_btn {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          button {
            width: 95px;
            height: 24px;
            color: #fff;
          }
          .detail {
            background-color: #f14027;
            cursor: pointer;
          }
          .del {
            background-color: #ff8416;
            cursor: pointer;
          }
        }
      }
    }
  }
  .nodata {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: bold;
    color: #000000;
  }
  .el-image {
    width: 282px;
    height: 159px;
  }
}
</style>