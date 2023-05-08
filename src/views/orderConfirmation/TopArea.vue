<template>
  <div class="top">
      <div class="top__header">
          <div class="iconfont top__header__back"
          @click="handleBackClick">&#xe600;</div>
          确认订单
      </div>
      <!-- 收货地址信息 -->
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹</span>
          <span class="top__receiver__info__phone">18811113333</span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe600;</div>
      </div>
    </div>
</template>

<script>
import { useBackRouterEffect } from '../../effects/routerEffects'
export default {
  name: 'TopArea',
  setup () {
    const handleBackClick = useBackRouterEffect()
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100%;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, $btn-bgColor 50%);
  &__header{
    position: relative;
    padding-top:.4rem ;
    line-height: .24rem;
    color: $bgColor;
    text-align: center;
    font-size: .16rem;
    &__back{
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }
  &__receiver{
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.1rem;
    background-color: $bgColor;
    border-radius: .04rem;
    &__title{
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      line-height: .22rem;
      color:$content-font-color;
    }
    &__address{
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      line-height: .2rem;
      color: $content-font-color;

    }
    &__info{
      padding: .06rem 0 0 .16rem;
      color: $medium-fontColor;
      &__name{
        font-size: .12rem;
        line-height: .18rem;
        margin-right: .06rem;
      }
    }
    &__icon{
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: $medium-fontColor;
      transform:rotate(180deg)
    }
  }
}
</style>
