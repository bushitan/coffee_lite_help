
var app
module.exports = Behavior({
    data: {
        // list: [],
        // tabCur: 0,
        // mainCur: 0,
        // verticalNavTop: 0,

        config: {}, // 全局配置
    },



    // // 监听器
    // observers: {
    //     // 全局生成config配置参数
    //     'configBase': function (config) {
    //         // TODO 检查配置文件是否完整，不完整，在这里补充
    //         this.setData({
    //             config: config
    //         })

    //     }

    // },

    //准备完成
    ready() {
        app = getApp()
        
        // this.setData({
        //     configBase: app.configBase,
        // })
        this.initConfig()
    },
    methods: {
        /**
         * @method 初始化配置
         */
        initConfig() {
            this.setData({ config: app.globalData.config})
            this.setConfig()
            // 设置标题
            // wx.setNavigationBarTitle({
            //     title: this.data.config.window.navigationBarTitleText,
            // })
            // wx.setNavigationBarColor({
            //     frontColor: this.data.config.window.navigationBarTextStyle,
            //     backgroundColor: this.data.config.window.navigationBarBackgroundColor,
            // })
        },


        setConfig() {
            app.config = {
                //路由页面配置
                route: {
                    defaultPage: "/pages/menu/menu?shopID=97", //默认进的页面
                    // defaultShopID: "", //展示的门店号
                    image: "cloud://cup-wm-release.6375-cup-wm-release-1302028748/image/loading.jpg",//route欢迎海报
                    btnClass: "line-white",
                    btnText: "Seeking 欢迎您",
                },
                //品牌配置
                brand: {
                    logo: "/images/logo.png",//品牌名字
                    name: "",//品牌名字
                    list: [
                        {
                            name: "", //门店名字
                            shopID: "", //门店的id
                            address: "",
                            tel: "",
                            longitude: 0,
                            latitude: 0,
                        },
                    ],
                },
                //图标配置
                icon: {
                    cart: "/images/logo.png", //购物车按钮
                    add: "/images/icon/add.png", //增加按钮
                    cut: "/images/icon/cut.png", //增加按钮
                },
                // 主题色彩配置 -- 默认黄色
                theme: this.data.shopID == 99 ? "theme-olive" : "theme-yellow",
                themeAdmin: "theme-yellow", // 商户端的颜色
                // 窗口配置
                window: {
                    "navigationBarBackgroundColor": "#efaf30",
                    "navigationBarTextStyle": "#ffffff", // #000000  #ffffff 二选一
                    "navigationBarTitleText": "小杯子配置",
                    "backgroundColor": "#ffffff",
                    "backgroundTextStyle": "light"
                },
                // 基础分享页面配置
                share: {
                    title: "",
                    path: "",
                    imageUrl: "",
                },
                //订单--分类配置
                order: {
                    tab: [
                        { id: 0, name: "未支付" },
                        { id: 1, name: "待使用" }, //待发货  || 待接单
                        // { id: 2, name: "已完成" }, //已发货  || 制作中 || 配送中
                        { id: 3, name: "已完成" },
                        { id: 4, name: "退款" },
                    ],
                },
                footer: {
                    text: "Copyright © 2020 索骏科技提供技术支持"
                },

                // TODO 想到什么，就加到配置表上
                // coupon
            }
            this.setData({ config: app.config })

            // wx.setStorageSync('config', app.config)
        },


        // 基础的分享页面功能
        onShareAppMessage(res) {
            res = res || {}
            if (res.from === 'button') {
                // 来自页面内转发按钮
                console.log(res.target)
            }
            return {
                title: res.title || '欢迎进入XX点单系统',
                path: res.path || '/pages/route/route',
                imageUrl: res.imageUrl || "../../images/icon_share_base_cup.png",
            }
        },


        // onLoad: function (options) {
        //    // 页面创建时执行 组件内不触发
        //     console.log("onLoad")
        // },
        // onShow: function () {
        //     // 页面出现在前台时执行
        //     console.log(" onShow")
        // },
        // onReady: function () {
        //     // 页面首次渲染完毕时执行
        //     console.log(" onReady")
        // },
        // onHide: function () {
        //     // 页面从前台变为后台时执行
        //     console.log("onHide ")
        // },
        // onUnload: function () {
        //     // 页面销毁时执行
        //     console.log("onUnload ")
        // },
        // onPullDownRefresh: function () {
        //     // 触发下拉刷新时执行
        //     console.log(" onPullDownRefresh")
        // },
        // onReachBottom: function () {
        //     // 页面触底时执行
        //     console.log("onReachBottom ")
        // },
        // onPageScroll: function () {
        //     // 页面滚动时执行
        //     console.log(" onPageScroll")
        // },
        // onResize: function () {
        //     // 页面尺寸变化时执行
        //     console.log(" onResize")
        // },
    },


    // created() {
    //     console.log("created")
    // },
    // attached() {

    // },
    // detached() {
    //     console.log("detached")
    // },
    // moved() {
    //     console.log("moved")
    // },


    // // 可以不用
    // pageLifetimes: {
    //     // 组件所在页面的生命周期函数
    //     show: function () { console.log("show") },
    //     hide: function () { console.log("hide") },
    //     resize: function () { console.log("resize") },
    // },

    // // 可以不用
    // lifetimes: {
    //     // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    //     attached: function () { },
    //     moved: function () { },
    //     detached: function () { },
    // },
})