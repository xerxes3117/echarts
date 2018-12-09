//1) On moving circle we need to resize rect and chart - Solved (8/12)
//2) On moving circle, rect right and bottom are not stable - Solved (8/12)
//3) We need to decide how to fetch fixed end coordinate when moving circles - Solved (9/12)
//4) On rect drag, we need to calculate new position for all circle graphics - Solved (9/12)
//5) Chart render unstable in resizePie - Solved (9/12)
//6) Pending items for implmentation in gridster project -
//    - in resizePie, how to set inner radius (donut chart)
//    - radius % (both inner and outer) are calculated using smaller value between width and height of bounding element
//    - on gridster resize we need to calculate new values for our variables in global scope and new positions for graphic elements 
//    - how to show and hide graphic elements -
//      - There's no onfocus/onfocusout so we need to add a surrounding graphic with low z 
//         and use onclick on that element to check for focusout of other elements.
//      - onclick would have to be added to charts elements also to detect focus out.
//      - Also there seems to some issue in dragging rect elements when we add border/stroke to that element.
//      - 'ondragend' and 'ondrag' can be used separately.
//         - 'ondrag' resize only graphic elements
//         - 'ondragend' resize the chart

app.title = 'abc';

option = {
    series: [{
        name: 'pie',
        id: 'myPie',
        type: 'pie',
        radius: ['0%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        animation: false,
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

var cX;
var cY;
var CX = w/2;
var CY = h/2;
var r = h * 0.35;
var rt = l + 2*r;
var bt = t + 2*r;

function draggingPie() {

    x = this.position[0];
    y = this.position[1];
    w = myChart.getWidth();
    h = myChart.getHeight();
    CX = x + r;
    CY = y + r;
    rt = x + 2*r;

    myChart.setOption({
        series: [{
            id: 'myPie',
            center: [CX, CY]
        }],
        graphic: [{id: 'a', left: x, top: y},
                  {id: 'b', position: [x, y]}],
    });
}

function resizePie(event) {

    a = Math.abs(cX - event.offsetX);
    b = Math.abs(cY - event.offsetY);
    c = a > b ? 0 : 1;

    cX = event.offsetX;
    cY = event.offsetY;

    w = myChart.getWidth();
    h = myChart.getHeight();
    k = CY - CX;

    x1 = this.position[0];
    y2 = this.position[1];
    
    r = c === 0 ? (rt - x1)/2 : (bt - y2)/2;
    
    Cx = x1 + r;
    Cy = y2 + r;
    
    if (c == 1) {
        myChart.setOption({
            series: [{
            id: 'myPie',
            center: [Cy - k, Cy],
            radius: ['0%', (r*2)/h * 100 + '%']
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
                        width: 2 * r,
                        height: 2 * r
                    }
                }
            ],
        });
    } else {
        myChart.setOption({
            series: [{
            id: 'myPie',
            center: [Cx, Cx + k],
            radius: ['0%', (r*2)/h * 100 + '%']
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
                        width: 2 * r,
                        height: 2 * r
                    }
                }
            ],
        });
    }

}
