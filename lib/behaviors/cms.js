
/**
 * 这里是CMS系统 配置的优化问题
 * 1、 统一主键为  _id  （django也是如此）
 * 2、 统一外键显示的字段为 name （django 可以配置，后期考虑配置，但倾向用name来表示外键）
 * 
 * 数据结构
 * 1、除了数组，还需要考虑对象数组
 * 
 * product和sku单独写
 * 单个对象的，可以直接使用配置页面完成。
 */

var app
module.exports = Behavior({
    data: { 
        
        userList: [
            { 
                id: 1, name: '集点卡用户1', 
                logo:'http://img.12xiong.top/coffee_image/upload/EUSZn6fZ.jpg',
                tag: ["咖啡", "植物奶",] ,
                shopHost:11,
                shopHostName:"seeking 鲤湾店",
                shopList: [{ id: 11, name: 'seeking 鲤湾店' }, { id: 12, name: 'seeking 桃源路店' }, ] },
            { 
                id: 2, name: '不是探',
                logo: 'http://img.12xiong.top/coffee_image/upload/eyJZD6fZ.jpg',
                tag: ["火爆", "美食",], shopList: [{ id: 12, name: 'seeking 桃源路店' }, { id: 13, name: 'strong 康普店' },] },
        ],

        userRule:{
            nodeIndexKey: "id", // 传入的索引位置
            displayList: [
                { name: "ID", key: 'id', type: "number" },
                { name: "头像", key: 'logo', type: "image" },
                { name: "名字", key: 'name', type: "text" },
                { name: "标签", key: 'tag', type: "array", },
                { name: "门店列表", key: 'shopList', type: "arrayObj", objKey: "name", },
            ],

            // 详情页配置字段
            fieldsets: [
                { 
                    name: "基础", 
                    fields: [
                        { name: "ID", key: 'id', type: "number", isNull: true, desc: "填写ID", disabled:false, },
                        
                    ] 
                },
                { 
                    name: "名字", 
                    fields: [ 
                        { name: "名字", key: 'name', type: "text" },
                        { name: "头像", key: 'logo', type: "image", },
                        { name: "标签", key: 'tag', type: "array", },
                    ] 
                },
                {
                    name: "外键",
                    fields: [
                        { name: "门店店主", key: 'shopHost', type: "foreign", descKey: "shopHostName", model: "shop", }, 
                        { name: "访问门店", key: 'shopList', type: "m2m", model: "relUserShop", }, 
                    ]
                },
            ]
        },








        shopList: [
            { id: 11, name: 'seeking 鲤湾店' },
            { id: 12, name: 'seeking 桃源路店' },
            { id: 13, name: 'strong 康普店' },
        ],
        shopRule: {
            nodeIndexKey: "id", // 传入的索引位置
            displayList: [
                { name: "ID", key: 'id', type: "number" },
                { name: "名字", key: 'name', type: "text" },
            ],
            // 详情页配置字段
            fieldsets: [
                 
            ]
        },




        productList: [
            { id: 21, name: '伊丽莎白拿铁', shopList: [{ id: 11, name: 'seeking 鲤湾店' }, { id: 12, name: 'seeking 桃源路店' },] },
            { id: 22, name: 'STRONG', shopList: [  { id: 12, name: 'seeking 桃源路店' },] }, 
        ],


        productDispalyList: [
            { name: "ID", key: 'id', type: "number" },
            { name: "名字", key: 'name', type: "text" },
            { name: "门店列表", key: 'shopList', type: "arrayObj", objKey: "name", },
        ],

        // relUserShop: [
        //     { userID: 1, shopID: 11 },
        //     { userID: 1, shopID: 12 },
        //     { userID: 2, shopID: 12 },
        //     { userID: 2, shopID: 13 },
        // ],
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
 
        this.initCMS()
    },
    methods: {
        /**
         * @method 初始化配置
         */
        initCMS() {
         
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