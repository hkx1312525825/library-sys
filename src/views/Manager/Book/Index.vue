<template>
  <div class="book-manage">
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="1" theme="light" width="auto">
          <MenuItem name="1" to="BookManage"><Icon type="md-grid" />书籍管理</MenuItem>
          <MenuItem name="3" to="TagManage"><Icon type="md-grid" />标签管理</MenuItem>
          <MenuItem name="2" to="ReserveManage"><Icon type="md-grid" />预定管理</MenuItem>
          <MenuItem name="2" to="#"><Icon type="md-grid" />评论管理</MenuItem>
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
    return {}
  }
}
</script>

<style lang="less" scoped>
.book-manage {
  height: 100%;
}
</style>
