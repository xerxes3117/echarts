//Issue: Doesn't work for datapoints less than 20
//Another separate possible solution: rotate labels based on number of datapoints and labels length

var data1 = ['Campaign 1'
        , 'Campaign 2'
        , 'Campaign 3'
        , 'Campaign 4'
        , 'Campaign 5'
        , 'Campaign 6'
        , 'Campaign 7'
        , 'Campaign 8'
        , 'Campaign 9'
        , 'Campaign 10'
        , 'Campaign 11'
        , 'Campaign 12'
        , 'Campaign 13'
        , 'Campaign 14'  
        , 'Campaign 15'
        , 'Campaign 16'
        , 'Campaign 17'
        , 'Campaign 18'
        , 'Campaign 19'
        , 'Campaign 20'
        /**/
        ]

option = {
    xAxis: {
        type: 'category',
        axisTick: {
            alignWithLabel: true
        },
        data: data1,
        axisLabel: {
          //rotate: '35'  
          //width: 200
        },
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1320, 732, 920
        , 820, 932, 901, 934, 1290, 1330, 1320, 1320, 732, 920
        /**/
        ],
        type: 'line'
    }]
};

    setTimeout(function () {
 //myChart.on('finished', function () {
            
    var len = myChart
      ._coordSysMgr
      ._coordinateSystems[0]
      ._axesList[0]["__\u0000ec_inner_8_0.89235"]
      .labels[0]
      .value
      .labels
      .length;

      if(len != data1.length) {
          console.log("condition ran with len: \n", len, "\n and chart instance \n", myChart);
          option.xAxis.axisLabel.rotate = '25';
          
          myChart.setOption(option);
      }
});
     
