<template>
  <div class="wrapper">
    <TopArea/>
    <ProductList/>
    <BottomOrder/>
  </div>
</template>

<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import BottomOrder from './BottomOrder.vue'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, BottomOrder },
  setup () {

  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
}

</style>
