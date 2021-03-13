
/**
 配置方式

    列表展示参数， 分6种结构
    displayList: [
        { name: "ID", key: 'id', type: "number" },
        { name: "头像", key: 'logo', type: "image" },
        { name: "名字", key: 'name', type: "text" },
        { name: "标签", key: 'tag', type: "array", },
        { name: "头像", key: 'info', type: "arrayObjImage", objKey: "wxAvatarUrl", },
        { name: "昵称", key: 'info', type: "arrayObjText", objKey: "nickName", },
    ],

 */
var app 
var db
var  _ 
var  $ 
 
class Admin {
    constructor(){
        app = getApp()
        this.map = {}
    } 

    
    // 获取所有model的配置文件
    async getMap(){
        
        var res = await app.cloud.callFunction({
            name : "manager",
            data : ({ isGetAdmin:1 })

        })
        console.log(res)
        
        this.map = res.result.data 
    }



    /*************CURD***********/
    async getList(data) { 
        var data = data || {} 
        
        data["action"] = "getList" 

        wx.showLoading({ mask:true })
        var res = await app.cloud.callFunction({
            name : "manager",
            data : (data)

        })
        wx.hideLoading()
        return res.result
    }

    // 更新序号
    async updateSN(model,json){
        wx.showLoading({ mask:true })
        try {
        
            var res = await app.cloud.callFunction({
                name : "manager",
                data : ({ model:model ,  action: "updateSN", snJson :json  })
            })
            wx.hideLoading()

            var result = res.result
            wx.showModal({
                title: result.msg,
                showCancel:false,
            })

            return result
        } catch(e) {
            wx.hideLoading()
            wx.showModal({
              title: e.toString(),
            })
            return false
        }
    }
    // 获取节点
    async getNode(model , _id){
        var res = await app.cloud.callFunction({
            name : "manager",
            data : ({ model:model ,  action: "getNode", _id :_id  })

        })
        return res.result
    }
    
    // 增加节点 
    async addNode(model){
        var res = await app.cloud.callFunction({
            name : "manager",
            data : ({ model:model ,  action: "addNode" })

        })
        return res.result
    }

    // 更新节点
    async updateNode(model,_id,node){
        var res = await app.cloud.callFunction({
            name : "manager",
            data : ({ model:model ,  action: "updateNode", _id :_id , node:node })
        })
        return res.result 
    }


  
}

var admin = new Admin()
module.exports = admin








    // initDB(){
    //     db = app.cloud.database()
    //     _ = db.command
    //     $ = db.command.aggregate 
    // }

  // getCount(model) {
    //     return db.collection(model).where({  }).count()
    // }

    // map = {

    //     "wxMemberInfo":{
    //         name: "管理员",
    //         displayName: "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ",
    //     },

    //     "admin": require("../model/admin.js")
    // }   


// 样例
        // {
        //     name:"管理员",
        //     displayName:"info-0-nickName",
        //     displayList: [ 
        //         { name: "头像", key: 'info', type: "arrayObjImage", objKey: "wxAvatarUrl", },
        //         { name: "昵称", key: 'info', type: "arrayObjText", objKey: "nickName", },
        //         { name: "权限", key: 'role', type: "arrayObjText", objKey: "name", },
        //     ],
        //     filter:[
        //         { name: "ID", key: '_id', type: "text", },
        //     ],
            
        //     detailUrl:"/pages/detail/node/node",
        //     // 详情页配置字段
        //     fieldsets: [
        //         {
        //             name: "基础",
        //             fields: [
        //                 // { name: "ID", key: '_id', type: "text", isNull: true, desc: "填写ID", disabled: false, },
        //                 { name: "1、文本", key: 'info-0-nickName', type: "text", formName: "nickName" },  //从node的 ['infor'][0]['nickName'] 中取值
        //                 { name: "2、图片", key: 'info-0-wxAvatarUrl', type: "image" },
        //                 { name: "3、数字", key: 'sn', type: "number", formName: "sn" },
        //                 { name: "4、Boolean", key: 'isDelete', type: "boolean" },

        //             ]
        //         },
        //         {
        //             name: "列表",
        //             fields: [
                       

        //                 { name: "4、图片列表", key: 'logoList', type: "arrayImage", formName: "sn" },
        //                 { name: "5、文字列表", key: 'markerList', type: "arrayText",  },
                       
        //             ]
        //         },
        //         {
        //             name: "外键",
        //             fields: [

        //                 { name: "6、外键-父亲", key: 'fatherInfo-0-nickName', type: "foreign", foreignKey: "father", model: "admin", },
        //                 { name: "7、多对多-儿子们", key: 'sonListInfo', type: "arrayForeign", foreignListKey: "sonList", foreignItemKey: "nickName", model: "admin", },
        //             ]
        //         },
        //         {
        //             name: "商品SKU",
        //             fields: [
        //                 { name: "8、属性编辑", key: 'attrs', type: "sku", }, 
        //             ]
        //         },
        //     ],

        //     async getList(){                 
        //         var res = await app.cloud.callFunction({
        //             name: "manager",
        //             action: "adminGetList",
        //         })
        //         return res.result.data
        //     },

        //     async getCount() { 
        //         var res = await db.collection("admin").where({
        //             wxOpenId: _.exists(true)
        //         }).count()
        //         return res.total
        //     },

        //     async getDetail(_id){ 
        //         var res = await app.cloud.callFunction({
        //             name : "manager",
        //             data : ({  action: "adminGetDetail", _id :_id  })

        //         })
        //         return res.result.data
        //     },
        //     //更新
        //     updateDetail(e,node){
        //         console.log(e.detail.value ,node)
        //     },

        //     updateSKU( that , attrs){
        //         var node = that.data.node
        //         node.attrs = attrs
        //         that.setData({
        //             node: node
        //         })
        //     },
        //     // 新增
        //     addNode(that){
        //         console.log(that)
        //     },

        // }


  // db.collection('admin').aggregate() 
                // .match({
                //     wxOpenId:"oOY_U1KTeDL3W3PtecWdVp1QXi-A"
                // })
                // .lookup({
                //     from:"user",
                //     localField: 'wxOpenId',
                //     foreignField: 'wxOpenId',
                //     as:"info"
                // })
                // .limit(20)
                // .end()
                // .then(res => console.log(res))
                // .catch(err => console.error(err))












// async getList() {
//     // const db = wx.cloud.database()


//     console.log(11)
//     const db = app.cloud.database()


//     var result = await db.collection('wxMemberInfo').where({
//         // 'name': "h"
//     })
//         .limit(10)
//         .skip(0)
//         .get()



//     var result = await db.collection('wxMemberInfo').where({
//         // 'name': "h"
//     }).count()



//     // query = db.collection('wxMemberInfo').aggregate()
//     // .match({
//     //     '_id': "28ee4e3e604343a9092696680d492378"
//     // })
//     // .limit(20)
//     // .then(res => console.log(res))
//     // .catch(err => console.error(err))

//     // const result = await db.collection('wxMemberInfo').where({
//     //     name: "11"
//     // }).get()
//     // db.collection('wxMemberInfo').doc('28ee4e3e604343a9092696680d492378')


//     // .sort({
//     //     createTime: -1
//     // })
//     // .skip(20 * (event.pageNum - 1))
//     // // TODO 获取列表
//     // return [
//     //     {
//     //         id: 1, name: '集点卡用户1',
//     //         logo: 'http://img.12xiong.top/coffee_image/upload/EUSZn6fZ.jpg',
//     //         tag: ["咖啡", "植物奶",],
//     //         shopHost: 11,
//     //         shopHostName: "seeking 鲤湾店",
//     //         shopList: [{ id: 11, name: 'seeking 鲤湾店' }, { id: 12, name: 'seeking 桃源路店' },]
//     //     },
//     //     {
//     //         id: 2, name: '不是探',
//     //         logo: 'http://img.12xiong.top/coffee_image/upload/eyJZD6fZ.jpg',
//     //         tag: ["火爆", "美食",], shopList: [{ id: 12, name: 'seeking 桃源路店' }, { id: 13, name: 'strong 康普店' },]
//     //     },
//     // ]
// },