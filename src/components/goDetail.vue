<template>
  <div @click="goDetail()">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    //带参数跳转到详情页
    goDetail() { 
     this.$router.push({name:"detail",params:{id:this.id}})
    }
  }
};
</script>

<style>
</style>