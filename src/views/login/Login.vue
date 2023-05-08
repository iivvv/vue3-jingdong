<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="请输入手机号" v-model="username">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password">
        </div>
        <div class="wrapper__login-button" @click="handleLogin">登录</div>
        <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
        <Toast v-if="show" :message="toastMessage"/>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
// import axios from 'axios'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// axios.defaults.headers.post['content-type']='application/json'

// 处理注册逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })

  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      // console.log(result)
      if (result?.errno === 0) {
        // alert('成功')
        localStorage.isLogin = true
        router.push({ name: 'HomePage' })
      } else {
        showToast('登录失败')
        // alert('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
      // alert('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'RegisterPage' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'LoginPage',
  components: { Toast },
  setup () { // 职责就是告诉你，代码执行的一个流程
    const { showToast, show, toastMessage } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()

    return {
      handleLogin,
      handleRegisterClick,
      showToast,
      password,
      username,
      show,
      toastMessage
    }
  }
  // const handleLogin = () => {
  //     // 用mock模拟请求
  //     axios.post('https://www.fastmock.site/mock/906ff864fc56b763bc652578a90bc62d/_test-01/api/user/login',{
  //         username:data.username,
  //         password:data.password
  //     }).then(()=>{
  //         alert('成功')
  //         localStorage.isLogin = true
  //         router.push({ name: 'HomePage' })
  //     }).catch(()=>{
  //         alert('失败')
  //     })

  //     // // 暂时不校验账号密码
  //     //   localStorage.isLogin = true
  //     //   router.push({ name: 'HomePage' })
  // }
  // 优化1
  // const handleLogin = async () => {
  //     try {
  //         const result = await axios.post('https://www.fastmock.site/mock/906ff864fc56b763bc652578a90bc62d/_test-01/api/user/login', {
  //             username: data.username,
  //             password: data.password
  //         })
  //         if (result?.data?.errno === 0) {
  //             alert('成功')
  //             localStorage.isLogin = true
  //             router.push({ name: 'HomePage' })
  //         } else {
  //             alert('登录失败')
  //         }

  //     } catch (e) {
  //         alert("请求失败")
  //     }
  // }

}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.wrapper {
    // background-color: #fff;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);

    &__img {
        width: .66rem;
        height: .66rem;
        display: block;
        margin: 0 auto .4rem auto;
    }

    &__input {
        background-color: #f9f9f9;
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        border: 1px solid rgba($color: #000000, $alpha: 0.1);
        border-radius: .06rem;
        padding: 0 .16rem;

        &__content {
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

    &__login-button {
        background-color: #0091ff;
        box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 225, 0.32);
        border-radius: .04rem;
        color: #fff;
        margin: .32rem .4rem .16rem .4rem;
        line-height: .48rem;
        text-align: center;
        font-size: .16rem;
    }

    &__login-link {
        font-size: .14rem;
        text-align: center;
        color: $content-notice-color;
        ;
    }
}
</style>
