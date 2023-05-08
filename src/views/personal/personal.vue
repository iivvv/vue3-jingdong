<template>
    <div class="wrapper">
      <div class="bgcolor"></div>
      <div class="user iconfont">&#xe614;</div>
      <div class="info">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="info__avatar">
        <h4 class="info__name">
          热心市民李先生
          <div class="info__level">
            <div class="info__level__icon iconfont">&#xe606;</div>
            <div class="info__level__num">16</div>
          </div>
        </h4>
        <div class="info__id">ID：106921839</div>
        <div class="info__list">
          <div class="info__list__item">
            <div class="info__list__title">红包</div>
            <div class="info__list__content">218</div>
          </div>
          <div class="info__list__item">
            <div class="info__list__title">优惠券</div>
            <div class="info__list__content">12张</div>
          </div>
          <div class="info__list__item">
            <div class="info__list__title">鲜豆</div>
            <div class="info__list__content">88</div>
          </div>
          <div class="info__list__item">
            <div class="info__list__title">白条</div>
            <div class="info__list__content">1000</div>
          </div>
        </div>

      </div>
      <div class="setting">
        <div class="setting__item">
          <div class="setting__item__icon iconfont icon-red">&#xe630;</div>
          <div class="setting__item__title">我的钱包</div>
          <div class="setting__item__go iconfont">&#xe600;</div>
        </div>
        <div class="setting__item">
          <div class="setting__item__icon iconfont icon-blue" >&#xe62c;</div>
          <div class="setting__item__title">我的地址</div>
          <div class="setting__item__go iconfont">&#xe600;</div>
        </div>
        <div class="setting__item">
          <div class="setting__item__icon iconfont icon-purple">&#xe613;</div>
          <div class="setting__item__title">客服与帮助</div>
          <div class="setting__item__go iconfont">&#xe600;</div>
        </div>

      </div>
    </div>
    <BottomDocker :currentIndex="3" class="docker"/>
</template>

<script>
import BottomDocker from '../../components/Docker.vue'
export default {
  name: 'personal',
  components: { BottomDocker }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: $bgColor;
  overflow: hidden;
}
.bgcolor{
  z-index: 1;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-75%);
  background-image: linear-gradient(239deg, #3A6FF3 10%, #50C7FB 100%);
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
}
.user{
  position: absolute;
  z-index: 2;
  top: .6rem;
  right:.2rem;
  font-size: .22rem;
  color: $bgColor;
}
.info{
  position: relative;
  z-index: 2;
  margin: 1.08rem .18rem .1rem .18rem;
  background-color: $bgColor;
  border-radius:.08rem ;
  height: 2rem ;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.08);
  &__avatar{
    position: absolute;
    left:50%;
    transform: translate(-50%,-50%);
    height: .94rem;
    width: .94rem;
  }
  &__name{
    padding: .6rem 0 0 0 ;
    margin-bottom: .02rem;
    font-size: .24rem;
    font-weight: lighter;
    text-align: center;
    color: #262628;
    font-family: PingFangSC-Regular;
    letter-spacing: 0.19px;
    line-height: 36px;
  }
  &__level{
    position: absolute;
    top: .7rem;
    right: .35rem;
    display: flex;
    padding: 0 .02rem;
    // margin: .11rem 0 .11rem .12rem;
    height: .15rem;
    width: .35rem;
    background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
    border-radius: .08rem;
    &__icon{
      color: #FFC700 ;
      // font-size: .15rem;
      position: relative;
      top: -.1rem;
    }
    &__num{
      // padding: .2rem .1rem .2rem .1rem;
      // flex: 1;
      color: $bgColor;
      font-size: 0.2rem;
      transform: scale(0.5, 0.5);
      line-height: .15rem;
    }
  }
  &__id{
    margin: 0 0 .12rem 0;
    text-align: center;
    color: #C1C0C9;
    font-size: .14rem;
    line-height: .17rem;
  }
  &__list{
    display: flex;
    border-top: .01rem solid $content-bg-color;
    padding: .12rem;
    // background-color: #BEE700;
    // height: ;
    &__item{
      flex: 1;
      text-align: center;
    }
    &__title{
      color:#C1C0C9;
      font-size:.12rem ;
    }
    &__content{
      color:#262628 ;
      font-size:.2rem ;
      margin-top: .08rem;
    }
  }
}
.setting{
  position: relative;
  display: flex;
  // justify-content:center;
  flex-direction:column;
  z-index: 2;
  margin: .16rem .18rem .1rem .18rem;
  background-color: $bgColor;
  border-radius:.08rem ;
  height: 1.46rem ;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.08);
  &__item{
    // margin: .2rem .16rem 0 .16rem;
    padding: 0 .16rem 0 .16rem;
    flex: 1;
    display: flex;
    align-items:center;
    color: #262626;
    line-height: .22rem;
    // position: relative;
    &__icon{
      font-size: .26rem;
    }
    &__title{
      margin-left: .12rem;
      font-size: .14rem;
      height: .22rem;
    }
    &__go{
      position: relative;
      transform: rotate(180deg);
      flex-grow:2;
      color: #C2C4CA;
    }
  }
}
.icon{
  &-red{
    color: #ED4A47 ;
  }
  &-blue{
    color: #32C5FF ;
  }
  &-purple{
    color: #9013FE;
  }
}

</style>
