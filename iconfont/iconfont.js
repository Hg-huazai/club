Component({
  properties: {
    // ziyuan1 | tuandui2 | rili1 | fenlei1 | fenlei2 | tongxue | xingbienv | xingbienan | xingbie | xingbie1 | fenxiang1 | fanhui | zhuye | biaoqian | huodong1 | xin | V11 | V1 | DIYyanghu | zhihuichengshi | diy | chengshi | guanlianchengshi | chengshi1 | guangzhoukaifaquguojikejihezuoxiangmu | huiyuan | chengshiicon-da | youxi | juhuibaoming | shenzhen-sheng | chengshiguanli-hecha | chengshiguanli-zaiban | huwaitanxian | zu | meishi | chengdu_fense | hangzhou_fense | fenlei | fenxiang | tupian | didian | jiage | cuohao | icon-test | tuandui1 | ziyuan | tuandui | 033 | wozuji | huoche | rili | lingdai | tieta | gouwu | lvyou | lvyou1 | right-r-copy | jiantou-copy | jiantou | left-l-copy | dongwutubiao-xianxing-zhu | zhanlvejingwaizichanzhanbi | qinzirenwu | shizhong | sousuo | wodedangxuan | xiaoxi6 | huodong
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 42,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
