<template>
  <div class="container">
    <div @click="back" class="back-btn">
      <el-link icon="el-icon-back">返回上一页</el-link>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import router from "../../router";
export default {
  data() {
    return {
      x: 109,
      y: 25
    };
  },
  mounted() {
    let x = this.$route.params.x;
    let y = this.$route.params.y;
    this.x = x;
    this.y = y;
    if (x != undefined && y != undefined) {
      //初始化高德三维地图
      this.initGaoDe();
    }
  },
  methods: {
    back() {
      router.go(-1);
    },
    initGaoDe: function() {
      let map = new AMap.Map("mapContainer", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 14,
        pitch: 80,
        rotation: -10,
        viewMode: "3D", //开启3D视图,默认为关闭
        buildingAnimation: true, //楼块出现是否带动画
        expandZoomRange: true,
        zooms: [3, 20],
        center: [this.x, this.y]
      });
      map.addControl(
        new AMap.ControlBar({
          showZoomBar: false,
          showControlButton: true,
          position: {
            right: "10px",
            bottom: "10px"
          }
        })
      );

      // 创建一个 icon
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),
        image: "../../../static/data/icon/yinshan.png",
        imageSize: new AMap.Size(30, 30)
      });

      // 将 icon 传入 marker
      var marker = new AMap.Marker({
        position: new AMap.LngLat(this.x, this.y),
        icon: icon,
        offset: new AMap.Pixel(0, -0)
      });
      // 将 markers 添加到地图
      map.add([marker]);
      //创建右键菜单
      var contextMenu = new AMap.ContextMenu();

      //右键放大
      contextMenu.addItem(
        "放大一级",
        function() {
          map.zoomIn();
        },
        0
      );

      //右键缩小
      contextMenu.addItem(
        "缩小一级",
        function() {
          map.zoomOut();
        },
        1
      );

      //右键显示全国范围
      contextMenu.addItem(
        "缩放至全国范围",
        function(e) {
          map.setZoomAndCenter(4, [108.946609, 34.262324]);
        },
        2
      );

      //右键添加Marker标记
      contextMenu.addItem(
        "添加标记",
        function(e) {
          var marker = new AMap.Marker({
            map: map,
            position: contextMenuPositon //基点位置
          });
        },
        3
      );

      //地图绑定鼠标右击事件——弹出右键菜单
      map.on("rightclick", function(e) {
        contextMenu.open(map, e.lnglat);
        contextMenuPositon = e.lnglat;
      });

      contextMenu.open(map, lnglat);
    }
  }
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
