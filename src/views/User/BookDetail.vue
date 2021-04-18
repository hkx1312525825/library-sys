<template>
  <div class="book-detail-page">
    <div class="breadcumb">
      <Breadcrumb :style="{ margin: '24px 0' }">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>书籍详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="book-detail-content">
      <div class="title">《{{ bookDetail.name }}》</div>
      <div class="info">
        <div>
          <p v-html="bookDetail.introduction"></p>
        </div>
        <div style="margin-right: 15px">
          <img
            style="width: 200px; height: 250px"
            :src="bookDetail.img.url"
            alt=""
          />
        </div>
      </div>
    </div>
      <Card :bordered="false" class="fix-card">
        <p slot="title">书籍小tip</p>
        <router-link v-show="bookDetail.num !== 0" slot="extra" :to="{ name: 'Home' }" target="_blank" tag="a">预订</router-link>
        <div>作者：{{ bookDetail.author }}</div>
        <div>上架时间：{{ bookDetail.created_date | dateFormate }}</div>
        <div>书籍数量：{{ bookDetail.num }}</div>
        <div>点击量：{{ bookDetail.score }}</div>
        <div>
          <Tag v-for="(item, index) in bookDetail.tags" :key="index">{{
            item.name
          }}</Tag>
        </div>
      </Card>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import { Breadcrumb, BreadcrumbItem, Tag, Card } from 'view-design'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Card
  },
  name: '',
  data () {
    return {
      bookDetail: {}
    }
  },
  props: ['id'],
  filters: {
    dateFormate (str) {
      var time = new Date(str)

      function timeAdd0 (str) {
        if (str < 10) {
          str = '0' + str
        }
        return str
      }
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return (
        y +
        '-' +
        timeAdd0(m) +
        '-' +
        timeAdd0(d) +
        ' ' +
        timeAdd0(h) +
        ':' +
        timeAdd0(mm) +
        ':' +
        timeAdd0(s)
      )
    }
  },
  created () {
    axios.request({ url: `bookDetail/${this.id}` }).then(res => {
      this.bookDetail = res
    })
  }
}
</script>

<style lang="less" scoped>
.book-detail-page {
  width: @content-width;
  // background: pink;
  margin: auto;
  .book-detail-content {
    .flex-y-center;
    > div {
      margin-top: 15px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
    }
    .info {
      .flex;
      > div {
        padding: 40px;
      }
    }
  }
    .ivu-card {
      position: fixed;
      right: 0;
      bottom: 45vh;
      background: #eee;
      border-radius: 15px;
      background: @base-bg-color;
      color: #fff;
    }
    .ivu-card-head {
      > p {
        color: #fff;
      }
    }
    .ivu-card-body {
      > div {
        margin-bottom: 15px;
      }
    }
}
</style>
