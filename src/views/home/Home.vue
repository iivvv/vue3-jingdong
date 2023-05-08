<template>
  <div class="wrapper">
    <StaticPart/>
    <NearBy/>
  </div>
  <BottomDocker :currentIndex="0"/>
</template>

<script>
import StaticPart from './StaticPart.vue'
import NearBy from './NearBy.vue'
import BottomDocker from '../../components/Docker.vue'
export default {
  name: 'HomePage',
  components: { StaticPart, NearBy, BottomDocker }
}

</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0.18rem;
  overflow-y: auto;
}
</style>
