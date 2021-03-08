var app = getApp()
module.exports = Behavior({
    data: { 
         
    },
 

    //准备完成
    ready() { 
    },
    methods: {
        
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

        /**********普通输入编辑**********/
        inputNumber(e){
            console.log(e)
            var value = parseFloat( e.detail.value)
            var key = e.currentTarget.dataset.key            
            this.inputCommon(key,value)           
        },

        inputText(e){
            console.log(e)
            var value =  e.detail.value 
            var key = e.currentTarget.dataset.key
            this.inputCommon(key,value)
        },
        inputCommon(key,value){
            var nodeKey = app.getNodeKey(this.data.node , key)
            this.setData({ 
                [ nodeKey]: value,  // 类似'node.fatherInfo[0].nickName' 11
            })
        },


        /**********文字列表编辑**********/
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

    }
})