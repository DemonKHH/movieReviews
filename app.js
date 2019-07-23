//app.js
App({
 onLaunch: function() {
    //调用API从本地缓存中获取数据
    var that = this;
   wx.getSystemInfo({
     success: res => {
       //导航高度
      that.globalData.statusBarHeight = res.statusBarHeight + 46;
     }, fail(err) {
       console.log('获取设备信息失败'+err)
     }
   })
   that.getPermission();
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  onLoad: function (){
    // console.log(app.globalData.statusBarHeight);
  },
  onShow: function() {
    // console.log('App Show')
  },
  onHide: function() {
    // console.log('App Hide')
  },
  globalData: {
    userInfo: null,
    addr:'',
    statusBarHeight:0
  },
  getPermission: function () {
    var that = this;
    wx.chooseLocation({
      success: res => {
        that.globalData.componentData = true;
        that.globalData.addr = that.getCity(res.address)
        if (this.employIdCallback) {
          this.employIdCallback(that.getCity(res.address));
        }

      },
      fail: function () {
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: tip => {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: data => {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          //授权成功之后，再调用chooseLocation选择地方
                          wx.chooseLocation({
                            success: res => {
                              that.globalData.addr = that.getCity(res.address)
                              if (this.employIdCallback) {
                                this.employIdCallback(that.getCity(res.address));
                              }
                            },
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }else{
              wx.showToast({
                title: '选择位置失败',
                icon: 'success',
                duration: 1500
              })
              that.getPermission();
            }
          },
          fail: res => {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1500
            })
          }
        })
      }
    })
  },
  getCity:function (addr){
    var str = addr
    var provinceArr=[];
    var cityArr = [];
    var arr = str.split('');
    arr.map((value, index) => {
      if (value === "省") {
        provinceArr.push(index);
      } else if (value === "市") {
        cityArr.push(index)
      }
    });
    return arr.slice(provinceArr[0] + 1, cityArr[0]).join('')
  }
})