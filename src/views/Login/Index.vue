<template>
  <div class="login-page">
    <div class="login-head">
      <img @click="$router.push({name: 'Home'})" src="../../assets/匠-书房.png" alt="" />
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="login-footer"></div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
    }
  }

}
</script>

<style lang="less" scoped>
.login-page {
  background: url("../../assets/background.png");
  min-height: 100vh;
  background-repeat: no-repeat;
  background-color: #b8e5f8;
  background-size: cover;

  .login-head {
    text-align: center;
    > img {
      cursor: pointer;
    }
  }

  .login-footer {
    height: 200px;
  }
}
</style>
