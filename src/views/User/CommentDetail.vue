<template>
  <div class="comment-detail-page">
    <Breadcrumb separator="/">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/CommentCenter">评论中心</BreadcrumbItem>
      <BreadcrumbItem>评论详情</BreadcrumbItem>
    </Breadcrumb>
    <div class="title">
      <span>{{commentDetail.title}}</span>
    </div>
    <div class="content">
      <p v-html="commentDetail.detail"></p>
    </div>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'view-design'
import axios from '@/libs/axios'
export default {
  components: { Breadcrumb, BreadcrumbItem },
  name: '',
  props: ['id'],
  data () {
    return {
      commentDetail: {}
    }
  },
  created () {
    axios.request({ url: `comment/${this.id}` }).then(res => {
      this.commentDetail = res
    })
  }
}
</script>

<style lang="less" scoped>
.comment-detail-page {
  width: @content-width;
  margin: 15px auto;
  > div:not(:first-child) {
    margin: 30px 0;
  }
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
  .content {
    padding: 25px;
  }
}
</style>
