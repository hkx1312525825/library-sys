<template>
  <div class="home-page">
    <Layout>
        <Header>
          <div class="header-logo">
            <img @click="$router.push({name: 'Home'})" src="../../assets/亭.png" alt="" />
          </div>
          <div class="header-nav">
            <div class="nav-menu">
              <div><router-link :to="{name: 'Home'}">首页</router-link></div>
              <div><router-link :to="{name: 'BookList'}">书籍总览</router-link></div>
              <div><router-link :to="{name: 'ReserveCenter'}">预订中心</router-link></div>
              <div><router-link to="#">积分排行</router-link></div>
            </div>
            <div v-if="userToekn" class="nav-info">
              <span style="margin-right: 15px;">{{userInfo.name}}</span>
              <span style="cursor: pointer" @click="logout">退出</span>
            </div>
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
import axios from '@/libs/axios'
import {
  Layout,
  Header,
  Content,
  Footer,
  Message
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
    },
    logout () {
      this.$store.commit('setToken', '')
      this.$store.commit('setUser', {})
    }
  },
  computed: {
    userToekn () {
      return this.$store.state.token
    },
    userInfo () {
      return this.$store.state.currentUser
    }

  },
  created () {
    if (this.userToekn) {
      axios.request({ url: 'CurrentUser' }).then(res => {
        console.log(res)
        if (res.forbidden) {
          this.$store.commit('setToken', '')
          Message.error('您的账户已被禁用，请联系管理员')
        } else {
          this.$store.commit('setUser', res)
        }
      })
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
