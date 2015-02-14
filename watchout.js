

var w = 500;
var h = 50;
var enemySet = [];
var enemyCount = 5;
var enemyWidth = 5;

/** Initialize enemySet
 */
for (var x=0;x<enemyCount; x++) {
  enemySet.push(enemyWidth);
}

/** Create SVG element
 */
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var circles = svg.selectAll("circle")
  .data(enemySet)
  .enter()
  .append("circle");

circles.attr("cx", function(d, i) {
  return (i * 50) + 25;
})
  .attr("cy", h/2)
  .attr("r", function(d) {
    return d;
  });




// Grab a random sample of letters from the alphabet, in alphabetical order.
setInterval(function() {
  update(shuffle(enemySet)
    .slice(0, Math.floor(Math.random() * 26))
    .sort());
}, 1500);

// Shuffles the input array.
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
}