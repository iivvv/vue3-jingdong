<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
        <div class="wrapper__input">
            <input type="text" class="wrapper__input__content" placeholder="请输入手机号">
        </div>
        <div class="wrapper__input">
            <input  class="wrapper__input__content" type="password" placeholder="请输入密码">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="确认密码">
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
        <Toast v-if="show" :message="toastMessage" />
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })

  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'LoginPage' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      // console.log(e)
      showToast('请求失败')
    }
  }

  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

// 处理登陆跳转
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'LoginPage' })
  }
  return { handleLoginClick }
}

export default {
  name: 'RegisterPage',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return {
      username,
      password,
      ensurement,
      show,
      toastMessage,
      handleRegister,
      handleLoginClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper{
    // background-color: #fff;
    position: absolute;
    top:50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img{
        width: .66rem;
        height: .66rem;
        display: block;
        margin: 0 auto .4rem auto;
    }
    &__input{
        background-color: #f9f9f9;
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        border: 1px solid rgba($color: #000000, $alpha: 0.1);
        border-radius: .06rem;
        padding: 0 .16rem;
        &__content{
            width: 100%;
            line-height: .48rem;
            font-size: .16rem;
            border: none;
            background: none;
            outline: none;
            color: $content-notice-color;
            // background-color: aqua;
        }
    }
    &__register-button {
        background-color: #0091ff;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,225,0.32);
        border-radius: .04rem;
        color: #fff;
        margin: .32rem .4rem .16rem .4rem;
        line-height: .48rem;
        text-align: center;
        font-size: .16rem;
    }
    &__register-link{
        font-size: .14rem;
        text-align: center;
        color: $content-notice-color;;
    }
}
</style>
