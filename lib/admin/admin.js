
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
        this.app = getApp()
    }
    init(App){
        app = App
    }

    initDB(){
        db = app.cloud.database()
        _ = db.command
        $ = db.command.aggregate 
    }
    getList(model) {  
        return db.collection(model).where({ 
        })
        .limit(10)
        .skip(0)
        .get()
    }

    getCount(model) {
        return db.collection(model).where({  }).count()
    }

    map = {
        "admin":{
            name:"管理员",
            displayList: [ 
                { name: "头像", key: 'info', type: "arrayObjImage", objKey: "wxAvatarUrl", },
                { name: "昵称", key: 'info', type: "arrayObjText", objKey: "nickName", },
                { name: "权限", key: 'role', type: "arrayObjText", objKey: "name", },
            ],
            filter:[
                { name: "ID", key: '_id', type: "text", },
            ],
            
            detailUrl:"/pages/detail/admin/admin",
            // 详情页配置字段
            fieldsets: [
                // {
                //     name: "基础",
                //     fields: [
                //         { name: "ID", key: '_id', type: "text", isNull: true, desc: "填写ID", disabled: false, },

                //     ]
                // },
                {
                    name: "名字",
                    fields: [
                        { name: "昵称", key: 'info-0-nickName', type: "text",formName:"nickName" },  //从node的 ['infor'][0]['nickName'] 中取值
                        // { name: "头像", key: 'info-0-wxAvatarUrl', type: "image"   },
                        // { name: "序号", key: 'sn', type: "number", formName: "sn" },

                        // { name: "头像列表", key: 'logoList', type: "arrayImage", formName: "sn" },
                        // { name: "标注", key: 'markerList', type: "arrayText",  },

                        { name: "属性编辑", key: 'attrs' , type: "sku",  }, 
                    ]
                },
                // {
                //     name: "外键",
                //     fields: [
                //         { name: "门店店主", key: 'shopHost', type: "foreign", descKey: "shopHostName", model: "shop", },
                //         { name: "访问门店", key: 'shopList', type: "m2m", model: "relUserShop", },
                //     ]
                // },
            ],

            async getList(){                 
                var res = await app.cloud.callFunction({
                    name: "manager",
                    action: "adminGetList",
                })
                return res.result.data
            },

            async getCount() { 
                var res = await db.collection("admin").where({
                    wxOpenId: _.exists(true)
                }).count()
                return res.total
            },

            async getDetail(_id){ 
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

            updateSKU( that , attrs){
                var node = that.data.node
                node.attrs = attrs
                that.setData({
                    node: node
                })
            },

        }
    }   
}

var admin = new Admin()
module.exports = admin











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