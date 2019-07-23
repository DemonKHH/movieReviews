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
  startSearch: function (e) {
    var that = this;
    var word = e.detail.value || '大话西游';
    that.setData({
      skeleton:true
    })
    wx.request({
      url: "https://douban-api.uieee.com/v2/movie/search?q="+word,
      method: 'GET',
      header: {
        "Content-Type": "application/text"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          items: res.data.subjects,
          skeleton: false
        })
      }
    })
  }
})