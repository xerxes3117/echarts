/*
 * Pending items: (see example for reference https://ecomfe.github.io/echarts-examples/public/editor.html?c=treemap-disk)
 * 1) How to show tooltip as in above example
 * 2) Using drill down feature (leafDepth option)
 * 3) How to show color transition for higher vs lower values (see levels option)
 * 4) Read complete treemap api for more features : https://ecomfe.github.io/echarts-doc/public/en/option.html#series-treemap
 */

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

var raw_data = [
 ["A1", "B1", "C1", 1],
 ["A1", "B1", "C1", 2],
 ["A1", "B1", "C2", 3],
 ["A1", "B2", "C1", 4],
 ["A1", "B2", "C1", 5],
 ["A1", "B2", "C2", 6],
 ["A1", "B2", "C2", 7],
 ["A2", "B1", "C1", 8],
 ["A2", "B1", "C1", 9],
 ["A2", "B1", "C2", 10],
 ["A2", "B1", "C2", 11],
 ["A2", "B2", "C1", 12],
 ["A2", "B2", "C1", 13],
 ["A2", "B2", "C2", 14],
 ["A2", "B2", "C2", 15]
];

var final_tree = [];

object = raw_data.reduce((r, a) => setValue(r, a.slice(0, -1), a[a.length - 1]), {});

for (child of walk_tree(object)) {
 final_tree.push(child);
}

console.log(final_tree);
