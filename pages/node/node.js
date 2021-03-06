// pages/detail/admin/admin.js

var app = getApp()
var base = require("js/base.js")
var custom = require("js/custom.js")
var foreign = require("js/foreign.js")
Component({
    
    behaviors: [base ,custom, foreign],
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        barIndex:0,

        model:"",
        _id:"",
        node:{
            // _id:'1',
            // attrs: [
            //     {
            //         attrId: 0,
            //         "attrName": "规格",
            //         "attrVal": [
            //             { valueId: 0, valueName: "中杯", price: 0 },
            //             { valueId: 1, valueName: "大杯", price: 2 }
            //         ]
            //     },
            //     {
            //         attrId: 1,
            //         "attrName": "奶量",
            //         "attrVal": [
            //             { valueId: 0, valueName: "去奶泡", price: 0 },
            //             { valueId: 1, valueName: "有奶泡", price: 0 }
            //         ]
            //     },
            //     {
            //         attrId: 2,
            //         "attrName": "糖量",
            //         "attrVal": [
            //             { valueId: 0, valueName: "无糖", price: 0 },
            //             { valueId: 1, valueName: "少糖", price: 0 },
            //             { valueId: 2, valueName: "正常糖", price: 0 },
            //             { valueId: 2, valueName: "", },
            //         ]

            //     }
            // ]
        },

        // Attrs:[], //SKU 的临时存放数组

        showInputTextDialog:false, //输入内容
        currentInputKey : "",

        showSkuDialog: false, //SKU编辑
        skuKey:"",//SKU的属性字段
        skuAttrs:[],// SKU 的临时属性对象

        foreignCurrentEditor:{}, //当前编辑的外键参数
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
        onLoad(options){ 

            this.setData({
                model: options.model || "",
                _id: options.node_id || "",
            })

            var rule = app.admin.map[this.data.model]
            this.setData({
                rule: rule,
            })
            
            if( this.data.model == ""){
                wx.showModal({  title:"为传入model为空" ,success:()=> wx.navigateBack()})               
                return 
            }
            
            if( this.data._id == ""){
                wx.showModal({  title:"为传入id为空",success:()=> wx.navigateBack() }) 
                return 
            }

            this.onInit()
        },

        async onInit(){

            // // 初始化共享数据库
            // app.cloud = new wx.cloud.Cloud({
            //     // 资源方 AppID
            //     resourceAppid: 'wx12dbd7b90d1260a8',
            //     // 资源方环境 ID
            //     resourceEnv: 'cup-wm-release',
            // })
            // await app.cloud.init().then(res => console.log(res))


            var res = await app.admin.getNode(this.data.model , this.data._id)
            var node = res.data
            console.log(node)
            node['attrs'] = [
                    {
                        attrId: 0,
                        "attrName": "规格",
                        "attrVal": [
                            { valueId: 0, valueName: "中杯", price: 0 },
                            { valueId: 1, valueName: "大杯", price: 2 }
                        ]
                    },
                    {
                        attrId: 1,
                        "attrName": "奶量",
                        "attrVal": [
                            { valueId: 0, valueName: "去奶泡", price: 0 },
                            { valueId: 1, valueName: "有奶泡", price: 0 }
                        ]
                    },
                    {
                        attrId: 2,
                        "attrName": "糖量",
                        "attrVal": [
                            { valueId: 0, valueName: "无糖", price: 0 },
                            { valueId: 1, valueName: "少糖", price: 0 },
                            { valueId: 2, valueName: "正常糖", price: 0 },
                            { valueId: 2, valueName: "", },
                        ]

                    }
                ]
            this.setData({
                ['node']: node
            })
        },


        clickbar(e){
            this.setData({
                barIndex:e.detail
            })
        },



        // // 编辑确定
        // submitConfirm(e){
        //     app.admin.map[this.data.model].updateDetail(e,this.data.node)
        // },

        // 保存
        async save(){

            //更新            
            var res = await app.admin.updateNode( this.data.model,this.data._id,  this.data.node)
            console.log(res)
        },

        // 保存并返回
        async saveBack(){
            await  this.save()
            //TODO 更新上一页面list
            var prePage = getCurrentPages()[getCurrentPages().length - 2]
            prePage.updateNodeCallback() // 保存后,更新前边的list
            wx.navigateBack()
        },





        onShareAppMessage: function () {
            // 页面被用户分享时执行
            console.log(" onShareAppMessage")
        },

        
    }
})
