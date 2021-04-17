<template>
  <div class="home-page">
    <div class="home-content">
      <div>
        <div class="home-content-carousel">
          <Carousel
            :loop="true"
            dots="none"
            v-model="value"
            :autoplay="true"
            :autoplay-speed="1000"
          >
            <CarouselItem v-for="(item, index) in carouselData" :key="index">
              <div class="carousel">
                <img :src="item.img.url" :alt="item.name" :title="item.name" />
              </div>
            </CarouselItem>
          </Carousel>
        </div>
        <div class="book-sort">
          <Card dis-hover>
            <p slot="title">
              <Icon type="ios-book-outline" />
              最热推荐
            </p>
            <span slot="extra">
              点击量
            </span>
            <ul>
              <li v-for="item in bookScoreData" :key="item.id">
                <a target="_blank">{{ item.name }}</a>
                <span>
                  {{ item.score }}
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
      <div class="new-book">
        <div class="message">
          <div class="name">新书上架</div>
          <div class="more">更多》</div>
        </div>
        <div class="book-info-list">
          <div
            class="book-info"
            v-for="(item, index) in bookDefaultData"
            :key="index"
          >
            <img
              style="height:120px;width: 100px"
              :src="item.img.url"
              :alt="item.img.name"
            />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import { Carousel, CarouselItem, Card, Icon } from 'view-design'
export default {
  components: {
    Carousel,
    CarouselItem,
    Card,
    Icon
  },
  name: '',
  data () {
    return {
      carouselData: [],
      value: 1,
      bookScoreData: [],
      bookDefaultData: [],
      firstDefaultBook: {}
    }
  },
  methods: {},
  created () {
    axios.request({ url: 'getAllCarousels' }).then(res => {
      this.carouselData = res.results
    })
    axios.request({ url: 'bookSort?ordering=-score' }).then(res => {
      this.bookScoreData = res.results
    })
    axios.request({ url: 'bookSort?ordering=-created_date' }).then(res => {
      this.bookDefaultData = res.results
    })
  }
}
</script>

<style lang="less" scoped>
.home-page {
  .flex-y;
  .home-content {
    margin: 25px 0;
    width: @content-width;
    min-height: 500px;
    // background: gold;
    .flex-y;
    align-items: initial;
    > div {
      .flex-x-bt;
      align-items: initial;
      .home-content-carousel {
        height: 450px;
        width: 800px;
        .carousel {
          > img {
            height: 450px;
            width: 800px;
          }
        }
      }
      .book-sort {
        .ivu-card {
          width: 380px;
          height: 100%;
          .ivu-card-body {
            > ul {
              > li {
                margin-bottom: 15px;
                .flex-x-bt;
                > a:hover {
                  color: #ccc;
                }
              }
            }
          }
        }
      }
    }
    .new-book {
      margin: 40px 0;
      .flex-y;
      align-items: initial;
      .message {
        .flex-x-bt;
        .name {
          font-size: 20px;
          font-weight: 500;
          color: #222;
          &::before {
            height: 15px;
            width: 5px;
            content: "";
            display: inline-block;
            background: @base-bg-color;
            margin-right: 5px;
          }
        }
        .more {
          width: 80px;
          height: 28px;
          line-height: 28px;
          border-radius: 1px;
          text-align: center;
          border: 1px solid #ccc;
          color: #999;
          cursor: pointer;
          &:hover {
            color: @base-color;
            border: 1px solid @base-color;
          }
        }
      }
      .book-info-list {
        margin-top: 25px;
        .flex-x-bt;
        .book-info {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
