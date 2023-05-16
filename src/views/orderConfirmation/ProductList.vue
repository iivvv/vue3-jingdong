<template>
  <div class="product">
    <div class="product__title">{{ shopName }}</div>
    <div class="product__list">
      <div class="product__item" v-for="item in productList" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__price__single"
              >&yen;{{ item.price }} x {{ item.count }}</span
            >
            <span class="product__item__price__all"
              >&yen;{{ (item.price * item.count).toFixed(2) }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="product__info">
      共计{{ total }}件
      <div class="iconfont">&#xe600;</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName, total, price } = useCommonCartEffect(shopId)

    return { productList, shopName, total, price }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.product {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background-color: $bgColor;
  border-radius: 0.04rem;
  padding: 0.18rem;
  &__title {
    // padding: .16rem 0 0 .16rem;
    font-size: 0.16rem;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.16rem 0 0 0;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-font-color;
    }
    &__price {
      font-size: 0.12rem;
      color: $hightlight-fontColor;
      display: flex;
      // margin-right: .3rem;
      &__all {
        text-align: right;
        flex: 1;
        color: $content-font-color;
      }
    }
  }
  &__info {
    background-color: $search-bgColor;
    // margin:.16rem;
    line-height: 0.28rem;
    text-align: center;
    display: flex;
    justify-content: center;
    color: $light-fontColor;
    font-size: 0.14rem;
    // border-radius: .04rem;
    .iconfont {
      transform: rotate(270deg);
    }
  }
}
</style>
