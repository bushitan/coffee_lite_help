
// var app = getApp()
module.exports ={
    
    name:"管理员",
    displayName:"info-0-nickName",
    displayList: [ 
        { name: "头像", key: 'info', type: "arrayObjImage", objKey: "wxAvatarUrl", },
        { name: "昵称", key: 'info', type: "arrayObjText", objKey: "nickName", },
        { name: "权限", key: 'role', type: "arrayObjText", objKey: "name", },
    ],
    filter:[
        { name: "ID", key: '_id', type: "text", },
    ],
    
    detailUrl:"/pages/detail/node/node",
    // 详情页配置字段
    fieldsets: [
        {
            name: "基础",
            fields: [
                // { name: "ID", key: '_id', type: "text", isNull: true, desc: "填写ID", disabled: false, },
                { name: "1、文本", key: 'info-0-nickName', type: "text", formName: "nickName" },  //从node的 ['infor'][0]['nickName'] 中取值
                { name: "2、图片", key: 'info-0-wxAvatarUrl', type: "image" },
                { name: "3、数字", key: 'sn', type: "number", formName: "sn" },
                { name: "4、Boolean", key: 'isDelete', type: "boolean" },

            ]
        },
        {
            name: "列表",
            fields: [
               

                { name: "4、图片列表", key: 'logoList', type: "arrayImage", formName: "sn" },
                { name: "5、文字列表", key: 'markerList', type: "arrayText",  },
               
            ]
        },
        {
            name: "外键",
            fields: [

                { name: "6、外键-父亲", key: 'fatherInfo-0-nickName', type: "foreign", foreignKey: "father", model: "admin", },
                { name: "7、多对多-儿子们", key: 'sonListInfo', type: "arrayForeign", foreignListKey: "sonList", foreignItemKey: "nickName", model: "admin", },
            ]
        },
        {
            name: "商品SKU",
            fields: [
                { name: "8、属性编辑", key: 'attrs', type: "sku", }, 
            ]
        },
    ],
    // 获取列表
    async getList(app){     
                    
        var res = await app.cloud.callFunction({
            name: "manager",
            action: "adminGetList",
        })

        console.log("12132131231")
        return res.result.data
    },
    //获取总数
    async getCount(app) {         
        var res = await db.collection("admin").where({
            wxOpenId: _.exists(true)
        }).count()
        return res.total
    },
    // 获取详情
    async getDetail(_id,app){ 
        var res = await app.cloud.callFunction({
            name : "manager",
            data : ({  action: "adminGetDetail", _id :_id  })

        })
        return res.result.data
    },
    //更新
    updateDetail(e,node){
        console.log(e.detail.value ,node)
    },
    //更新sku 
    updateSKU( that , attrs){
        var node = that.data.node
        node.attrs = attrs
        that.setData({
            node: node
        })
    },
    // 新增
    addNode(that){
        console.log(that)
    },

}