<template>
  <div class="book-list-page">
    <div class="page-content">
      <div class="breadcrumb">
        <Breadcrumb :style="{ margin: '24px 0' }">
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>书籍总览</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="search">
        <div class="title">书籍总览</div>
        <div class="search-input">
          <div>
            <Select style="width: 200px" :clearable="true" placeholder="请选择书籍分类" v-model="tag">
              <Option value="">暂不选择</Option>
              <Option v-for="(item, index) in tagList" :value="item.name" :key="index">{{item.name}}</Option>
            </Select>
          </div>
          <div>
            <Input
              v-model="keyword"
              style="width: 300px"
              :search="true"
              enter-button="查询"
              placeholder="请输入书籍名称"
              @on-search="searchBook(1)"
            ></Input>
          </div>
        </div>
      </div>
      <div v-if="bookList.length === 0" class="no-data-msg">
        <img src="../../assets/noData.svg" alt="">
      </div>
      <div v-else class="book-list">
        <div @click="toDetail(item.id)" class="book-item" v-for="(item, index) in bookList" :key="index">
          <div class="book-img">
            <img style="height: 120px; width: 100px;" :src="item.img.url" alt="">
          </div>
          <div class="book-detail"><p>{{item.introduction}}</p></div>
          <div class="book-msg">
            <div>《{{item.name}}》</div>
            <div>作者：{{item.author}}</div>
            <div v-if="item.tags.length !== 0"><Tag v-for="tag in item.tags" :key="tag.id">{{tag.name}}</Tag></div>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 50px" class="flex-x-center">
        <Page :total="total" />
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import { filterHtml, ellipsis, escape2Html } from '@/libs/utils'
import {
  Breadcrumb, BreadcrumbItem, Input, Select, Tag, Page, BackTop,
  Option
} from 'view-design'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Input,
    Select,
    Option,
    Tag,
    Page,
    BackTop
  },
  name: '',
  data () {
    return {
      keyword: '',
      tagList: [],
      tag: '',
      bookList: [],
      total: null
    }
  },
  created () {
    axios.request({ url: 'tagList' }).then(res => {
      this.tagList = res
    })
    this.searchBook()
  },
  methods: {
    searchBook (page = 1) {
      if (this.tag === undefined) {
        this.tag = ''
      }
      axios.request({ url: `bookSort?ordering=-created_date&page=${page}&name=${this.keyword}&tag=${this.tag}` }).then(res => {
        this.bookList = res.results.map(item => {
          item.introduction = filterHtml(item.introduction)
          item.introduction = ellipsis(item.introduction)
          item.introduction = escape2Html(item.introduction)
          return item
        })
        this.total = res.count
        console.log(this.bookList)
      })
    },
    toDetail (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>
.book-list-page {
  .flex-y-center;
  .page-content {
    // background: pink;
    width: @content-width;
    .search {
      .flex-x-bt;
      .search-input {
        .flex;
        > div:last-child {
          margin-left: 25px;
        }
      }
    }
    .book-list {
      margin: 30px 0;
      width: 100%;
      .book-item {
        cursor: pointer;
        .flex-x-bt;
        width: 100%;
        border: 1px solid #eee;
        border-radius: 15px;
        &:hover {
          border: 1px solid @base-bg-color;
          color: @base-bg-color;
        }
        &:not(:last-child) {
          margin-bottom: 15px;
        }
        .book-img {
          height: 100%;
          .flex;
          margin: 10px;
        }
        .book-detail {
          width: 800px;
        }
        .book-msg {
          text-align: right;
          margin: 10px 20px;
          > div {
            &:not(:last-child) {
            margin-bottom: 17px;
            }
            &:first-child {
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>
