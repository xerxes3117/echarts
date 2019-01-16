/*
 * For Data array check out https://github.com/xerxes3117/echarts/blob/master/treemap_data.js
 * Pending items: (see example for reference https://ecomfe.github.io/echarts-examples/public/editor.html?c=treemap-disk)
 *   1) How to show tooltip as in above example - Done (1/16/2019)
 *   2) Using drill down feature (leafDepth option) - Done (1/16/2019)
 *   3) How to show color transition for higher vs lower values (see levels option) - Done (1/16/2019)
 *   4) Check if breadcrumb correct
 *   5) Read complete treemap api for more features : https://ecomfe.github.io/echarts-doc/public/en/option.html#series-treemap
 */

let new_data = [];
let data_fields = ["campaign", "fico_band", "SUM_applications"]

data.forEach(d => {
  let elArr = [];
  data_fields.forEach(e => {
    elArr.push(d[e]);
  })
  new_data.push(elArr);
});

var raw_data = new_data;

var final_tree = [];

function setValue(object, path, value) {
 var last = path.pop();
 path.reduce((o, k) => o[k] = o[k] || {}, object)[last] = value;
 return object;
}

function* walk_tree(tree) {
 for (var k in tree) {
  if (tree.hasOwnProperty(k)) {
   if (typeof(tree[k]) == "object") {
    var value_list = [];
    value_list.push(...walk_tree(tree[k]))
    result = {
     "name": k,
     "children": value_list,
     "value": value_list.map(d => d['value']).reduce((a, b) => a + b)
    }
    yield result;
   } else {
    yield {
     "name": k,
     "value": parseFloat(tree[k])
    };
   }
  }
 }
}

function getLevelOption() {
    //This function will depend upon the number of levels (group by) in data
    //In return 1st element is top level i.e the series
    //Further we need 1 element for each field 
    return [
            {
                itemStyle: {
                    normal: {
                        //borderColor: '#777',
                        borderWidth: 0,
                        gapWidth: 4,
                        
                    }
                },
                upperLabel: {
                    normal: {
                        show: false
                    }
                }
            },
            {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        gapWidth: 1,
                        borderColorSaturation: 0.6
                    }
                }
            }
    ];
}
    
object = raw_data.reduce((r, a) => setValue(r, a.slice(0, -1), a[a.length - 1]), {});

for (child of walk_tree(object)) {
 final_tree.push(child);
}

myChart.setOption(option = {

        tooltip: {
            formatter: function (info) {
                let myDiv = [];
                info.treePathInfo.forEach((d,i) => {
                    let elSpan;
                    if(i != 0) {
                        elSpan = '<span>' + data_fields[i-1].toUpperCase() + " : " + d.name + "</span><br>";
                        myDiv.push(elSpan);
                    }
                });
                //Final el span will contain the value metric (sum_application in this case). 
                //Data_fields[2] would not be static
                let final_elSpan = '<span>' + data_fields[2].toUpperCase() + " : " + info.value + '</span><br>';
                myDiv.push(final_elSpan);
                return(myDiv.join(''));
            }
        },

        series: [
            {
                type:'treemap',
                name: 'Applications',
                label: {
                  show: true,
                  position: 'insideBottomRight',
                  formatter: function(d) {
                    let myDiv = ''
                   }
                },
                upperLabel: {
                    normal: {
                        show: true,
                        height: 30
                    }
                },
                leafDepth: 1, //This should be variable depending upon number of levels in data
                data: final_tree,
                levels: getLevelOption()
            }
        ]
    });

