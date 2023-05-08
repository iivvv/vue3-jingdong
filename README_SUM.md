# 总结

### 流程：

#### 1.初始化

脚手架初始化

环境配置：eslint、vetur

清除默认样式：normalize.css --legacy-peer-deps

#### 2.页面样式布局

响应式尺寸：fontsize、rem

还原设计稿

#### 3.功能：数据/逻辑/路由

axios

Vue3 的 ref、toRefs、、toRef、reactive 创建响应式对象

vuex 数据管理

vue-router 路由设置

#### 4.代码优化：可读性、复用性、模块化、组件化

将某某相关功能代码封装到 useXxxxEffect  ，setup 负责导入和顺序执行。

axios请求封装到src>utils>request.js

多个页面通用的组件封装到src>components，其他的写在当前views文件夹下



### CSS：

使用 vuejs 的scoped style `<style lang="scss" scoped>`

类名使用BEM命名规范：`class='block__element--modifier'`

使用CSS预处理器“SCSS”，SCSS（SCSS 是 Sass 3 引入新的语法）在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能

图标字体 iconfont.cn

响应式尺寸：fontsize、rem

文件结构：

```js
src>style

index.scss
base.scss
iconfont.css
mixins.scss
variables.scss
```





# 项目搭建过程记录

## 0-准备

#### 1.工程初始化

使用脚手架初始化项目，并整理（删掉vue页面相关内容）

#### 2.环境配置

插件：eslint、vetur

搜包网站：https://www.npmjs.com/

包：normalize.css（统一不同浏览器的样式差异

![image-20221114224914440](/Users/puluotagela/Library/Application Support/typora-user-images/image-20221114224914440.png)

——安装normalize.css的报错解决方法：

--legacy-peer-deps

#### 3.清除默认样式

引入normalize.css

写点样式测试



## 一、首页(样式)

#### 底部菜单docker

![image-20221122204619371](/Users/puluotagela/Library/Application Support/typora-user-images/image-20221122204619371.png)

##### 1.布局尺寸边框

用rem，先给html设置font-size=100px方便换算

（为什么要设置border-sizing，怎么不设置会多一个下边距的

![image-20221122204407911](/Users/puluotagela/Library/Application Support/typora-user-images/image-20221122204407911.png)

![image-20221122204342952](/Users/puluotagela/Library/Application Support/typora-user-images/image-20221122204342952.png)

##### 2.图标iconfont

https://www.iconfont.cn/

选择图标——添加到购物车——添加到项目——下载——复制代码`@font-face`、`.iconfont {`——挑选相应图标并获取字体编码，应用于页面`<span class="iconfont">&#x33;</span>`

bug：iconfont用unicode引用方式使用，图标显示不出来![image-20221122225644989](/Users/puluotagela/Library/Application Support/typora-user-images/image-20221122225644989.png)

原因：

![image-20221123000051570](/Users/puluotagela/Library/Application Support/typora-user-images/image-20221123000051570.png)

红色：两处名字要一致；

蓝色：用的时候属性名要一致；

黄色：下载下来的demo.css的远程链接是错的要去网站上复制正确的链接（iconfont.css里是本地地址）

##### 3.图标选中样式

BEM的class命名规则: block__element--modifier

#### 顶部地址条

地址图标不完全垂直居中——手动相对定位调整

样式不生效——检查计算优先级调整一下优先级

#### 搜索

细节在于文字垂直居中

#### banner

图片加载过程需要防抖——提前用padding-bottom撑开高度

#### 图标列表

img行内块元素，可以设置宽高，但要设置居中要转成块元素

#### 附近店铺

写样式时注意嵌套的层级

#### 代码优化

##### 拆分组件

先从app拆出去

Views——home——home.vue

再拆：顶部静态页面、附近店铺、底部

name不写的话会以文件名为组件名，影响vue devtool的组件名显示（还影响别的吗？

##### 拆出数据

把可以通过v-for遍历出来的dom节点都整理一下，减少代码量

v-for可以嵌套

结合模板字符串，给图片地址的部分内容绑定变量

```vue
 <img
                :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
                class="icons__item__img"
```



## 二、登录注册（样式、路由守卫登录校验、axios后端联调）

#### 登录页面（布局样式、路由）

##### 1.布局样式

绝对定位居中技巧

input样式border outline background

input外为什么要包一层？

Input placeholder

###### 常用颜色设成变量

##### 2.路由设置

##### 2.1根据地址跳转页面

router——index.js 设置routes

##### 2.2路由守卫实现基础登录校验功能

###### 页面跳转之前验证登录权限

`router.beforeEach((to, from, next) => {`

在路由跳转的时候调用这个api，

判断是否登录，if已登录就跳转到首页，else跳去登录页面——用判断localStorage.isLogin

用登录按钮的点击事件控制登录权限isLogin（暂时不校验登录密码）

###### 登录后自动跳转到首页

```js
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({ name: 'HomePage' })  
// 这个push是为啥 路由都有哪些方法
```

###### 登录后不让再访问登录页面

```js
const { isLogin } = localStorage
      isLogin ? next({ name: 'HomePage' }) : next()
```



此处所用路由知识点总结：

- 局部跳转校验：`beforeEnter (to, from, next) { } `//跳转到某页面前执行

- 全局跳转校验：`router.beforeEach((to, from, next) => { } `

- 获取路由实例，由js实现路由跳转：

  ```vue
  import { useRouter } from 'vue-router'
  const router = useRouter()
  router.push({name:'xxx' })
  ```

#### 注册页面——

新页面:写组件——设置路由——组件中的路由跳转事件——修改细节（密码打码、登录页细节修改）

优化——

因为注册和登录页面非常相似，可以写在一个文件里节约代码量，通过判断某个条件显示注册还是登录

但是写在一起未来扩展性会弱一点

根据情况来（如果登录注册差不多就可以写一起



#### 登录页面调用接口完善——

##### Axios调用后端接口——

自己写一个模拟的后端接口放在mock网站中(fastmock在线接口mock平台https://www.fastmock.site/#/)，现在用的是模拟假数据，因为后端可能还没写完，暂时给一个可以用的。

```json
/*
输入：
content-type: json
body {
username:'18611112222',//注册手机号 
password:'Xxx'
}
*/
{
  errno: 0,
  message:'errno!==0 时的错误信息'
}
```



```js
const handleLogin = () => {
	axios.post('https://www.fastmock.site/mock/906ff864fc56b763bc652578a90bc62d/_test-01/api/user/login',{
            username:data.username,
            password:data.password
        }).then(()=>{
            alert('成功')
            localStorage.isLogin = true
            router.push({ name: 'HomePage' })
        }).catch(()=>{
            alert('失败')
        })
}
```

结合数据双向绑定保存账号密码



##### 请求优化——

###### 1.用async await 

vue3支持了async await

```js
const handleLogin = async () => {
	try{
		const result = await axios.post('https://www.fastmock.site/mock/906ff864fc56b763bc652578a90bc62d/_test-01/api/user/login',{
            username:data.username,
            password:data.password
        })
		if(result?.data?.errno === 0){
			alert('成功')
      localStorage.isLogin = true
      router.push({ name: 'HomePage' })
		}else{
			alert('登录失败')
		}

	}catch(e){
		alert("请求失败")
	}
}
```

###### 2.封装请求函数

下次发送请求的时候就不用写一大段代码了

在src文件夹下新建utils文件夹-request.js

还能自动拼接baseURl和url

```js
import axios from 'axios'

export const post = (url,data={})=>{

    return new Promise((resolve,reject)=>{
        axios.post(url,data,{
            baseURL:'https://www.fastmock.site/mock/906ff864fc56b763bc652578a90bc62d/_test-01'
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            resolve(response)
        },err=>{
            reject(err)
        })
    })

}
```

###### 3.小优化：返回response.data而不是response一整个对象

```js
}).then((response)=>{
            resolve(response.data)
  
  
  
  if (result?.data?.errno === 0) {
  //优化为
  if (result?.errno === 0) {
```

让oc？可选链运算符 语法变得更简洁



##### toast弹窗组件——

用一个全局通用组件来美化登录失败的alert弹窗

1.写组件样式

2.引入注册组件

3.交互逻辑

失败时显示组件：v-if

根据情况显示内容：父子组件通信绑定变量

弹窗1秒钟后消失：setTimeout

4.优化：重复代码写成函数来复用



##### 优化：代码拆分增加逻辑可读性维护性——

###### 引入顺序：

系统级别引入放在最顶上，自己写的引入放底下

###### 使用toRefs 减少属性深度

https://juejin.cn/post/7034038818139275294

###### 拆分功能函数,setup只保留代码执行流程：

1.toast弹窗相关的逻辑挪出去写在 useToastEffect函数里，把数据和方法return出去，再引入到setup里用。或者直接挪到toast组件里。

```js
const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.showToast = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 1000)
  }
  return { toastData, showToast }
}

setup(){
 const { showToast, toastData } = useToastEffect()
 ...
 }
```

2.login相关逻辑也同样写在useLoginEffect函数里

#### 注册页面调用接口完善——

逻辑和登录差不多，多一个确认密码

实际开发中这两个页面没必要分开写，代码大量重复。

路由页面写错了会报错



还有一些细节没写：手机号和密码输入不能为空、确认密码



## 三、商家展示+购物车

#### 修改首页附近店铺，从后端获取店铺数据（axios get）

封装一个get请求,获取后端数据

```js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/906ff864fc56b763bc652578a90bc62d/_test-01',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
```

把之前写死的商家数据删掉，换成从后端接口取出来的数据。

所以nearbyList得改成响应式数据

```js
const nearbyList = ref([])
```

根据后端接口的属性名还要修改template里的对应属性

#### 点击首页的某一附近店铺进入商家详情（布局、路由跳转）

##### 设置商家详情路由

新建组件再设置路由

##### 路由设置优化：同步改成异步

首页、商家详情、登录、注册路由不需要一起加载，用到再加载——异步路由、动态路由、路由懒加载

```js
const routes = [{
    path: '/shop',
    name: 'ShopPage',
    component: ShopPage  //同步
  },

const routes = [{
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')  //异步
  },
```

#### 商家详情页面布局

##### 首页的店铺介绍可复用到商家详情页——拆离代码变成组件ShopInfo

复用之后注意样式细节调整——

边距

：class+hideBorder控制横线



##### 顶部搜索

###### 1布局样式：

颜色重复的设成变量

###### 图标字体：

去iconfont再加几个图标到项目文件夹里，更新的iconfont CDN地址

###### 点击返回按钮，路由跳转回首页

```js
const router = useRouter()
const handleBackClick = () => {
      router.back()
    }
```

###### 4 首页点击店铺，路由跳转到商家详情页面

```HTML
<router-link to="/shop" v-for="item in nearbyList" :key="item._id">
      <ShopInfo :item="item" />
</router-link>

需要再css里把超链接下划线去掉
```

**路由参数传递**

10-6-7

1 点击店铺时，把从后端获取的店铺id传给路由，根据店铺id跳转到对应店铺页面

```js
{
    path: '/shop/:id', //:id  路由传参
    name: 'ShopPage',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
    
    
     <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`" //路由参数设置
    >
```

2 对应店铺页面通过`route` `${route.params.id}`获取路由上的id参数，再去后端获得数据

```js
import { useRoute } from 'vue-router'
...
const route = useRoute()
...
const result = await get(`/api/shop/${route.params.id}`)
...
```

###### 5 代码优化 10-7

功能拆离

图片加载优化 ， 避免图片因加载而闪烁，利用v-show使图片成功加载时才显示

```vue
v-show="item.imgUrl"
```



##### 中间内容

###### 1 样式 

![image-20230403143404959](/Users/puluotagela/Library/Application Support/typora-user-images/image-20230403143404959.png)

###### 2 内容&逻辑

axios获取当前店铺id、左侧目录tab下的商品详情数据

![image-20230402032114515](/Users/puluotagela/Library/Application Support/typora-user-images/image-20230402032114515.png)

```js
// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab) => {
  const route = useRoute()
  const shopId = route.params.id
  const content = reactive({ list: [] })
  // 获取对应店铺id下的商品数据
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }

  watchEffect(() => { getContentData() })

  const { list } = toRefs(content)
  return { list }
}
```



tab列表切换

```js
// Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}
```



##### 底部购物车 

###### 1 组件样式 



###### 2 vuex购物车数据结构设计

购物车数据很多页面都需要用，所以需要存到全局数据里。

数据结构如何设计？根据什么分层级？

```js
shopid:{
  item1:{
    name:'',
    price:'',
    count:''
  },
  item2:{
    
  }
}
```

###### 3 数据交互

- 点- + 修改购物车中商品数量，-的时候注意数量不能小于0

  写成2个函数有点冗余，可以写成一个函数，通过参数来加减

（oc语法？.避免数据结构还没创建时报错）

获取store里的数据：`toRefs(store.state)`

更改store数据:`store.commit("",{})` `mutations:{}`

修改数据之前先判断数据是否存在，不存在就设成{ }

```html
<div class="product__number">
            <span class="product__number__minus">-</span>
  
            {{cartList?.[shopId]?.[item._id]?.count || 0}}
            <span class="product__number__plus"
            @click="() => { addItemToCart(shopId, item._id, item) }">+</span>
</div>
```

```js
// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const addItemToCart = (shopId, productId, productInfo) => {
    store.commit('addItemToCart', {
      shopId, productId, productInfo
    })
  }
  return { cartList, addItemToCart }
}
```

```js
 mutations: {
    addItemToCart (state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += 1
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    }
  },
```

- computed完成购物车总数和总价计算

  ```js
  // 获取购物车信息逻辑
  const useCartEffect = () => {
    const store = useStore()
    const route = useRoute()
    const shopId = route.params.id
    const cartList = store.state.cartList
  
    const total = computed(() => {
      const productList = cartList[shopId]
      let count = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          count += product.count
        }
      }
      return count
    })
  
    const price = computed(() => {
      const productList = cartList[shopId]
      let count = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          count += (product.count * product.price)
        }
      }
      return count.toFixed(2) // 保留小数点后两位
    })
    return { total, price }
  ```

  

###### 点击购物车展开购物车商品详情,并出现黑色遮罩

在底部购物车上方增加商品详情，template v-for  、v-if 当商品数量>0时才显示

购物车商品详情数据和内容区商品数据双向绑定 

store获取/修改购物车数据相关逻辑不止这里会用到，其他页面也会用到——抽离出来封装

再优化一下代码，位置、导出。



###### 购物车选中状态

新的iconfont

增加样式

增加属性check来存储选中状态

图标根据check来显示选中/不选中



###### 点击选中图标切换选中状态，影响计算商品总价



###### 全选/清空购物车



###### 细节优化



###### 修改数据结构 因为订单页面需要新的数据-店铺名字



###### 首页docker路由跳转设置



##### bug合集

npm run serve 变成了空白页面 。。。不知道为啥。。。

```js
//因为清除本地缓存之后，cartlist初始化失败 undefined会报错 不会返回{}了
//所以不能用逻辑运算，得用if else处理
const getLocalCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList)
  } else {
    return {}
  }
  // return JSON.parse(localStorage.cartList)||{}
}
```

控制是否全选的参数allChecked为什么传给vuex之后不会动态变化了？只能在vuex里重新算

清空购物车之后加入一件商品会自动显示购物车详情，咋阻止？



## 四、去结算跳转到-确认订单页面

### 路由

去结算跳转的时候路由要传递【当前店铺id】

```html
<router-link :to="{name: 'OrderConfirmation'}">
        <div class="check__btn">
          去结算
        </div>
</router-link>

//传参写法
<router-link :to="{path: `/orderConfirmation/${shopId}`}">
        <div class="check__btn">
          去结算
        </div>
</router-link>
```



### 样式布局

<img src="/Users/puluotagela/Library/Application Support/typora-user-images/image-20230413205623046.png" alt="image-20230413205623046" style="zoom:33%;" />

#### 顶部布局-收货地址

#### 中间布局-商品列表

##### 需要获取商品数据productlist进行列表渲染

——之前获取过，抽出到公共js( 新建一个effects文件夹)里复用

（mock商品列表的后端接口）

![image-20230417144530914](/Users/puluotagela/Library/Application Support/typora-user-images/image-20230417144530914.png)

##### 写样式布局





#### 底部布局-提交订单

##### 样式布局

##### 响应式数据获取

——total, price 移到公用js里复用



#### 代码优化：组件拆分，样式用变量

TopArea、ProductList、BottomOrder



#### 交互展示细节逻辑

##### 顶部返回按钮

##### 商品列表点击展开

overflow



##### 提交订单交互——确认弹窗

###### 样式

###### 按钮点击事件绑定

###### 提交订单后端接口post请求

根据接口要求的参数类型传参

提交成功后，清除购物车

###### 取消订单

![image-20230420203919716](/Users/puluotagela/Library/Application Support/typora-user-images/image-20230420203919716.png)





Bug:

v-if控制数量为0的商品不显示时，不显示的元素的margin依然占位

解决方法：template控制循环，div 写v-if



## 页面4-订单

布局样式

数据





## 页面5-我的

布局样式





## 不同设备适配

#### 1 采用rem单位

```css
>src>style>base.scss

html{
  font-size:100px;
}
body{
	font-size:.12rem; //.12rem = 12px
}
```

#### 2 根据设计图所使用的屏幕尺寸，等比例放大至其他设备

```js
>public>index.html

      //当前设备屏幕宽度
      var width = document.documentElement.clientWidth || document.body.clientWidth
      //与设计稿使用屏幕尺寸之比
      var ratio = width / 375
      //修改不同设备下的基础字体大小
      var newFontsize = 100 * ratio
      document.getElementsByTagName('html')[0].style['font-size']= newFontsize +'px'
```



## scss优化css

#### 优化css选择器嵌套写法

- 允许选择器里嵌套着写，&占位

  嵌套多了的时候一定要注意层级是否正确

```scss
.docker {
  width: 100%;
  &__item { //.docker__item
    text-align: center;
    .logo {//.docker.logo
      font-size: 0.18rem;
    }
    &--active {//.docker__item--active
      color: rgb(32, 162, 249);
    }
  }
  &__title {//.docker__title
    font-size: 20px;
  }
}
```

#### 样式拆分成多个文件

- scss可以引入scss `@import ' ';`  把样式文件都引入index.scss（入口文件）里

#### 变量

定义变量 $variables：主题色

```scss
variables.scss
$content-font-color:#333;

app.vue
<style lang="scss">
@import './style/variables.scss';
.position{
  color: $content-font-color;
}
```

#### mixin

把一些通用功能封装成mixin：文字过长缩略展示。`@import`导入 `@include`使用

```scss
mixin.scss
//文字过长缩略...
@mixin ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

app.vue
<style lang="scss">
@import './style/mixins.scss';
.position{
  @include ellipsis;
}
```





## 相关链接

##### npm搜包

https://www.npmjs.com/

##### iconfont

https://www.iconfont.cn/

##### 文本对比

http://www.jsons.cn/txtdiff/


