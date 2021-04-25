<template>
  <div class="list-page">
    <Breadcrumb separator="/">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>评论中心</BreadcrumbItem>
    </Breadcrumb>
    <div class="party-pages-list">
      <template v-for="(item, index) in list">
        <div :key="index" class="page-news-list">
          <div>
            <span class="first"></span>
            <span class="title" @click="toDetail(item)">{{ item.title }}</span>
          </div>
          <div>
            <span class="user-name">{{ item.user.name }}</span>
          </div>
        </div>
      </template>
      <Page
          v-if="total > 10"
          :total="total"
          @on-change="changePage"
        />
    </div>
    <div style="text-align: center;" v-show="list.length === 0" class="nodata">
      <img src="../../assets/noData.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'view-design'
import axios from '@/libs/axios'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  name: '',
  data () {
    return {
      list: [],
      total: 0
    }
  },
  methods: {
    searchComment (page = 1) {
      axios.request({ url: 'CommentList' }).then(res => {
        this.list = res.results
      })
    },
    toDetail (item) {
      const { href } = this.$router.resolve({
        name: 'CommentDetail',
        params: { id: item.id }
      })
      window.open(href, '_blank')
    },
    changePage (page) {
      this.searchComment(page)
    }
  },
  created () {
    this.searchComment()
  }
}
</script>

<style lang="less" scoped>
.list-page {
  width: @content-width;
  margin: 15px auto;
  .party-pages-list {
    padding: 15px;
    margin: 20px 0;
    .page-news-list {
      .flex-x-bt;
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      .first {
        display: inline-block;
        height: 0.5rem;
        width: 0.5rem;
        background: #0073e6;
        border-radius: 50%;
        margin-right: 7px;
      }
      .title {
        cursor: pointer;
        &:hover {
          color: #0073e6;
        }
      }
      .user-name {
        color: @gray-color;
      }
    }
  }
}
</style>
