
var w = 1000;
var h = 500;
var enemySet = [];
var enemyCount = 10;
var enemyWidth = 5;

/** Initialize enemySet
 */
for (var x=0;x<enemyCount; x++) {
  enemySet.push(enemyWidth);
}



/** Create SVG element
 */
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg.selectAll("circle")
  .data(enemySet)
  .enter()
  .append("circle").attr("class", "enemy");

//var character = circle.selectAll()

function update (data) {
  var allEnemies = d3.select('circle').selectAll("enemy").data(data);

  allEnemies.attr("cx", function(d, i) {
    return (Math.floor(Math.random() * 200) + 25);
  })
    .attr("cy", function(d, i) {
      return (Math.floor(Math.random() * 100) + 25);
    })
    .attr("r", function(d) {
      return d;
    });

}

update(enemySet);

// Grab a random sample of letters from the alphabet, in alphabetical order.
setInterval(function() {
  update(enemySet);
}, 1000);