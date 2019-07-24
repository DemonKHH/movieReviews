const app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    showSkeleton: true,
    address:'请选择',
    upPullLoading:false,
    count:20
  },
  swiperchange: function (e) {

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    that.reqIndex();
    // console.log('page loaded')
  },
  onShow(){
  //  console.log('page show')
  },
  go: function (event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  },
  getDetails: function (event) {
    // console.log(event)
    wx.setStorageSync('id', event.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../../pages/common/common`
    })
  },
  getPermission(){
    app.getPermission();
    this.reqIndex();
  },

  reqIndex: function(){
    var that = this;
    that.setData({
      showSkeleton: true
    })
    app.employIdCallback = address => {
      //正在上映
      that.setData({
        address: address
      })
      wx.request({
        url: 'https://douban-api.uieee.com/v2/movie/in_theaters?city=' + address,
        method: 'GET',
        header: {
          "Content-Type": "application/text"
        },
        success: function (res) {
          that.setData({
            items_iscoming: res.data.subjects,
            showSkeleton: false
          })
        }
      })

      //即将上映
      wx.request({
        url: 'https://douban-api.uieee.com/v2/movie/coming_soon',
        method: 'GET',
        header: {
          "Content-Type": "application/text"
        },
        success: function (res) {
          that.setData({
            items_upcoming: res.data.subjects,
          })
        },
        fail:function (err){
          that.setData({
            showSkeleton: false,
          }),
          that.modalcnt();
        }
      })
    }
  },
  modalcnt: function () {
    var that = this;
    wx.showModal({
      title: '网络加载失败',
      content: '请重新加载',
      success: function (res) {
        if (res.confirm) {
          that.reqIndex()
        } else if (res.cancel) {
          return;
        }
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    that.reqIndex();
  },
  onReachBottom:function (){
    var that  = this;
    that.setData({
      upPullLoading: true,
      count:this.data.count+20,
    })
    wx.request({
      url: 'https://douban-api.uieee.com/v2/movie/coming_soon?count=' + this.data.count,
      method: 'GET',
      header: {
        "Content-Type": "application/text"
      },
      success: function (res) {
        that.setData({
          items_upcoming: res.data.subjects,
          upPullLoading: false
        })
      },
      fail: function (err) {
        that.setData({
          upPullLoading: false
        }),
          that.modalcnt();
      }
    })
  }
})



