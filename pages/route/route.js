// pages_manager/seller/seller.js
var app = getApp()

var admin = require("../../lib/admin/admin.js")

Component({
    properties: {},

    data: {

      
    },
    behaviors: [app.behaviors.config],


    observers: {

    },

    attached() {
        // this.autoMath()
    },


    methods: {

     
        // 全局初始化函数
        async onLoad(){



            // 初始化共享数据库
            app.cloud = new wx.cloud.Cloud({
                // 资源方 AppID
                resourceAppid: 'wx12dbd7b90d1260a8',
                // 资源方环境 ID
                resourceEnv: 'cup-wm-release',
            })
            await app.cloud.init().then(res => console.log(res))

            
            app.admin = admin

            await app.admin.getMap()
            
            this.nav()
        },



        nav(){

            var foreignIdList = JSON.stringify( ["79550af260435f87089d72cd7e4db0a2"] )
            wx.redirectTo({
                // url: '/pages/list/list',
                url: '/pages/list/list?isForeign=true&model=admin&foreignIdList=' + foreignIdList,

                
            })
        },


 















        // clickOperation(e){
        //     var index = e.currentTarget.dataset.index
        //     var operation = this.data.operationList[index]
        // },

        // clickQuery(e) {
        //     var index = e.currentTarget.dataset.index
        //     var query = this.data.queryList[index]
        // },

        // clickStat(e) {
        //     var index = e.currentTarget.dataset.index
        //     var stat = this.data.statList[index]
        // },


        // clickProduct(e) {
        //     var index = e.currentTarget.dataset.index
        //     var product = this.data.productList[index]
        // },
        // clickERP(e) {
        //     var index = e.currentTarget.dataset.index
        //     var erp = this.data.erpList[index]
        // },
        // /**
        //  * 用户点击右上角分享
        //  */
        onShareAppMessage: function () {

        },

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