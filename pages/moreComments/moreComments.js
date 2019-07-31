// pages/common/common.wxml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skeleton: true,
    allSummary: false,
    textControl: false,
    allComments: false,
    count:0,
    upPullLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  reqComments: function(){
    var that = this;
    wx.request({
      url: 'https://douban-api.uieee.com/v2/movie/subject/' + that.data.id + '/comments?count=' + that.data.count,
      method: 'GET',
      header: {
        "Content-Type": "application/text"
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          filmData: res.data,
          skeleton: false,
          upPullLoading:false
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      skeleton:true,
      id:wx.getStorageSync('id'),
      count:that.data.count+20
    })
    that.reqComments()
  },
  onReachBottom: function(){
     var that  = this;
     that.setData({
       upPullLoading:true,
       count: that.data.count + 20
     })
    that.reqComments()
  }
})