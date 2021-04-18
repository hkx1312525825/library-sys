<template>
  <div class="home-page">
    <Layout>
        <Header>
          <div class="header-logo">
            <img @click="$router.push({name: 'Home'})" src="../../assets/亭.png" alt="" />
          </div>
          <div class="header-nav">
            <div class="nav-menu">
              <div><router-link to="Home">首页</router-link></div>
              <div><router-link to="BookList">书籍总览</router-link></div>
              <div><router-link to="#">书籍预订</router-link></div>
              <div><router-link to="#">积分排行</router-link></div>
            </div>
            <div v-if="userToekn" class="nav-info"><span>路人甲</span></div>
            <div v-else class="nav-login" @click="toLogin"><span>登录</span><span>|</span><span>注册</span></div>
          </div>
        </Header>
        <Content>
          <router-view></router-view>
        </Content>
        <Footer>
          <div class="footer-msg">
            <div><span>关于我们</span></div>
            <div><span>联系我们</span></div>
            <div><span>用户协议</span></div>
            <div><span>加入我们</span></div>
            <div><span>友情链接</span></div>
            <div><span>隐私政策</span></div>
          </div>
        </Footer>
    </Layout>
  </div>
</template>

<script>
import {
  Layout,
  Header,
  Content,
  Footer
} from 'view-design'
export default {
  name: '',
  components: {
    Layout,
    Header,
    Content,
    Footer
  },
  data () {
    return {}
  },
  methods: {
    toLogin () {
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    userToekn () {
      return this.$store.state.token
    }
  }
}
</script>

<style lang="less">
.home-page {
  // min-height: 100vh;
  a:hover {
    color: #fff;
  }
  height: 100%;
  .ivu-layout {

    .ivu-layout-header {
      background-color: @base-bg-color;
      color: #fff;
      .flex-x-bt;
      .header-logo {
        height: 100%;
        .flex;
        > img {
          // margin: auto;
          cursor: pointer;
          height: 50px;
        }
      }
      .header-nav {
        .flex;
        .nav-menu {
          width: 500px;
          text-align: center;
          margin-right: 120px;
          .flex;
          > div {
            flex: 1;
          }
        }
        .nav-login {
          &:hover{
            // color: #000;
            cursor: pointer;
          }
          > span {
            margin-right: 15px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .ivu-layout-content {
    background: #fff;
  }
  .footer-msg {
    .flex-x-center;
    > div {
      margin-right: 35px;
      &:last-child {
        margin-right: 0;
      }
      > span:hover{
        color: #ccc;
        cursor: pointer;
      }
    }
  }
}
</style>
