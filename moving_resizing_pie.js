//1) On moving circle we need to resize rect and chart - Solved
//2) On rect drag, we need to calculate new position for all circle graphics
//3) On moving circle, rect right and bottom are not stable - Solved
//4) We need to decide how to fetch fixed end coordinate when moving circles (checkout pie_graphics_only.js)

app.title = 'abc';

option = {
    series: [{
        name: 'pie',
        id: 'myPie',
        type: 'pie',
        radius: ['0%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        data: [{
                value: 335,
                name: 'q'
            },
            {
                value: 310,
                name: 'w'
            },
            {
                value: 234,
                name: 'e'
            },
            {
                value: 135,
                name: 'r'
            },
            {
                value: 1548,
                name: 't'
            }
        ]
    }]
};
if (!app.inNode) {
    setTimeout(function() {
        w = myChart.getWidth();
        h = myChart.getHeight();
        r = h * 0.35;
        l = w / 2 - r;
        t = h / 2 - r;
        rt = l + 2 * r;
        bt = t + 2 * r;
        //console.log(rt, bt)
        myChart.setOption({
            graphic: [{
                    type: 'rect',
                    id: 'a',
                    z: 100,
                    left: l,
                    progressive: true,
                    cursor: 'move',
                    top: t,
                    draggable: true,
                    scale: [1,1],
                    origin: [rt,bt],
                    shape: {
                        width: 2 * r,
                        height: 2 * r
                    },
                    ondrag: draggingPie,
                    style: {
                        opacity: 0.1
                    }
                },
                {
                    type: 'circle',
                    id: 'b',
                    progressive: true,
                    position: [l, t],
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: 5
                    },
                    draggable: true,
                    ondrag: resizePie,
                    z: 100
                }
            ]
        });
    }, 0);
}
//console.log(myChart.getOption());

function draggingPie() {

    x = this.position[0];
    y = this.position[1];
    w = myChart.getWidth();
    h = myChart.getHeight();
    r = h * 0.35;
    cx = (x + r) / w;
    cy = (y + r) / h;

    myChart.setOption({
        series: [{
            id: 'myPie',
            center: [cx * 100 + '%', cy * 100 + '%']
        }],
        graphic: [{
            id: 'a',
            left: (x / w) * 100 + '%',
            top: (y / h) * 100 + '%'
        }],
        animation: false
    });
}

var cX, cY;

function resizePie(event) {

    a = Math.abs(cX - event.offsetX);
    b = Math.abs(cY - event.offsetY);
    c = a > b ? 0 : 1;

    cX = event.offsetX;
    cY = event.offsetY;

    w = myChart.getWidth();
    h = myChart.getHeight();
    cx = w / 2; //cx and cy would change; we can use getOption to get center value
    cy = h / 2;
    k = cy - cx;

    x1 = this.position[0];
    y2 = this.position[1];
    
    rt  =  209.95000000000002 + h*0.7; //rather use cx + r; where both cx and r would be obtained from getOption
    rd = (rt - x1)/2;
    
    Cx = (x1 + rd)/w;
    Cy = (y2 + rd)/h;
    
    //console.log(myChart.getOption(),rt, rd);
    
    if (c == 1) {
        myChart.setOption({
            series: [{
            id: 'myPie',
            center: [Cx * 100 + '%', Cy * 100 + '%'],
            radius: ['0%', (rd*2)/h * 100 + '%']
        }],
            graphic: [{
                    id: 'b',
                    position: [y2 - k, y2]
                },
                {
                    id: 'a',
                    left: y2 - k,
                    top: y2,
                    shape: {
                        width: 2 * rd,
                        height: 2 * rd
                    }
                }
            ],
            animation: false
        });
    } else {
        myChart.setOption({
            series: [{
            id: 'myPie',
            center: [Cx * 100 + '%', Cy * 100 + '%'],
            radius: ['0%', (rd*2)/h * 100 + '%']
        }],
            graphic: [{
                    id: 'b',
                    position: [x1, x1 + k]
                },
                {
                    id: 'a',
                    left: x1,
                    top: x1 + k,
                    shape: {
                        width: 2 * rd,
                        height: 2 * rd
                    }
                }
            ],
            animation: false
        });
    }

}
