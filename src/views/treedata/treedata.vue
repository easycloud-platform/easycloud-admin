<template>
	<div class="container">
        <div  class="title">
              {{object.name}}&nbsp;&nbsp;{{object.no}}
        </div>
        <div @click="back" class="back-btn">
            <el-link icon="el-icon-back">返回上一页</el-link>    
        </div>
        <div class="data-container">
            <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <div id="basic">
                        
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card">
                    <div id="info">
                       
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:10px;">
            <el-col :span="12">
                <el-card class="box-card">
                    <div id="sun">
                      
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div id="water">
                      
                    </div>
                </el-card>
            </el-col>
        </el-row>
        </div>
        
    </div>
</template>

<script>
import * as api from '@/axios/api.js'
import ApexCharts from 'apexcharts'
import router from '../../router';
export default {
	data() {
		return {
            object:{}
        };
	},
	mounted(){
        this.object = this.$route.params.object
        this.initBasic()
        this.initWater()
        this.initSun()
        this.initInfo()
	},
	methods:{
        back(){
            router.go(-1)
        },
        initBasic(){
             let that = this
            var options = {
                chart: {
                    id:'basic',
                    height: window.innerHeight/3,
                    type: 'bar',
                    stacked: true,
                    shadow: {
                        enabled: true,
                        blur: 1,
                        opacity: 0.5
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true, 
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2,
                },
                series: [{
                    name: that.object.no,
                    data: [that.object.slope,
                    that.object.basalDiameter,
                    that.object.dbh,
                    that.object.height,
                    that.object.crownWidthSN,
                    that.object.crownWidthEW]
                }],
                
                title: {
                    text: '基本信息'
                },
                xaxis: {
                    categories: ['坡度', '基径', '胸径', '高度','冠幅SN','冠幅EW'],
                },
                yaxis: {
                    title: {
                        text: undefined
                    },
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function(val) {
                            return val 
                        }
                    }
                },
               
                states: {
                    hover: {
                        filter: 'none'
                    }
                },
                
                legend: {
                    position: 'right',
                    offsetY: 40
                }
                }

                var chart = new ApexCharts(
                    document.querySelector("#basic"),
                    options
                ); 
                chart.render()
        },
        initWater:function(){
            api.water()
                .then(res => {
                    if(res.data.code == '1'){
                        var options = {
                            chart: {
                                id: 'water',
                                height: window.innerHeight/3,
                                type: 'line',
                                zoom: {
                                    enabled: false
                                },
                            },
                          dataLabels: {
                                enabled: false
                            },
                            stroke: {
                                curve: 'straight'
                            },
                            series: [{
                                name: '含水量',
                                data: res.data.rows.pcpn,
                            }],
                              grid: {
                                row: {
                                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                    opacity: 0.5
                                },
                            },
                             xaxis: {
                                    categories: res.data.rows.date,
                                },
                            title: {
                                text: '含水量变化',
                            },
                           
                          
                        }

                        var chart = new ApexCharts(
                            document.querySelector("#water"),
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
        initSun(){
           api.water()
            .then(res => {
                if(res.data.code == '1'){  
                var options = {
                    chart: {
                        height: window.innerHeight/3,
                        type: 'bar',
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
                            return val;
                        },
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ["#304758"]
                        }
                    },
                    series: [{
                        name: '光照',
                       data: res.data.rows.temp
                    }],
                    xaxis: {
                      categories: res.data.rows.date,
                    
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
                                return val;
                            }
                        }
                    },
                    title: {
                        text: '光照变化',
                        style: {
                            color: '#444'
                        }
                    },
                }

                var chart = new ApexCharts(
                    document.querySelector("#sun"),
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
        initInfo(){
            var that =this
            api.getDataTreeById(that.object.id).then(function(res){
                if(res.data.code == '1'){
                      var options = {
                        chart: {
                            id:'info',
                            height: window.innerHeight/3,
                            type: 'line',
                            zoom: {
                                enabled: false
                            }
                        },
                        series: res.data.rows.result,
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '信息变化',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: res.data.rows.date
                        }
                    }

                    var chart = new ApexCharts(
                        document.querySelector("#info"),
                        options
                    );

                    chart.render();
                }else{
                    that.$notify.error({
                        title: '服务器出小差了',
                        message: res.data.message
                    });
                }
            }).catch(() => {
                that.$notify.error({
                    title: '服务器出小差了',
                    message: '请您稍后再试'
                });
            })
           
        }
        
    }
    
};
</script>

<style scoped>
   /*返回按钮*/
    .title{
        position:absolute;
        top:9%;
        left:20%;
        width:5rem;
        font-weight: 600;
        height:0.4rem;
        z-index:100;
    }
    .data-container{
        width: 90%;
        height: 100%;
        margin: 5%;
    }
  
</style>
