<template>
  <div class="book-manage">
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="UserManage" theme="light" width="auto">
          <MenuItem name="UserManage" to="UserManage"><Icon type="md-grid" />用户信息管理</MenuItem>
          <!-- <MenuItem name="CoursolManage" to="CoursolManage"><Icon type="md-grid" />首页轮播图管理</MenuItem> -->
        </Menu>
      </Sider>
      <Layout :style="{ padding: '0 24px 24px' }">
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import {
  Layout,
  Menu,
  MenuItem,
  Sider,
  Icon
} from 'view-design'
export default {
  components: {
    Layout,
    Menu,
    MenuItem,
    Sider,
    Icon
  },
  name: '',
  data () {
    return {

    }
  }

}
</script>

<style lang="less">
.book-manage {
  height: 100%;
}
</style>
