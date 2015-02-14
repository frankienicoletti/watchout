
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

var drag = d3.behavior.drag()
  .on("drag", function() {
    d3.select(this).attr("cx",d3.event.x+d3.event.dx);
    d3.select(this).attr("cy",d3.event.y+d3.event.dy);
});
svg.selectAll("circle")
  .data(enemySet)
  .enter()
  .append("circle")
  .attr("class", "enemy");

var hero = svg.selectAll("circle.hero").data([1]).enter().append("circle").attr('class','hero').attr("cx", 250)
  .attr("cy", 250)
  .attr("r", 10)
  .style('fill', 'red').call(drag);


function update (data) {
  var allEnemies = svg.selectAll('circle.enemy').data(data);

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

// Update position every second
setInterval(function() {
  update(enemySet);
}, 1000);





