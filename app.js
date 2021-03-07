// app.js

var config = require("lib/behaviors/config.js")
var cms = require("lib/behaviors/cms.js")
var admin = require("lib/admin/admin.js")
App({
    db: "",
    cloud:"", // 共享云数据库
    behaviors: {
        config: config,
        cms: cms,
    },
    admin: admin , // 后台管理配置文档
    async onLaunch() {
        
        this.admin.init(this)

        //TODO 注册云开发
        // wx.cloud.init({
        //     env: 'coffee-help-release', //小杯子运营助手 -- 正式版本
        //     // traceUser: true,
        // })


        // 声明新的 cloud 实例
       
        // 跨账号调用，必须等待 init 完成
        // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
        // await this.c1.init().then(res => console.log(res))




        //TODO 注册插件DB


        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        StatusBar: "",
        Custom: "",
        CustomBar: "",
    }
})
