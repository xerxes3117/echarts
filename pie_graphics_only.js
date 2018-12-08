//1) Try using ternary operators in resiePie

app.title = 'abc';

option = {};

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
                    cursor: 'move',
                    top: t,
                    draggable: true,
                    shape: {width: 2 * r, height: 2 * r},
                    //ondrag: draggingPie,
                    style: {opacity: 0.1}
                },
                {
                    type: 'circle',
                    id: 'b',
                    position: [l, t],
                    shape: {cx: 0,cy: 0,r: 5},
                    draggable: true,
                    ondrag: resizePie,
                    z: 100
                }
            ]
        });
    }, 0);
}

var cX, cY;
var rt = l + 2*r;
var k = t - l;

function resizePie(event) {

    a = Math.abs(cX - event.offsetX);
    b = Math.abs(cY - event.offsetY);
    c = a > b ? 0 : 1;
    cX = event.offsetX;
    cY = event.offsetY;

    x1 = this.position[0];
    y2 = this.position[1];
    
    wn = rt - x1;
    
    if (c == 1) {
        myChart.setOption({
            graphic: [{
                    id: 'b',
                    position: [y2 - k, y2]
                },
                {
                    id: 'a',
                    left: (y2 - k),
                    top: (y2),
                    shape: {width: wn, height: wn}
                }
            ],
        });
    } else {
        myChart.setOption({
            graphic: [{
                    id: 'b',
                    position: [x1, x1 + k]
                },
                {
                    id: 'a',
                    left: x1,
                    top: x1 + k,
                    shape: {width: wn, height: wn}
                }
            ],
        });
    }

}
