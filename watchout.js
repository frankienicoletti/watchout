
var w = 1500;
var h = 750;
var enemySet = [];
var enemyCount = 5;
var radius = 20;

/** Initialize enemySet
 */
for (var x=0;x<enemyCount; x++) {
  enemySet.push(radius);
}

/** Create SVG element
 */
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// hero follows mouse
svg.on('mousemove', function() {
  d3.select('.hero').attr('cx', d3.mouse(this)[0]).attr('cy', d3.mouse(this)[1])});

// apply enemy class
var enemies = svg.selectAll("circle")
  .data(enemySet)
  .enter()
  .append("circle")
  .attr("class", "enemy");

var hero = svg.selectAll("circle.hero").data([1]).enter().append("circle").attr('class','hero').attr("cx", w-100)
  .attr("cy", h-100)
  .attr("r", 20)
  .style('fill', 'red');

function update (enemies) {
  enemies.transition().duration(1500).ease("linear").attr("cx", function() {
    return (Math.floor(Math.random() * w) + 20);
  })
    .attr("cy", function() {
      return (Math.floor(Math.random() * h) + 20);
    })
    .attr("r", function(d) {
      return d;
    }).each('end', function(){
      update( d3.select(this));
    });

  enemies.on('mouseover', function(){
    d3.event.preventDefault();
    alert("You Lose");
  });

}

update(enemies);

//enemies.on('mouseover', function(){
//  alert("You Lose");
//});


