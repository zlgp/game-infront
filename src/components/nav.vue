<template>
  <div>
    <div class="nav">
      <div class="nav_area area">
        <div class="nav_logo">
          <router-link to="/index">
            <img src="../assets/img/logo/logo_icon.png" alt />
          </router-link>
        </div>
        <div class="nav_item">
          <ul>
            <router-link to="/index" tag="li" active-class="active">首页</router-link>
            <router-link to="/games" tag="li" active-class="active">全部游戏</router-link>
            <router-link to="/center" tag="li" active-class="active">个人中心</router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav {
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.04);
  .nav_area {
    display: flex;
    align-items: center;
    height: 100%;
    .nav_item {
      ul {
        padding-left: 150px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          padding-right: 49px;
          cursor: pointer;
        }
      }
    }
  }
  .active {
    color: #F14027 !important;
  }
  // .active::after {
  //   content: "";
  //   display: block;
  //   width: 100%;
  //   height: 2px;
  //   background-color: #4bcacc;
  // }
}
</style>