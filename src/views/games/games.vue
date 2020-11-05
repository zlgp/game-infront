<template>
  <div class="games">
    <Nav></Nav>
    <div class="area">
      <div class="games_title">
        <h1>选择</h1>
        <ul>
          <li
            v-for="(item,index) in CategoryList"
            :key="index"
            :class="{li_active:index==tagCurrent}"
            @click="categoryChange(index,item.id)"
          >{{item.category_name}}</li>
        </ul>
      </div>
      <div v-if="isgames">
        <div class="games_content">
          <ul>
            <li v-for="(item,index) in gamesList" :key="index">
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
      <div class="gamesNodata">
        <noData v-if="!isgames"></noData>
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
export default {
  components: {
    Nav,
    Foot,
    goDetail,
    noData
  },
  data() {
    return {
      tagCurrent: 0,
      total: 0,
      CategoryList: [],
      category_id: 1,
      page: 1,
      gamesList: [],
      isgames: false
    };
  },
  mounted() {
    this.getCategory();
    this.getGames();
  },
  methods: {
    // 获取游戏的分类
    getCategory() {
      this.$http.post("games/wholeGames/classify", {}).then(res => {
        let { code, msg } = res.data;
        if (code == 1) {
          this.CategoryList = res.data.data.list;
        }
      });
    },
    // 获取全部游戏
    getGames() {
      this.$http
        .post("games/wholeGames", {
          category_id: this.category_id,
          page: this.page
        })
        .then(res => {
          let { code, msg } = res.data;
          if (code == 1) {
            this.isgames = true;
            this.gamesList = res.data.data.list;
            
            this.total = res.data.data.total_page;
          } else if ((code = 20003)) {
            this.isgames = false;
          }
        });
    },
    async categoryChange(index, category_id) {
      this.page = 1;
      this.tagCurrent = index;
      this.category_id = category_id;
      await this.getGames();
    },
    async handleCurrentChange(val) {
      this.page = val;
      await this.getGames();
    }
  }
};
</script>

<style lang="less">
.games {
  .games_title {
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
      flex-wrap: wrap;
      li {
        padding: 5px;
        background-color: #ffffff;
        border-radius: 5px;
        color: #000000;
        border-radius: 5px;
        font-size: 12px;
        margin-right: 25px;
        cursor: pointer;
        margin-bottom: 10px;
      }
    }
  }
  .gamesNodata {
    width: 100%;
    height: 100vh;
  }
  .games_content {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 25%;
        position: relative;
        cursor: pointer;
        margin-bottom: 25px;
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
      }
    }
  }
  .el-image {
    width: 282px;
    height: 159px;
  }
  .li_active {
    background-color: #f14027 !important;
    color: #ffffff !important;
  }
}
</style>