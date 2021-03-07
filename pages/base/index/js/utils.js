/**
 * 获取查询列表具体的数据
 */


class Utils {
    constructor() { }

    // 菜单矩阵
    matrix = [
        {
            name: "外卖",
            select: "/images/icon/score.png",
            unSelect: "/images/icon/score_un.png",
            list: [
                { name: "待处理", id: 11 }, { name: "处理中", id: 12 }, { name: "已完成", id: 13 }, { name: "已取消", id: 14 },
            ]
        },
        {
            name: "小商店",
            select: "/images/icon/mall.png",
            unSelect: "/images/icon/mall_un.png",
            list: [
                { name: "待处理", id: 21 }, { name: "已核销", id: 22 }, { name: "已取消", id: 23 },
            ]
        },
        {
            name: "优惠GO",
            select: "/images/icon/mall.png",
            unSelect: "/images/icon/mall_un.png",
            list: [
                { name: "已付款", id: 31 },
            ]
        }
    ]

    // 查询列表的哈希索引
    map = {

        /****外卖*****/
        // 待处理
        11: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {
                    data: {
                        data: [
                            {
                                name: "订单1",
                                summary: "描述1",
                            },
                            {
                                name: "订单2",
                                summary: "描述2",
                            },
                        ],
                        page: page + 1,
                        range: 10,
                        count: 10
                    }
                }
                resolve(res)
            })
        },
        // 处理中
        12: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {
                    data: {
                        data: [1, 2, 0, 0],
                        page: page + 2,
                        range: 14,
                        count: 10
                    }
                }
                resolve(res)
            })
        },

        // 已完成
        13: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {}
                resolve(res)
            })
        },

        // 已取消
        14: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {}
                resolve(res)
            })
        },



        /****小商店*****/
        // 待处理
        21: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {}
                resolve(res)
            })
        },
        // 已核销
        22: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {}
                resolve(res)
            })
        },
        // 已取消
        23: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {}
                resolve(res)
            })
        },

        // 优惠GO
        31: (page, range, startTime, endTime) => {
            return new Promise((resolve, reject) => {
                var res = {}
                resolve(res)
            })
        },

    }

    // 订单搜索的哈希索引
    mapSearchNode = {
        // 外卖
        0: () => {
            return new Promise((resolve, reject) => {
                var res = {
                    data: {
                        name: "订单",
                        summary: "描述",
                    }
                }
                resolve(res)
            })
        },

        // 小商店
        1: () => {

        }
    }

}

module.exports = new Utils()