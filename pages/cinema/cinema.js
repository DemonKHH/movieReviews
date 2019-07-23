const app = getApp();
Page({
    data: {
        title: '',
        skeleton:true
    },
    //事件处理函数
    onLoad: function (options) {
        var that = this
        wx.request({
        url: 'https://douban-api.uieee.com/v2/movie/top250',
        method: 'GET',
        header: {
          "Content-Type": "application/text"
        },
        success: function (res) {
          that.setData({
            items: res.data.subjects,
            skeleton: false
          })
        }
      }) 
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '电影院'
        })
    },
})
