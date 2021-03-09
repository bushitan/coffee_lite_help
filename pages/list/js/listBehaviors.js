var app = getApp()
module.exports = Behavior({
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
 

    //准备完成
    ready() { 
    },
    methods: {
        async onInit() {
            // 初始化共享数据库
            app.cloud = new wx.cloud.Cloud({
                // 资源方 AppID
                resourceAppid: 'wx12dbd7b90d1260a8',
                // 资源方环境 ID
                resourceEnv: 'cup-wm-release',
            })
            await app.cloud.init().then(res => console.log(res))

            app.admin.initDB() // 初始化查询对象

            // 获取列表
            var list = await app.admin.map[this.data.model].getList(app)
            var count = await app.admin.map[this.data.model].getCount(app) 

            // 初始化配置
            this.setData({
                list: list ,
                count: count,
                // count: await app.admin.getCount(this.data.model),
                rule: app.admin.map[this.data.model],
                // displayList: this.data.userDispalyList,                
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