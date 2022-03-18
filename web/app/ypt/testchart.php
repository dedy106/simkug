<!-- <script src="js/highcharts2.js"></script>-->
<script src="../../../web/js/bullet.js"></script> 
<div id="container1"></div>
<div id="container2"></div>
<div id="container3"></div>
<div id="container4"></div>

<style>#container1 {
    max-width: 800px;
    height: 115px;
    margin: 1em auto;
}
#container2, #container3 {
    max-width: 800px;
    height: 85px;
    margin: 1em auto;
}
.hc-cat-title {
  font-size: 13px;
  font-weight: bold;
}</style>

<script>
    Highcharts.setOptions({
    chart: {
        inverted: true,
        marginLeft: 135,
        type: 'bullet'
    },
    title: {
        text: null
    },
    legend: {
        enabled: false
    },
    yAxis: {
        gridLineWidth: 0
    },
    plotOptions: {
        series: {
            pointPadding: 0.25,
            borderWidth: 0,
            color: '#000',
            targetOptions: {
                width: '200%'
            }
        }
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    }
});

Highcharts.chart('container1', {
    chart: {
        marginTop: 40
    },
    title: {
        text: 'Anggaran & Realisasi'
    },
    xAxis: {
        categories: ['<span class="hc-cat-title">Revenue</span><br/>U.S. $ (1,000s)']
    },
    yAxis: {
        plotBands: [{
            from: 0,
            to: 250,
            color: '#666'
        },{
            from: 250,
            to: 9e9,
            color: '#bbb'
        }],
        title: null
    },
    series: [{
        data: [{
            y: 275,
            target: 250
        }]
    }],
    tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})'
    }
});

Highcharts.chart('container2', {
    xAxis: {
        categories: ['<span class="hc-cat-title">Profit</span><br/>%']
    },
    yAxis: {
        plotBands: [{
            from: 0,
            to: 20,
            color: '#666'
        }, {
            from: 20,
            to: 25,
            color: '#999'
        }, {
            from: 25,
            to: 100,
            color: '#bbb'
        }],
        labels: {
            format: '{value}%'
        },
        title: null
    },
    series: [{
        data: [{
            y: 22,
            target: 27
        }]
    }],
    tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})'
    }
});


Highcharts.chart('container3', {
    xAxis: {
        categories: ['<span class="hc-cat-title">New Customers</span><br/>Count']
    },
    yAxis: {
        plotBands: [{
            from: 0,
            to: 1400,
            color: '#666'
        }, {
            from: 1400,
            to: 2000,
            color: '#999'
        }, {
            from: 2000,
            to: 9e9,
            color: '#bbb'
        }],
        labels: {
            format: '{value}'
        },
        title: null
    },
    series: [{
        data: [{
            y: 1650,
            target: 2100
        }]
    }],
    tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})'
    },
    credits: {
        enabled: true
    }
});

Highcharts.chart('container4', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
    }]
});
</script>