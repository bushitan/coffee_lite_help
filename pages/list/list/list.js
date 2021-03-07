// pages_manager/seller/seller.js
var app = getApp()
Component({

    properties: {
    },
    data: {
        model: "",// 数据模型
        rule: {},// 规则
        list: [ ],
        count : 0,//数据总数


        limit:20,//每页数量
        pageIndex: 1 ,//当前第几页
        pageCount: 0 , //总页数
        inputPage:"", // 输入的页数

        showFilterDialog:false,
    },
    behaviors: [app.behaviors.cms,],
 
    
    // attached() {
    //     console.log("in temp")

    // },
    pageLifetimes: {
        show() {
            console.log("show temp")

        },
    },
    methods: {

        onLoad(options) {
            this.setData({ 
                model: options.model || "admin"
            })
            this.onInit()
        },
        async onInit() {
            // 初始化共享数据库
            app.cloud = new wx.cloud.Cloud({
                // 资源方 AppID
                resourceAppid: 'wx12dbd7b90d1260a8',
                // 资源方环境 ID
                resourceEnv: 'cup-wm-release',
            })
            await app.cloud.init().then(res => console.log(res))


            // 获取列表
            var res = await app.admin.map[this.data.model].getList(this.data.model)
            console.log(res)
            var list = res.result.data

            var res = await app.admin.map[this.data.model].getCount(this.data.model)
            console.log(res)
            var count = res.total

            // var res = await app.admin.getCount(this.data.model)
            // console.log(res)
            // 初始化配置
            this.setData({
                list: list ,
                count: count,
                // count: await app.admin.getCount(this.data.model),
                rule: app.admin.map[this.data.model],
                // displayList: this.data.userDispalyList,                
            })
        },


        toDetail(e){
            // console.log(e.currentTarget.dataset.detail_id)
            var detailId = e.currentTarget.dataset.detail_id
            var url = this.data.rule.detailUrl + "?detail_id=" + detailId
            wx.navigateTo({
                url: url,
            })
        },

        /*************页码*********** */
        //上一页
        backPage(){

        },
        //下一页
        frontPage() {

        },
        // 输入确认
        inputPageEvent(e){
            console.log()
            this.setData({ inputPage: e.detail.value})
        },
        // 确认跳转
        confirmToPage(){

        },



        /*************排序*********** */
        // 上移
        snTop() {

        },
        // 下移 
        snDown() {

        },



        /*************筛选*********** */
        // 打开对话框
        filterOpen() { this.setData({ showFilterDialog: true, }) },
        filterClose() { this.setData({ showFilterDialog: false, }) },
        // 确认查询
        filterConfirm(e){
            var form = e.detail.value
            console.log(form)
            //TODO  查询后更新列表
        },















        onSuccess: function (res) {
            console.log(res.detail);
        },
        onFail: function (res) {
            console.log(res);
        },





        getPhone(e) {
            console.log(e.detail)
        },


        editor(e) {
            console.log("编辑", e.currentTarget.dataset.index)
            var index = e.currentTarget.dataset.index
            var rule = this.data.rule
            var list = this.data.list
            var nodeIndexKey = rule.nodeIndexKey

            var param = rule.nodeIndexKey + "=" + list[index][nodeIndexKey]
            wx.navigateTo({
                url: '/pages/cms/node/node?' + param,
            })
        },


        del(e) {
            console.log("删除", e.currentTarget.dataset.index)
        },



        // 基础的分享页面功能
        // onShareAppMessage(res) {
        //     res = res || {}
        //     if (res.from === 'button') {
        //         // 来自页面内转发按钮
        //         console.log(res.target)
        //     }
        //     return {
        //         title: res.title || '欢迎进入分享集点卡商户端',
        //         path: res.path || '/pages/route/route',
        //         imageUrl: res.imageUrl || "../../images/icon_share_base_cup.png",

        //     }
        // },


        // /**
        //  * 用户点击右上角分享
        //  */
        // onShareAppMessage: function () {
        //     debugger
        // },

        // // onLoad: function (options) {
        // //     // 页面创建时执行
        // //     console.log("onLoad")
        // // },
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
        // onShareAppMessage: function () {
        //     // 页面被用户分享时执行
        //     console.log(" onShareAppMessage")
        // },
        // onPageScroll: function () {
        //     // 页面滚动时执行
        //     console.log(" onPageScroll")
        // },
        // onResize: function () {
        //     // 页面尺寸变化时执行
        //     console.log(" onResize")
        // },
    }
})