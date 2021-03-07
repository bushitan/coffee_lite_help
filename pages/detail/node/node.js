// pages/detail/admin/admin.js

var app = getApp()
Component({
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

        Attrs:[], //SKU 的临时存放数组

        showInputTextDialog:false, //输入内容
        currentInputKey : "",

        showSkuDialog: false, //SKU编辑

        foreignCurrentEditor:{}, //当前编辑的外键参数
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
        onLoad(options){ 

            this.setData({
                model: options.model || "admin",
                _id: options.detail_id || "79550af260435f87089d72cd7e4db0a2",
            })

            this.setData({
                rule: app.admin.map[this.data.model],
            })

            this.onInit()
        },

        async onInit(){

            // 初始化共享数据库
            app.cloud = new wx.cloud.Cloud({
                // 资源方 AppID
                resourceAppid: 'wx12dbd7b90d1260a8',
                // 资源方环境 ID
                resourceEnv: 'cup-wm-release',
            })
            await app.cloud.init().then(res => console.log(res))


            var node = await app.admin.map[this.data.model].getDetail(this.data._id)
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


        // 编辑确定
        submitConfirm(e){
            app.admin.map[this.data.model].updateDetail(e,this.data.node)
        },


        /**********图片数据**********/
        // 预览单张图片
        previewImage(e) {
            console.log(e)
            wx.previewImage({
                urls: [e.currentTarget.dataset.src],
            })
        },
        // 删除图片
        delImage(e) {
            // TODO 选择图片的
            // 需要通过下标判断修改的字段
            console.log(e)
        },
        // 选择图片
        chooseImage(e){
            // TODO 选择图片的
            // 需要通过下标判断修改的字段
            console.log(e)
        },



        /**********文字编辑**********/
        // 确定添加文字，打开对话框
        addText(e) {

            //TODO 增加标签，通过弹窗
            // 需要通过下标判断修改的字段
            var key = e.currentTarget.dataset.key

            this.setData({ currentInputKey: key })
            this.setData({ showInputTextDialog: true })
            // var tabIndex = e.currentTarget.dataset.tabindex
            // var fieldIndex = e.currentTarget.dataset.fieldindex
            // var index = e.currentTarget.dataset.index
        },

        // 对话框输入完成
        inputTextConfirm(e) { 
            var text = e.detail.value.text // 输入的值
            var key = this.data.currentInputKey // 获取输入框对应的key
            var node = this.data.node
            node[key].push(text)
            // console.log()           
            this.setData({ 
                showInputTextDialog: false,
                node:node
            })
        },
        delText(e) {
            console.log(e)
            // 需要通过下标判断修改的字段
            var key = e.currentTarget.dataset.key
            var tabIndex = e.currentTarget.dataset.tabindex
            var fieldIndex = e.currentTarget.dataset.fieldindex
            var index = e.currentTarget.dataset.index
            console.log(tabIndex, fieldIndex, index)
            console.log(this.data.node[key])

            wx.showModal({
                title: '是否删除',
                success: res => {
                    if (res.confirm) {
                        var node = this.data.node
                        node[key].splice(index, 1)
                        this.setData({
                            node: node
                        })
                    }
                }
            })
        },


        /*************SKU 编辑************/
        openSKUDialog() { 
            var Attrs = this.data.node.attrs
            this.setData({ showSkuDialog: true, Attrs: Attrs})
             
        },
        closeSKUDialog() { this.setData({ showSkuDialog: false, }) },
        // SKU属性编辑 
        // 样例 Attrs: [
        //     {
        //         attrId: 0,
        //         "attrName": "规格",
        //         "attrVal": [
        //             { valueId: 0, valueName: "中杯", price: 0 },
        //             { valueId: 1, valueName: "大杯", price: 2 }
        //         ]
        //     },
        // ]
        inpuSKUConfirm(e){
            console.log(e)
            var obj = e.detail.value
            var attrs = []
            for (var i = 0; i < 4; i++){
                console.log(obj[i])
                var attrName = obj[i]
                if (attrName){
                    
                    //先添加小类
                    var attrVal = []
                    for (var j = 0; j < 4; j++) {
                        var valueName = obj[i + "_" + j + "_name"]
                        var price = parseInt(obj[i + "_" + j + "_price"] || 0)
                        // console.log(name, price)
                        if ( valueName )
                            attrVal.push({ valueId: 0, valueName: valueName, price: price })
                    }


                    // 再添加大类
                    if (attrVal.length>0)
                        attrs.push({
                            attrId: i, attrName: attrName, attrVal: attrVal
                        })
                }
                
            }
            console.log(attrs)
            app.admin.map[this.data.model].updateSKU( this , attrs)
            this.closeSKUDialog()
        },



        /*************外键 编辑************/
        //  选择外键
        foreignSelect(e) { 
            var model = e.currentTarget.dataset.model
            this.setData({
                foreignCurrentEditor:{
                    model: model,
                    type: e.currentTarget.dataset.type,
                    key: e.currentTarget.dataset.key,
                    foreignKey: e.currentTarget.dataset.foreignkey,
                }
            })
            // console.log(dataset)
            wx.navigateTo({
                url: '/pages/list/foreign/foreign?model=' + model ,
            })
        },

        // 增加外键列表
        arrayForeignSelect(e) {
            var model = e.currentTarget.dataset.model
            this.setData({
                foreignCurrentEditor: {
                    model: model,
                    type: e.currentTarget.dataset.type,
                    key: e.currentTarget.dataset.key,
                    foreignListKey: e.currentTarget.dataset.foreignlistkey,
                    foreignItemKey: e.currentTarget.dataset.foreignitemkey,
                }
            })
            // console.log(dataset)
            wx.navigateTo({
                url: '/pages/list/foreign/foreign?model=' + model,
            })
        },

        // 删除外键列表的元素
        arrayForeignDel(e) {
            var model = e.currentTarget.dataset.model
            var type = e.currentTarget.dataset.type
            var key = e.currentTarget.dataset.key
            var foreignListKey = e.currentTarget.dataset.foreignlistkey
            var foreignItemKey = e.currentTarget.dataset.foreignitemkey
            var index = e.currentTarget.dataset.index

            wx.showModal({
                title: '是否删除',
                success: res => {
                    if (res.confirm) {
                        var node = this.data.node
                        node[key].splice(index, 1)
                        node[foreignListKey].splice(index, 1)
                        this.setData({
                            node: node
                        })
                    }
                }
            })
        },

        // 选择外键后返回
        // todo  1改外键
        // 2 改外键的显示
        foreignCallback(_id, name){
            
            var current = this.data.foreignCurrentEditor
            var node = this.data.node
            
            if (current.type == "foreign"){
                var nodeKey = app.getNodeKey(node, current.key)
                this.setData({
                    // node:node
                    ['node' + "." + current.foreignKey]: _id, // 类似 node.father
                    ['node' + nodeKey]: name,  // 类似'node.fatherInfo[0].nickName' 

                })
            }
            else { 
                node[current.foreignListKey].push(_id)
                console.log('{"' + current.foreignItemKey + '" : "' + name + '" }', current.foreignListKey)
                var obj = JSON.parse( '{"'+current.foreignItemKey + '" : "'+name+'" }')
                node[current.key].push(obj)
                this.setData({
                    node:node
                })
            }

        },


        onShareAppMessage: function () {
            // 页面被用户分享时执行
            console.log(" onShareAppMessage")
        },

        
    }
})
