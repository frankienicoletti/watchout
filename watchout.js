
var w = 1500;
var h = 750;
var enemySet = [];
var enemyCount = 5;
var radius = 20;
var currentScore = 0;
var highScore = 0;
var collisionCount = 0;

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
  .attr("class", "enemy")
  .attr("cx", 200)
  .attr("cy", 200);

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
}

update(enemies);

var collisionTest = false;
var collisionDetection = function() {
  var collision= false;
  console.log(d3.selectAll(".enemy")[0]);
  d3.selectAll(".enemy").each(function(d) {
    console.log(arguments);
    console.log(d);
    console.log(d3.select(this));
    console.log(d3.select(this)[0]);
    console.log(d3.select(this)[0][0].getAttribute('cx'));
    console.log(d3.select(this)[0][0]['circle']);
    console.log(d3.select(this)[0][0]['cx']['animVal']['value']);
    console.log(d3.select(this)[0][0]['cx']['animVal']['SVGLength']['value']);
    var cx = parseInt(this.attr('cx')) + radius;
    var cy = parseInt(this.attr('cy')) + radius;

    var xAxis = cx - d3.mouse(this)[0];
    var yAxis = cy - d3.mouse(this)[1];

    if (Math.sqrt(xAxis*xAxis + yAxis*yAxis) < radius*2) {
      collision = true;
    }
  });

  if (collision) {
    currentScore = 0;
    if (collision !== collisionTest) {
      collisionCount++;
    }
  }
  collisionTest = collision;
};

d3.timer(collisionDetection());