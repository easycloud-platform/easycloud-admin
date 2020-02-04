<template>
	<div class="container">
        <div class="data-container">
            <div class="top" id="c1"></div>
            <div class="bottom">

                <div class="data-card" id="tianContainer">
                 
                     <!-- <el-carousel indicator-position="outside" arrow="never">
                        <el-carousel-item > -->
                            <div   style="border-radius:16px;"></div>
                        <!-- </el-carousel-item>
                        <el-carousel-item >
                             <div  id="mapContainer" style="border-radius:16px;"></div>
                        </el-carousel-item> -->
                    <!-- </el-carousel> -->
                       
                </div>
                <div class="data-card" style="margin-left:0.5%">
                     <el-carousel indicator-position="outside" arrow="never">
                        <el-carousel-item >
                              <div  id="c3_1"></div>
                        </el-carousel-item>
                        <el-carousel-item >
                              <div  id="c3_2"></div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="data-card" style="margin-left:0.5%" id="">
                     <el-carousel indicator-position="outside" arrow="never">
                          <el-carousel-item >
                              <div  id="c2"></div>
                        </el-carousel-item>
                        <el-carousel-item >
                              <div  id="c4"></div>
                        </el-carousel-item>
                     </el-carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../../router';
import * as api from '@/axios/api.js'
import ApexCharts from 'apexcharts'
var map;
var zoom = 12;
var lay;
var onlyMapLay;
var heatmapOverlay;
export default {
	data() {
		return {
            treeList:[]
        };
	},
	mounted(){
        this.initTree()
        
        this.initC2()
        this.initC3_1()
        this.initC3_2()        
	},
	methods:{
        initTree:function(){
            api.treeOrderBy("height")
                .then(res => {
                    if(res.data.code == '1'){
                        this.treeList = res.data.rows
                        // this.initGaoDe()
                        this.initTian()
                        this.initC1()
                    }else{
                        this.$notify.error({
                            title: '服务器出小差了',
                            message: res.data.message
                        });
                    }
                    
                }).catch(() => {
                    this.$notify.error({
                        title: '服务器出小差了',
                        message: '请您稍后再试'
                    });
                })
        },
        initGaoDe:function(){
            var that = this
            var map = new AMap.Map("mapContainer", {
                resizeEnable: true,
                center: [109.914127778,25.603983333],
                zoom: 35
            });

            if (!isSupportCanvas()) {
                alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
            }

            //详细的参数,可以查看heatmap.js的文档 http://www.patrick-wied.at/static/heatmapjs/docs.html
            //参数说明如下:
            /* visible 热力图是否显示,默认为true
            * opacity 热力图的透明度,分别对应heatmap.js的minOpacity和maxOpacity
            * radius 势力图的每个点的半径大小
            * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
            *	{
            .2:'rgb(0, 255, 255)',
            .5:'rgb(0, 110, 255)',
            .8:'rgb(100, 0, 255)'
            }
            其中 key 表示插值的位置, 0-1
            value 为颜色值
            */
            var heatmap;
            map.plugin(["AMap.Heatmap"], function () {
                //初始化heatmap对象
                heatmap = new AMap.Heatmap(map, {
                    radius: 25, //给定半径
                    opacity: [0, 0.8],
                    gradient:{
                        0.5: 'blue',
                        0.65: 'rgb(117,211,248)',
                        0.7: 'rgb(0, 255, 0)',
                        0.9: '#ffea00',
                        1.0: 'red'
                    }
                    
                });
                var points =[]
                for(let u in that.treeList){
                    let v =  {"lng":that.treeList[u].x,"lat":that.treeList[u].y,"count":30}
                    points.push(v)
                }
                //设置数据集：该数据为北京部分“公园”数据
                heatmap.setDataSet({
                    data: points,
                    max: 50
                });
            });

            //判断浏览区是否支持canvas
            function isSupportCanvas() {
                var elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            }
        },
        initTian:function(){
            var that = this;
           
           var imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?" +
                "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=aaa9fc8d2757e85506acf2880d13a2e4";
            //创建自定义图层对象
            lay = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18});
            var config = {layers: [lay]};
            //初始化地图对象
            map = new T.Map("tianContainer", config);
            //设置显示地图的中心点和级别
            map.centerAndZoom(new T.LngLat(109.9152694, 25.60390833), zoom);
            //允许鼠标滚轮缩放地图
            map.enableScrollWheelZoom();
             var points =[]
                for(let u in that.treeList){
                    let v =  {"lng":that.treeList[u].x,"lat":that.treeList[u].y,"count":30}
                    points.push(v)
                }
            heatmapOverlay = new T.HeatmapOverlay({
                "radius": 30,
            });
            map.addOverLay(heatmapOverlay);
            heatmapOverlay.setDataSet({data: points, max: 300});
       
        },
        initC1:function(){
            var that = this
            let treeNoList = []
            let treeHeightList = []
            for(let u in that.treeList){
                treeNoList.push(that.treeList[u].no)
                treeHeightList.push(that.treeList[u].height)
            }
            var options = {
                chart: {
                    height: window.innerHeight/2.5,
                    type: 'bar',
                    events: {
                     dataPointSelection: function(event, chartContext, config) {
                         router.push({name:'treeData',params:{object:that.treeList[config.dataPointIndex]}})
                     }
                 },
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val ;
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },
                series: [{
                    name: '树高',
                    data: treeHeightList
                }],
                 
                xaxis: {
                    categories: treeNoList,
                    position: 'bottom',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        offsetY: -35,

                    }
                },
                fill: {
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [50, 0, 100, 100]
                    },
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val ;
                        }
                    }

                },
                title: {
                    text: '银杉树信息',
                    align: 'left',
                    style: {
                        color: '#444'
                    }
                },
            }

            var chart = new ApexCharts(
                document.querySelector("#c1"),
                options
            );

            chart.render();
       
        },
		initC2:function() {
            api.wind()
                .then(res => {
                    if(res.data.code == '1'){
                       
                        var options = {
                            chart: {
                                width: "100%",
                                height:window.innerHeight/3,
                                type: 'line',
                                    animations: {
                                    enabled: true,
                                    easing: 'linear',
                                    dynamicAnimation: {
                                        speed: 1000
                                    }
                                },
                            },
                             toolbar: {
                                show: false
                            },
                             legend: {
                                show: true,
                                position:'bottom'
                            },
                            title: {
                                    text: '风速变化图',
                                    align: 'left'
                                },
                            series: [
                                {name: '风速,公里/小时',data: res.data.rows.windSpd},
                                {name: '风向,360度',data: res.data.rows.windDeg},
                                {name: '风力',data: res.data.rows.windSc},
                                    ],
                                xaxis: {
                                    // x轴数据
                                    categories: res.data.rows.date
                                }
                            }

                            var chart = new ApexCharts(document.querySelector("#c2"), options);

                            chart.render();
                            this.initC4()
                    }else{
                        this.$notify.error({
                            title: '服务器出小差了',
                            message: res.data.message
                        });
                    }
                    
                }).catch(() => {
                    this.$notify.error({
                        title: '服务器出小差了',
                        message: '请您稍后再试'
                    });
                })
          
        },
        initC3_1:function(){
            api.dbh()
                .then(res => {
                    if(res.data.code == '1'){
                        var options = {
                            chart: {
                                height: window.innerHeight /3,
                                type: 'donut',
                            },
                            legend: {
                                show: true,
                                position:'bottom'
                            },
                            labels: res.data.rows.label,
                            title: {
                                text: '胸径占比图',
                                align: 'left'
                            },
                            series: res.data.rows.result,
                        }
                        var chart = new ApexCharts(
                                document.querySelector("#c3_1"),
                                options
                            );
                        chart.render();
                   }else{
                        this.$notify.error({
                            title: '服务器出小差了',
                            message: res.data.message
                        });
                    }
                    
                }).catch(() => {
                    this.$notify.error({
                        title: '服务器出小差了',
                        message: '请您稍后再试'
                    });
                })       
        },
        initC3_2:function(){
           api.crown()
                .then(res => {
                    if(res.data.code == '1'){  
                        var options = {
                            chart: {
                                height: window.innerHeight /3,
                                type: 'donut',
                            },
                            legend: {
                                show: true,
                                position: 'bottom'
                            },
                            title: {
                                text: '树冠占比图',
                                align: 'left'
                            },
                             labels: res.data.rows.label,
                            series: res.data.rows.result,
                            responsive: [{
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 200
                                    },
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }]
                        }

                        var chart = new ApexCharts(
                                document.querySelector("#c3_2"),
                                options
                            );
                        chart.render();
                     }else{
                        this.$notify.error({
                            title: '服务器出小差了',
                            message: res.data.message
                        });
                    }
                    
                }).catch(() => {
                    this.$notify.error({
                        title: '服务器出小差了',
                        message: '请您稍后再试'
                    });
                })         
        },
        initC4:function(){
             api.water()
                .then(res => {
                    if(res.data.code == '1'){
                       
                        var options = {
                            chart: {
                                width: "100%",
                                height:window.innerHeight/3,
                                type: 'line',
                                    animations: {
                                    enabled: true,
                                    easing: 'linear',
                                    dynamicAnimation: {
                                        speed: 1000
                                    }
                                },
                            },
                             toolbar: {
                                show: false
                            },
                             legend: {
                                show: true,
                                    position:'bottom'
                                },
                            title: {
                                    text: '温度降水量变化图',
                                    align: 'left'
                                },
                            series: [
                                {name: '温度',data: res.data.rows.temp},
                                {name: '降水量',data: res.data.rows.pcpn},
                                 {name: '湿度',data: res.data.rows.hum},
                                    ],
                                xaxis: {
                                    // x轴数据
                                    categories: res.data.rows.date
                                }
                            }

                            var chart = new ApexCharts(document.querySelector("#c4"), options);
                            chart.render();
                    }else{
                        this.$notify.error({
                            title: '服务器出小差了',
                            message: res.data.message
                        });
                    }
                    
                }).catch(() => {
                    this.$notify.error({
                        title: '服务器出小差了',
                        message: '请您稍后再试'
                    });
                })
        }
        
    }
    
};
</script>

<style scoped>
    .data-container{
        width: 100%;
        height: 100%;
        padding:0.3rem;
    }
    .top{
        width:95%;
        height:41%;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 9px 0px rgba(0,0,0,0.35);
        border-radius:16px;
    }
    .bottom{
        margin-top: 2%;
        width:95%;
        height:41%;
    }

    .bottom .data-card{
        
        width: 32%;
        margin-right: 1%;
        height: 100%;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 9px 0px rgba(0,0,0,0.35);
        border-radius:16px;
        float: left;
    }
 
    .amap-logo img {
        width: 73px!important;
        height: 20px!important;
        border: 0;
        display: none;
        vertical-align: baseline!important;
    }
    .bottom .data-card #tianContainer{width:100%;height:100%}
    #mapContainer{
        width: 100%;
        height: 100%;
    }
    
</style>
<style >

</style>