// pages_manager/seller/seller.js
var headerBehaviors = require("js/header.js")
var footerBehaviors = require("js/footer.js")
var app = getApp()
Component({

    properties: {
    },
    data: {
        isForeign:false,

        model: "",// 数据模型
        rule: {},// 规则
        list: [], // 列表
        listForeign:[], // 外键已选列表 
        foreignIdList : [] , // 外键的id列表
        count: 0,//数据总数


        limit: 20,//每页数量
        pageIndex: 1,//当前第几页
        pageCount: 0, //总页数
        inputPage: "", // 输入的页数

        showFilterDialog: false,
    },
    // behaviors: [app.behaviors.cms, listBehaviors],
    behaviors: [headerBehaviors, footerBehaviors],
 
      
    methods: {

        onLoad(options) {
            
            this.setData({ 
                model: options.model || "admin",
                isForeign: options.isForeign == 'true'? true : false,
                foreignIdList: options.foreignIdList || [] ,
            })
            this.onInit()
        },

        async onInit() {
            // // 初始化共享数据库
            // app.cloud = new wx.cloud.Cloud({
            //     // 资源方 AppID
            //     resourceAppid: 'wx12dbd7b90d1260a8',
            //     // 资源方环境 ID
            //     resourceEnv: 'cup-wm-release',
            // })
            // await app.cloud.init().then(res => console.log(res))

            // app.admin.initDB() // 初始化查询对象

            // 获取列表
            var list = await app.admin.map[this.data.model].getList( app,this)
            var count = await app.admin.map[this.data.model].getCount(app, this)

            // 初始化配置
            this.setData({
                list: list,
                count: count,
                // count: await app.admin.getCount(this.data.model),
                rule: app.admin.map[this.data.model],
                // displayList: this.data.userDispalyList,                
            })
        },

 

        /**
         * 列表更新流程
         * 1、初始化pageIndex和pageCount
         * 2、刷新，根据pageIndex刷新当前页面
         * 3、下一页，根据pageIndex 获取lit列表，pageIndex + 1
         * 4、筛选操作，返回1
         * 
         * 列表查询方式
         * 1、登陆获取列表
         * 2、下一页，获取列表
         * 3、筛选获取猎豹
         * 4、node 编辑返回，更新当前pageIndex列表
         * 5、上、下移，刷新当前pageIndex列表
         * 
         * 状态：普通、外键
         * 
         * 筛选 ，输入条件，更新list，
         * 

         * 更新list model列表
         * 更新selectList 已选列表
         * 更新addList  新增列表
         * 
         */


 
        /*********公共内容 更新列表********/
        // 添加新节点
        addNode() {
            app.admin.map[this.data.model].addNode(this)
        },

        //节点更新后返回
        nodeCallBack() { }, 

        // TODO 调用公共更新函数。将onInit拆分

        //  编辑节点
        toNode(e){
            // console.log(e.currentTarget.dataset.detail_id)
            var nodeId = e.currentTarget.dataset.node_id
            // var url = this.data.rule.detailUrl + "?detail_id=" + detailId
            var url = "/pages/node/node?detail_id=" + nodeId
 
            wx.navigateTo({
                url: url,
            })
        },


        /*************普通列表特有*********** */
        // 上移
        snTop() {

        },
        // 下移 
        snDown() {

        },
   

        /*********外键特有********/
        // 选择外键，返回
        selectNode(e){
            // console.log(e.currentTarget.dataset.detail_id)
            var nodeId = e.currentTarget.dataset.node_id
            var list = this.data.list
            var node 
            for (var i = 0; i < list.length ; i++)
                if (list[i]._id == nodeId)
                    node = list[i]

            var name = app.getNodeValue(node, app.admin.map[this.data.model].displayName)
            var prePage = getCurrentPages()[getCurrentPages().length - 2]
            prePage.foreignCallback(node._id, name)  //回调
            wx.navigateBack({}) // 返回
 
        },

        // 获取已选参数，插入列表首位。






        // onSuccess: function (res) {
        //     console.log(res.detail);
        // },
        // onFail: function (res) {
        //     console.log(res);
        // },





        // getPhone(e) {
        //     console.log(e.detail)
        // },


        // editor(e) {
        //     console.log("编辑", e.currentTarget.dataset.index)
        //     var index = e.currentTarget.dataset.index
        //     var rule = this.data.rule
        //     var list = this.data.list
        //     var nodeIndexKey = rule.nodeIndexKey

        //     var param = rule.nodeIndexKey + "=" + list[index][nodeIndexKey]
        //     wx.navigateTo({
        //         url: '/pages/cms/node/node?' + param,
        //     })
        // },


        // del(e) {
        //     console.log("删除", e.currentTarget.dataset.index)
        // },



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