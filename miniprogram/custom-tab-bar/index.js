Component({
  data: {
    active: 2,
    list: [{
        icon: 'records',
        text: '控糖小贴士',
        url: '/pages/knowledge/index'
      },
      {
        icon: 'coupon-o',
        text: '列表',
        url: '/pages/list/index'
      },
      {
        icon: 'add-o',
        text: '记录',
        url: '/pages/add/index'
      },
      {
        icon: 'chart-trending-o',
        text: '图表',
        url: '/pages/chart/index'
      },
      {
        icon: 'fire-o',
        text: '推荐食谱',
        url: '/pages/cookbook/index'
      }
    ]
  },

  methods: {
    onChange(event) {
      this.setData({
        active: event.detail
      });
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});