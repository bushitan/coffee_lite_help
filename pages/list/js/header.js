var app = getApp()
module.exports = Behavior({
    data: { 
        
    },
    //准备完成
    ready() { 
    },
    methods: {

        /*************筛选*********** */
        // 打开对话框
        filterOpen() { this.setData({ showFilterDialog: true, }) },
        filterClose() { this.setData({ showFilterDialog: false, }) },
        // 确认查询
        async filterConfirm(e) {
            var form = e.detail.value
            var search = this.data.search
            debugger
            
            // 删除空的
            for(var key in form)
                if( form[key] == '')
                    delete form[key]
            
            // 把number类型的字符串input，变成数字
            for( var i = 0; i< search.length ; i++)
                if(search[i].type == "number")
                    if( form.hasOwnProperty(search[i].key) == true ) 
                        form[key] = Number( form[key] )                
 
            // 查询
            this.setData({ searchForm:form  })
            this.initIndex()
            await this.getList()
            this.filterClose()
        },

        // 选择外键的搜索参数
        foreignSelect(e){ 
            var searchIndex = e.currentTarget.dataset.index
            var model = e.currentTarget.dataset.model
            this.setData({
                searchIndex:searchIndex,
            })

            wx.navigateTo({
                url: '/pages/list/list?isForeign=true&model=' + model ,
            })
        },

        // search，可以选择id，按照id查询
        // 更新search的字段
        foreignCallback(_id, name){
            
            var search = this.data.search
            search[ this.data.searchIndex ]._id = _id
            search[ this.data.searchIndex ].value = name
            this.setData({search:search})
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