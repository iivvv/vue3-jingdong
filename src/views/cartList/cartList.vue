<template>
  <div class="title">我的全部购物车（2）</div>
  <div class="shops">
    <!-- <div class="shop">
      <div class="shop__title">沃尔玛</div>
      <div class="shop__lists">
        <div class="shop__item">
          <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="shop__item__img">
          <div class="shop__info">
            <div class="shop__info__title">番茄250g/份</div>
            <div class="shop__price">
              <div class="shop__price__count">&yen;33.6 x 3</div>
              <div class="shop__price__all">&yen;99.9</div>
            </div>
          </div>
        </div>
      </div>
      <div class="shop__fold">
        共计x件 / xkg
        <div class="shop__fold__iconfont iconfont">&#xe600;</div>
      </div>
    </div> -->
    <template v-for="shopId in cartList" :key="shopId">
      <div class="shop" v-if="shopId.totalCount">
        <div class="shop__title">{{ shopId.shopName }}</div>
        <div class="shop__lists">
          <template v-for="product in shopId.productList" :key="product._id">
            <div class="shop__item" v-if="product.count">
              <img :src="product.imgUrl" class="shop__item__img" />
              <div class="shop__info">
                <div class="shop__info__title">{{ product.name }}</div>
                <div class="shop__price">
                  <div class="shop__price__count">
                    &yen;{{ product.price }} x {{ product.count }}
                  </div>
                  <div class="shop__price__all">
                    &yen;{{ (product.price * product.count).toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="shop__fold">
          共计{{ shopId.totalCount }}件
          <div class="shop__fold__iconfont iconfont">&#xe600;</div>
        </div>
      </div>
    </template>
  </div>
  <BottomDocker :currentIndex="1" />
</template>

<script>
import BottomDocker from '../../components/Docker.vue'
import { useCommonCartEffect } from '../../effects/cartEffects'

export default {
  name: 'CartList',
  components: { BottomDocker },
  setup() {
    const { cartList } = useCommonCartEffect()
    return { cartList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.title {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 0.64rem;
  background-color: #fff;
  text-align: center;
  line-height: 0.64rem;
  font-size: 0.16rem;
  color: #333333;
}

.shops {
  // margin-top: .64rem;
  position: absolute;
  top: 0.64rem;
  bottom: 0.5rem;
  overflow-y: scroll;
  background-color: #f5f5f5;
  padding: 0.16rem 0.18rem 0.16rem 0.18rem;
}

.shop {
  background-color: hsl(0, 0%, 100%);
  width: 3.4rem;
  padding-bottom: 0.16rem;
  margin-bottom: 0.16rem;

  &__title {
    // height: .22rem;
    padding: 0.16rem 0 0.16rem 0.16rem;
    font-size: 0.16rem;
    font-weight: 600;
    color: #333333;
  }

  &__lists {
    padding: 0 0.16rem 0 0.16rem;
    // background-color: #dac7c7;
  }

  &__item {
    display: flex;
    padding: 0 0 0.16rem 0;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
  }

  &__info {
    flex-grow: 2;
    // flex-direction:column;
    &__title {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #333333;
      margin-bottom: 0.06rem;
    }
  }

  &__price {
    display: flex;
    justify-content: space-between;
    font-size: 0.14rem;
    margin-bottom: 0.04rem;

    &__count {
      color: #e93b3b;
      // margin-right: .3rem;
    }

    &__all {
      color: #333333;
      // flex: 1;
      flex-grow: 2;
      text-align: right;
    }
  }
  &__fold {
    margin: 0.08rem 0.16rem 0 0.16rem;
    background-color: $search-bgColor;
    // margin:.16rem;
    line-height: 0.28rem;
    text-align: center;
    display: flex;
    justify-content: center;
    color: $light-fontColor;
    font-size: 0.14rem;
    // border-radius: .04rem;
    &__iconfont {
      transform: rotate(270deg);
      // color: #E93B3B;
    }
  }
}
</style>
