//1) On circle drag following steps: 
//   - Calculate new center 
//   - Calculate new radius
//   - Calculate new width for rect
//   - set all these in setOption
//2) On rect drag, we need to calculate new position for all circle graphics

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
        //console.log(w,h,r,l,t);
        myChart.setOption({
            graphic: [{
                    type: 'rect',
                    id: 'a',
                    z: 100,
                    left: l,
                    cursor: 'move',
                    top: t,
                    right: l + 2 * r,
                    bottom: t + 2 * r,
                    draggable: true,
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
    //console.log(this.position);
    console.log(myChart.getOption())
    if (c == 1) {
        myChart.setOption({
            graphic: [{
                    id: 'b',
                    position: [y2 - k, y2]
                },
                {
                    id: 'a',
                    left: ((y2 - k) / w) * 100 + '%',
                    top: (y2 / h) * 100 + '%',
                    shape: {
                        width: 2 * r,
                        height: 2 * r
                    }
                }
            ],
            animation: false
        });
    } else {
        myChart.setOption({
            graphic: [{
                    id: 'b',
                    position: [x1, x1 + k]
                },
                {
                    id: 'a',
                    left: ((y2 - k) / w) * 100 + '%',
                    top: (y2 / h) * 100 + '%',
                    shape: {
                        width: 2 * r,
                        height: 2 * r
                    }
                }
            ],
            animation: false
        });
    }

}
