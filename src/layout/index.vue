<template>
  <div>
    <router-view></router-view>
    <footer @click.stop="gotoRouter">
      <mt-tabbar :fixed="true" v-model="selected">
        <mt-tab-item id="/home">
          <img slot="icon" src="../assets/logo.png" />
          首页
        </mt-tab-item>
        <mt-tab-item id="/sort">
          <img slot="icon" src="../assets/logo.png" />
          分类
        </mt-tab-item>
        <mt-tab-item id="/cart">
          <img slot="icon" src="../assets/logo.png" />
          购物车
        </mt-tab-item>
        <mt-tab-item id="/mine">
          <img slot="icon" src="../assets/logo.png" />
          我的
        </mt-tab-item>
      </mt-tabbar>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: ""
    };
  },

  created() {},
  mounted() {
    this.selected = this.$route.path;
    console.log(this.selected);
  },
  methods: {
    gotoRouter() {
      this.$router.push({
        path: this.selected
      });
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>