<template>
  <div>
      <h1>home</h1>
      <a href="#">132</a>
    <mt-button type="default" >default</mt-button>

    <h1>Click Me</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
   created() {
        this.$http.get('5f1923ae7913d6981f5198c4')
      // this.$http.get('5f19274f7913d6981f527784',{}) 
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>