<template>
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in list" :key="index">
        <div class="order__header">
          <div class="order__header__title">{{ item.shopName }}</div>
          <div class="order__header__desc">{{item.isCanceled?'已取消':'已下单'}}</div>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem,innerIndex) in item.products" :key="innerIndex">
              <img
              v-if="innerIndex<=3"
              :src="innerItem.product.img"
              class="order__content__img">
            </template>

          </div>
          <div class="order__info">
            <div class="order__info__price">&yen;{{item.totalPrice.toFixed(1)}}</div>
             <div class="order__info__count">共{{item.totalNum}}件</div>
          </div>
        </div>
      </div>
    </div>
    <BottomDocker :currentIndex="2"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import BottomDocker from '../../components/Docker.vue'
import { get } from '../../utils/request'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products
        let totalPrice = 0
        let totalNum = 0
        products.forEach((productItem) => {
          totalPrice += (productItem.product.price * productItem.product.sales)
          totalNum += productItem.product.sales
        })
        order.totalPrice = totalPrice
        order.totalNum = totalNum
      })
      // console.log(orderList);
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { BottomDocker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.title{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: .64rem;
  background-color: #fff;
  text-align: center;
  line-height: .64rem;
  font-size:.16rem ;
  color: #333333;
}
.orders{
  // margin-top: .64rem;
  position: absolute;
  top: .64rem;
  bottom: .5rem;
  overflow: scroll;
  background-color: #f5f5f5;
  padding:.16rem .18rem 0 .18rem ;
}
.order{
  background-color: hsl(0, 0%, 100%);
  width: 3.4rem;
  margin-bottom: .16rem;
  &__header{
    height:.22rem ;
    display: flex;
    justify-content:space-between;
    padding: .16rem;
    &__title{
    font-size: .16rem;
    font-weight: 600;
    color: #333333;
    }
    &__desc{
      color: #999999;
      font-size: .14rem;
    }
  }
  &__content{
    display: flex;
    justify-content:space-between;
    &__imgs{
      margin:0 0 .16rem .16rem;
      display: flex;
    }
    &__img{
      margin-right: .12rem;
      width: .4rem;
    }
  }
  &__info{
    margin-right: .16rem;
    display: flex;
    flex-direction:column;
    align-items:flex-end;
    &__price{
      color: #E93B3B ;
      font-size: .14rem;
      margin-bottom: .04rem;
    }
    &__count{
      color: #333333;
      font-size: .12rem;
    }
  }
  }
</style>
