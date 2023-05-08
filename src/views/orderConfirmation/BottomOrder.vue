<template>
  <div class="mask" v-if="showConfirm" >
    <div class="mask__content">
      <h4 class="mask__content__title">确认要离开收银台？</h4>
      <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first"
        @click="()=>handleConfirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--last"
        @click="()=>handleConfirmOrder(false)">确认订单</div>
      </div>
    </div>
    <div class="mask__bg" @click="handleCartShowChange"></div>
  </div>
  <div class='bottom'>
    <div  class="bottom__info">
      实付金额
      <span class="bottom__info__price">&yen;{{price}}</span>
    </div>
    <div class="bottom__btn" @click="handleCartShowChange">
      提交订单
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { post } from '../../utils/request'
// 展示隐藏逻辑
const toggleConfirmEffect = () => {
  const showConfirm = ref(false)
  const handleCartShowChange = () => {
    showConfirm.value = !showConfirm.value
  }
  return { showConfirm, handleCartShowChange }
}

export default {
  name: 'BottomOrder',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const shopId = parseInt(route.params.id)
    const { price, productList, shopName } = useCommonCartEffect(shopId)
    const { showConfirm, handleCartShowChange } = toggleConfirmEffect()
    // const handleCancelOrder = () => {
    //   alert('cancel')
    // }
    const handleConfirmOrder = async (isCanceled) => {
      const products = []
      // console.log(productList);
      for (const i in productList.value) {
        const product = productList.value[i]
        products.push({ id: product._id, num: product.count })
      }
      // 把格式化好的订单数据提交给后端
      try {
        const result = await post('/api/order', {
          addressId: 1,
          shopId,
          shopName: shopName.value,
          isCanceled: isCanceled,
          products
        })
        if (result?.errno === 0) {
          if (!isCanceled) { store.commit('clearCartData', shopId) }
          router.push({ name: 'HomePage' })
        } else {
          console.log('2')
        }
      } catch (e) {
      }
    }

    return {
      price,
      handleConfirmOrder,
      showConfirm,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.bottom{
  position: absolute;
  bottom: 0;
  left:0;
  width: 100%;
  height: .5rem;
  font-size: .14rem;
  line-height: .5rem;
  background-color: $bgColor;
  display: flex;
  &__info{
    flex:1;
    margin-left: .24rem;
    &__price{
      font-size: .16rem;
    }
  }
  &__btn{
    background-color:$light-btn-color ;
    color: $bgColor;
    padding: 0 .24rem 0 .24rem;
  }
}
.mask{
  // z-index: 1;
  position: absolute;
  left: 0;
  right:0;
  bottom: 0;
  top:0;
  // background:rgba($color: #000000, $alpha: 0.5 );
  &__content{
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%); //相对自己尺寸移动
    background: $bgColor;
    width: 3rem;
    height: 1.56rem;
    border-radius: .04rem;
    text-align: center;
    &__title{
      margin:.24rem 0 .08rem 0;
      font-size: .18rem;
      line-height: .26rem;
      color: $content-font-color;
    }
    &__desc{
      font-size: .14rem;
      color:$medium-fontColor;
    }
    &__btns{
      display: flex;
      margin: .24rem .58rem 0 .58rem;
    }
    &__btn{
      flex:1;
      width:.8rem;
      height: .32rem;
      line-height: .32rem;
      border: .01rem solid $light-btn-color;
      border-radius: .16rem;
      font-size: .14rem;
      &--first{
        margin-right: .24rem;
        color: $light-btn-color;
      }
      &--last{
        background-color: $light-btn-color;
        color: $bgColor;
      }
    }
  }
  &__bg{
    z-index: 1;
    position: absolute;
    left: 0;
    right:0;
    bottom: 0;
    top:0;
    background:rgba($color: #000000, $alpha: 0.5 );
  }
}
</style>
