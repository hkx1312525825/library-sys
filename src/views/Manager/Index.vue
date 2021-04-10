<template>
  <div class="manager-page">
    <Layout class="manager">
      <Header>
        <div class="layout-logo">
          <img src="../../assets/匠-书房.svg" alt="" />
        </div>
        <div class="header-menu">
          <Menu mode="horizontal" theme="primary" active-name="Book">
            <MenuItem name="Book" to="Book" :replace="true">
              <Icon type="ios-navigate"></Icon>
              书籍管理
            </MenuItem>
            <MenuItem name="User" to="User" :replace="true">
              <Icon type="ios-keypad"></Icon>
              用户管理
            </MenuItem>
            <MenuItem name="Manager" to="Manager" :replace="true">
              <Icon type="ios-analytics"></Icon>
              管理员管理
            </MenuItem>
          </Menu>
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
import { Header, Layout, Menu, MenuItem, Icon } from 'view-design'
import axios from '@/libs/axios'
export default {
  components: {
    Header,
    Layout,
    Menu,
    MenuItem,
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
    // debugger
    axios.request({ url: 'currentUser' }).then(res => {
      console.log(res)
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
