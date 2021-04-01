<template>
  <div class="login-page">
      <div class="login-head">
        <img src="../../assets/匠-书房.png" alt="">
      </div>
      <div class="login-content">
        <div class="login-part">
          <div class="part-head">
            <div class="choosen">用户登录</div>
            <div class="choosen">管理员登录</div>
          </div>
          <div class="part-content"></div>
        </div>
      </div>
      <div class="login-footer"></div>
  </div>
</template>

<script>
import { } from 'view-design'
export default {
  components: {

  },
  name: '',
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
  .active {
    border-bottom: 5px solid @active-color;
    font-weight: 600;
  }
  .login-head {
    text-align: center;
  }
  .login-content {
    min-height: 500px;
    .flex-x-center;
    .login-part {
      background: #fff;
      height: 500px;

      width: 400px;
      .part-head {
        .flex;
        font-size: 18px;
        // background: green;
        > div {
          cursor: pointer;
          padding: 15px;
          margin-right: 5px;
          // background: gold;
        }
      }
    }
  }
  .login-footer {
    height: 200px;
  }
}
</style>
