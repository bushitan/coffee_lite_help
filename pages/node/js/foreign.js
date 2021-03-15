var app = getApp()
module.exports = Behavior({
    data: { 
         
    },
 

    //准备完成
    ready() { 
    },
    methods: { 

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
            var k = this.data.foreignCurrentEditor.foreignKey
            var list = this.data.node[k]
            this.toFoerigenModel(model, list)
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
            var k = this.data.foreignCurrentEditor.foreignListKey
            var list = this.data.node[k]
           this.toFoerigenModel(model , list)
        },

        // 跳转到外键model，选择node
        toFoerigenModel(model,list){
            
            var temp = []
            for (var i=0; i <list.length ; i++ )
                temp.push(list[i]._id)
            var foreignIdList = JSON.stringify( temp )

            wx.navigateTo({
                url: `/pages/list/list?isForeign=true&model=${model}&foreignIdList=${foreignIdList}`,
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
                    [ nodeKey]: name,  // 类似'node.fatherInfo[0].nickName' 

                })
            }
            else { 
                node[current.foreignListKey].push(_id)
                console.log('{"' + current.foreignItemKey + '" : "' + name + '" }', current.foreignListKey)
                var obj = JSON.parse( '{"'+current.foreignItemKey + '" : "'+name+'" }')
                obj["_id"] = _id
                node[current.key].push(obj)
                this.setData({
                    node:node
                })
            }

        },

    }
})