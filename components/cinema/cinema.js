const app = getApp()
Component({
  properties: {
    bgcolor: {
      type: String,
      value: '#FFF'
    },
    selector: {
      type: String,
      value: 'skeleton'
    },
    loading: {
      type: String,
      value: 'spin'
    }
  },
  data: {
    loadingArrs: ['1', '1', '1', '1','1','1','1'],
    systemInfo: {},
  },
  attached: function() {
    //默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      systemInfo: {
        width: systemInfo.windowWidth,
        height: systemInfo.windowHeight
      }
    })
  },
  ready: function() {
    const that = this;
    //绘制背景
  }

})