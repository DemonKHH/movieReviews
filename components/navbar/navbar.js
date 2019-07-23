const app = getApp()

Component({

  properties: {
    text: {
      type: String,
      value: 'Wechat'
    },
    backicon: {
      type: Boolean,
      value: false
    },
    search: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 'px',
    navigationBarHeight: (app.globalData.statusBarHeight + 10) + 'px',
    backImg:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdCI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ii8+PC9zdmc+"
  },
  methods: {
    backHome: function () {
      let pages = getCurrentPages()
      wx.navigateBack({
        delta: pages.length
      })
    },
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    toSearchPage:function (){
      wx.navigateTo({
        url: '../search/search'
      })
    }
  }
})