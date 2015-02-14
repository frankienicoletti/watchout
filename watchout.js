
var w = 1500;
var h = 750;
var enemySet = [];
var enemyCount = 10;
var enemyWidth = 20;

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
    d3.select(this).attr("cx",d3.event.x+d3.event.dx).attr("cy",d3.event.y+d3.event.dy);
});
svg.selectAll("circle")
  .data(enemySet)
  .enter()
  .append("circle")
  .attr("class", "enemy");

var hero = svg.selectAll("circle.hero").data([1]).enter().append("circle").attr('class','hero').attr("cx", w-20)
  .attr("cy", h-20)
  .attr("r", 20)
  .style('fill', 'red').call(drag);


function update (data) {
  var allEnemies = svg.selectAll('circle.enemy').data(data);

  allEnemies.transition().attr("cx", function(d, i) {
    return (Math.floor(Math.random() * w) + 20);
  })
    .attr("cy", function(d, i) {
      return (Math.floor(Math.random() * h) + 20);
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





