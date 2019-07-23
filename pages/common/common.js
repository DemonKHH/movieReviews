// pages/common/common.wxml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skeleton: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.data.skeleton =true
    that.data.id = wx.getStorageSync('id')
    wx.request({
        url: 'https://douban-api.uieee.com/v2/movie/subject/'+that.data.id,
        method: 'GET',
        header: {
          "Content-Type": "application/text"
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            filmData: res.data,
            tags: res.data.tags,
            skeleton:false
          })
        }
      })   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})