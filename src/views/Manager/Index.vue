<template>
  <div class="manager-page">
    <Layout class="manager">
      <Header>
        <div class="layout-logo">
          <img src="../../assets/Library.png" alt="" />
        </div>
        <div class="header-menu">
          <div class="header-menu-content">
            <div><router-link to="Book"><Icon type="md-book" />书籍管理</router-link></div>
            <div><router-link to="User"><Icon type="ios-contacts-outline" />用户管理</router-link></div>
            <div><router-link to="Manager"><Icon type="ios-hammer-outline" />管理员管理</router-link></div>
          </div>
          <div class="manager-info">
            <div class="manager-name">{{ user.name }}</div>
            <div class="manager-logout" @click="logout">退出</div>
          </div>
        </div>
      </Header>
      <div class="content">
        <router-view></router-view>
      </div>
    </Layout>
  </div>
</template>

<script>
import { Header, Layout, Icon } from 'view-design'
import axios from '@/libs/axios'
export default {
  components: {
    Header,
    Layout,
    Icon
  },
  name: 'ManagerIndex',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    logout () {
      this.$store.commit('setToken', '')
      this.$store.commit('setManager', {})
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {},
  created () {
    axios.request({ url: 'currentUser' }).then(res => {
      this.$store.commit('setManager', res)
      this.user = res
    })
  }
}
</script>

<style lang="less" scoped>
.manager-page {
  .manager {
    height: 100vh;
  }
}
.ivu-layout-header {
  .flex-x-bt;
  background: @base-bg-color;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 50px;
  border-radius: 3px;
  top: 15px;
  left: 20px;
  > img {
    height: 50px;
  }
}
.header-menu {
  .flex;
  .header-menu-content {
    .flex;
    color: #fff;
    margin-right: 100px;
    > div {
      margin-left: 60px;
    }
  }
  .manager-info {
    .flex;
    margin-left: 15px;
    color: #fff;
    > div {
      cursor: pointer;
      &:first-child {
        padding-right: 15px;
      }
      &:first-child::after {
        padding-left: 15px;
        content: "||";
      }
    }
  }
}
.content {
  height: 100%;
}
</style>
