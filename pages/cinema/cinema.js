const app = getApp();
Page({
    data: {
        title: '',
        skeleton:true,
        count:0,
        upPullLoading:false
    },
    //事件处理函数
    onLoad: function (options) {
        var that =this;
        that.reqCinema(that)
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '电影院'
        })
    },
    onReachBottom: function (){
      var that = this
      that.reqCinema(that)
    },
    reqCinema:function (that){
      if (that.data.skeleton){
        that.setData({
          count: that.data.count + 20
        })
      }else{
        that.setData({
          count: that.data.count + 20,
          upPullLoading: true
        })
      }
      wx.request({
        url: 'https://douban-api.uieee.com/v2/movie/top250?count=' +that.data.count,
        method: 'GET',
        header: {
          "Content-Type": "application/text"
        },
        success: function (res) {
          that.setData({
            items: res.data.subjects,
            skeleton: false,
            upPullLoading: false
          })
        },
        fail:function (err){
          that.setData({
            upPullLoading: false
          })
        }
      }) 
    },
  getDetails: function (event) {
    // console.log(event)
    wx.setStorageSync('id', event.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../../pages/common/common`
    })
  }
})
