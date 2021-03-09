var app = getApp()
module.exports = Behavior({
    data: { 
         
    },
 

    //准备完成
    ready() { 
    },
    methods: {
        
         
        /*************SKU 编辑************/
        openSKUDialog(e) { 
            var skuKey = e.currentTarget.dataset.sku_key

            var node = this.data.node
            var skuAttrs = app.getNodeValue(node, skuKey)
            // var Attrs = this.data.node.attrs
            
            this.setData({ 
                showSkuDialog: true, 
                skuAttrs: skuAttrs,
                skuKey: skuKey,
            })
             
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
            var skuAttrs = []
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
                        skuAttrs.push({
                            attrId: i, attrName: attrName, attrVal: attrVal
                        })
                }
                
            }

            var node = this.data.node
            var nodeKey = app.getNodeKey(node, this.data.skuKey)

            console.log(skuAttrs)
            this.setData({
                [nodeKey]: skuAttrs,  // 类似'node.fatherInfo[0].nickName' 
            })

            // app.admin.map[this.data.model].updateSKU(app, this , attrs)
            this.closeSKUDialog()
        },


    }
})