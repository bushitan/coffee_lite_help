var app = getApp()
module.exports = Behavior({
    data: { 
         
    },
 

    //准备完成
    ready() { 
    },
    methods: {
        
         
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


    }
})