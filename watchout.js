
var w = 1200;
var h = 550;
var enemySet = [];
var enemyCount = 5;
var radius = 20;
var currentScore = 0;
var highScore = 0;
var collisionCount = 0;
var mouse = {x: 500, y: 500};

var score = function () {
  d3.select(".current span").text(currentScore);
  d3.select(".high span").text(highScore);
  d3.select(".collisions span").text(collisionCount);
};

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
  var loc = d3.mouse(this);
  mouse = {x: loc[0], y: loc[1]};
  d3.select('.hero').attr('cx', mouse.x).attr('cy', mouse.y);
});

// apply enemy class
var enemies = svg.selectAll("circle")
  .data(enemySet)
  .enter()
  .append("circle")
  .attr("class", "enemy")
  .attr("cx", 200)
  .attr("cy", 200);
  //.attr("xlink:href", "ninjanic.png")
  //.style('fill', 'url(ninjanic.png)');

//svg.selectAll('circle').append("image").attr("xlink:href", "ninjanic.png").attr("width", 20).attr("r", 20);


var hero = svg.selectAll("circle.hero").data([1]).enter().append("circle").attr('class','hero').attr("cx", w-100)
  .attr("cy", h-100)
  .attr("r", 20)
  .style('fill', 'red');

var update = function (enemies) {
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
};

update(enemies);

var collisionTest = false;
var collisionDetection = function() {
  var collision= false;
  //var mouseX = d3.mouse[this][1];
  enemies.each(function() {
    var cx = parseInt(this.cx.animVal.value) + radius;
    var cy = parseInt(this.cy.animVal.value) + radius;
    var xAxis = cx - mouse.x;
    var yAxis = cy - mouse.y;

    if (Math.sqrt(xAxis*xAxis + yAxis*yAxis) < radius*2) {
      collision = true;
      currentScore = 0;
    }
  });

  if (collision) {
    currentScore = 0;
    if (collision !== collisionTest) {
      collisionCount++;
      if (collisionCount > 5) {
        alert("You lose!");
        collisionCount = 0;
      }
    }
  }
  collisionTest = collision;
};

var scoreUpdate = function () {
  currentScore+=2;
  if (currentScore > highScore) {
    highScore = currentScore;
  }
  score();
};

setInterval(scoreUpdate, 200);

d3.timer(collisionDetection);






