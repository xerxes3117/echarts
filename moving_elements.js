//Moving chart, legends and slider

//Need to take care of z index across graphic elements (so that their handles dont collide). 
//Follwing z are to be set - series,datazoom slider, legend and their corresponding graphic elements 
//in case  of rect elements need to add a border when graphic element clicked
//need to decide how to move for left and right side of slider. currently move is above  slider handle.

option = {
    color: ['#8EC9EB'],
    legend: {
        data:['高度(km)与气温(°C)变化关系'],
        z: 2000
    },
    dataZoom: [
      {
          type: 'slider',
           id: 's', 
           z: 2000,
           left: '10%', //this needs to be set so that slider doesn't move  when chart is moved
      }
    ],
    tooltip: {
        trigger: 'axis',
        formatter: "Temperature : <br/>{b}km : {c}°C"
    },
    xAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    yAxis: {
        type: 'category',
        axisLine: {onZero: false},
        axisLabel: {
            formatter: '{value} km'
        },
        boundaryGap: true,
        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
    },
    series: [
        {
            name: '高度(km)与气温(°C)变化关系',
            type: 'bar',
            smooth: true,
            barCategoryGap: 25,
            data:[15, 50, 56.5, 46.5, 22.1, 2.5, 27.7, 55.7, 76.5],
            z: 1000
        }
    ]
};

if (!app.inNode) {
    setTimeout(function () {
        myChart.setOption({
            graphic: [{
                    type: 'rect',
                    id: 'a',
                    z: 100,
                    left: 67.7, //_coordSysMgr._coordinateSystems[""0""]._rect
                    cursor: 'move',
                    top: 60, //_coordSysMgr._coordinateSystems[""0""]._rect
                    draggable: true,
                    shape: {
                        width: 541.6, //_coordSysMgr._coordinateSystems[""0""]._rect
                        height: 423 //_coordSysMgr._coordinateSystems[""0""]._rect
                    },
                    ondrag: draggingChart,
                    style: {
                        opacity: 1
                    }
                },
                {
                    type: 'rect',
                    id: 'b',
                    z: 100,
                    left: 241, //_componentsViews[9]._backgroundEl.shape.x - _componentsViews[9]._backgroundEl.invTransform
                    cursor: 'move',
                    top: 0,  //_componentsViews[9]._backgroundEl.shape.y -_componentsViews[9]._backgroundEl.invTransform
                    draggable: true,
                    shape: { //_componentsViews[9]._backgroundEl.shape
                        width: 194.7,
                        height: 24
                    },
                    ondrag: draggingLegend,
                    style: {
                        opacity: 1
                    }
                },
                {
                    type: 'polyline',
                    id: 's',
                    z: 2001,
                    draggable: true,
                    cursor: 'move',
                    //invisible: true,
                    shape: {
                    points: [[67.9,506], //_componentsViews[8]._location
                             [609,506],  //_componentsViews[8]._size
                             [609,536],  
                             [67.9,536],
                             [67.9,506]]  
                           },
                    //origin: [75, 75],
                    style: {
                    lineWidth: 5,
                    //height: 150,
                    opacity: 1,
                    stroke: 'rgb(255,0,0)',
                
                    },
                    ondrag: draggingSlider,
                }]
    }, 0);

})
}

function draggingSlider() {

x = (this.position[0]+67.9)/myChart.getWidth(); //67.9 and 506 are initial pos of graphic
y = (this.position[1]+506)/myChart.getHeight();

x1 = 100 - (x + 541.6/myChart.getWidth())*100; //_coordSysMgr._coordinateSystems[""0""]._rect
y1 = 100 - (y + 423/myChart.getHeight())*100

myChart.setOption({dataZoom: [{
                              type: 'slider',
                              id: 's',
                              left: x*100 + '%',
                              top: y*100 + '%',
                              right: x1 + '%',
                              bottom: y1 + '%'
                              }],
                   graphic: [{id: 'c', left: x*100 + '%',top: y*100 + '%'}], //graphic won't move without doing this
                   animation: false
});

}

function draggingLegend() {

x = this.position[0]/myChart.getWidth();
y = this.position[1]/myChart.getHeight();
x1 = 100 - (x + 541.6/myChart.getWidth())*100;
y1 = 100 - (y + 423/myChart.getHeight())*100

myChart.setOption({legend: [{left: x*100 + '%',
                           top: y*100 + '%',
                           right: x1 + '%',
                           bottom: y1 + '%'}],
                   graphic: [{id: 'b', left: x*100 + '%',top: y*100 + '%'}], //graphic won't move without doing this
                   animation: false
});
}

function draggingChart() {

x = this.position[0]/myChart.getWidth();
y = this.position[1]/myChart.getHeight();
x1 = 100 - (x + 541.6/myChart.getWidth())*100; //_coordSysMgr._coordinateSystems[""0""]._rect
y1 = 100 - (y + 423/myChart.getHeight())*100 //_coordSysMgr._coordinateSystems[""0""]._rect

myChart.setOption({grid: [{left: x*100 + '%',
                           top: y*100 + '%',
                           right: x1 + '%',
                           bottom: y1 + '%'}],
                   graphic: [{id: 'a', left: x*100 + '%',top: y*100 + '%'}], //graphic won't move without doing this
                   animation: false
});
}
