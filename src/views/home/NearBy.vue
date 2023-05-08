<!-- <template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div
      class="nearby__item"
      v-for="item in nearbyList"
      :key="item._id"
    >
      <img :src="item.imgUrl" class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">{{item.name}}</div>
        <div class="nearby__content__tags">
          <span class="nearby__content__tag">月售: {{item.sales}}</span>
          <span class="nearby__content__tag">起送: {{item.expressLimit}}</span>
          <span class="nearby__content__tag">基础运费: {{item.expressPrice}}</span>
        </div>
        <p class="nearby__content__highlight">{{item.slogan}}</p>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <!-- <router-link to="/shop" v-for="item in nearbyList" :key="item._id">
        <ShopInfo :item="item" />
      </router-link> -->
    <router-link v-for="item in nearbyList" :key="item._id" :to="`/shop/${item._id}`">
      <ShopInfo :item="item" />
    </router-link>
    <!-- <ShopInfo
        v-for="item in nearbyList"
        :key="item._id"
        :item="item"
      /> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) { // 请求不出错且有数据时
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
// export default {
//   name: 'NearBy',
//   setup () {
//     // 静态页面用的写死数据
//     // const nearbyList = [{
//     //   id: 1,
//     //   imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
//     //   title: '沃尔玛',
//     //   tags: ['月售1万+', '起送¥0', '基础运费¥5'],
//     //   desc: 'VIP尊享满89元减4元运费券（每月3张）'
//     // }, {
//     //   id: 2,
//     //   imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
//     //   title: '沃尔玛',
//     //   tags: ['月售1万+', '起送¥10', '基础运费¥15'],
//     //   desc: '满89元减4元'
//     // }]
//     const nearbyList = ref([]) // 改成响应式数据
//     const getNearbyList = async () => {
//       const result = await get('/api/shop/hot-list')
//       // console.log(result)
//       if (result?.errno === 0 && result?.data?.length) {
//         nearbyList.value = result.data
//       }
//     }
//     // getNearbyList()
//     return { nearbyList, getNearbyList }
//   }
// }
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-font-color;
  }

  &__item {
    display: flex;
    padding-top: 0.12rem;

    &__img {
      display: block;
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }

  &__content {
    padding-bottom: 0.12rem;
    border-bottom: 1px solid $content-bg-color;
    flex: 1;

    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
    }

    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-font-color;
    }

    &__tag {
      margin-right: 0.16rem;
    }

    &__highlight {
      color: #e93b3b;
      margin: 0.08rem 0 0 0;
      font-size: 0.13rem;
      line-height: 0.18rem;
    }
  }

  a {
    text-decoration: none;
  }
}</style>
