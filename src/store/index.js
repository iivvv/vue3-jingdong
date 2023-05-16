import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  // 避免初始化购物车时报错（当cartlist为undefined的时会报错）
  // if (localStorage.cartList) {
  //   return JSON.parse(localStorage.cartList)
  // } else {
  //   return {}
  // }
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
  // return JSON.parse(localStorage.cartList)||{}
}

export default createStore({
  state: {
    cartList: getLocalCartList()
    // cartList: {
    //   shopId: {
    //     shopName: '',
    //     totalCount:0,//计件
    //     productList: {
    //       productId: {
    //         //     _id: '1',
    //         //     name: '番茄250g/份',
    //         //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //         //     sales: 10,
    //         //     price: 33.6,
    //         //     oldPrice: 39.6,
    //         //     count: 2
    //       }
    //     }
    //   }
    // }
    // order: {
    //  orderNum: {
    //     shopId:00,
    //     shopName: '',
    //     isCanceled:true,
    //     allPrice:000,
    //     allCount:000,
    //     productImg: ['','','']
    //   }
    // }
  },
  getters: {},
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo

      // 计算数量
      const products = state.cartList[shopId].productList
      let totalCount = 0
      if (products) {
        for (const i in products) {
          const product = products[i]
          totalCount += product.count
        }
      }
      // console.log(totalCount)
      state.cartList[shopId].totalCount = totalCount
      // state.cartList[shopId].totalCount = 111
      // console.log(state.cartList[shopId].totalCount)
      setLocalCartList(state)
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeTotalCount(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload) {
      const { shopId, allChecked } = payload // 为什么传过来的参数allChecked是 undefined
      const products = state.cartList[shopId].productList

      let all = true
      if (products) {
        for (const i in products) {
          const product = products[i]
          if (product.count > 0 && !product.check) {
            all = false
          }
        }
      }
      // console.log(allChecked);
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = !all
        }
      }
      setLocalCartList(state)
    },
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {}
    }
  },
  actions: {},
  modules: {}
})
