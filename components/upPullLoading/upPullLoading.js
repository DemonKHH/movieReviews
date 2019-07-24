const app = getApp()
Component({
  properties: {
    bgcolor: {
      type: String,
      value: '#FFF'
    },
    loading: {
      type: String,
      value: 'spin'
    }
  },
  data: {
    loadingAni: ['spin', 'chiaroscuro'],
    systemInfo: {},
    skeletonRectLists: [],
    skeletonCircleLists: [],
    navbarHeight: 0
  },
  attached: function() {
    //默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      systemInfo: {
        width: systemInfo.windowWidth,
        height: systemInfo.windowHeight
      },
      navbarHeight: app.globalData.statusBarHeight,
      loading: this.data.loadingAni.includes(this.data.loading) ? this.data.loading : 'spin'
    })
  }
})