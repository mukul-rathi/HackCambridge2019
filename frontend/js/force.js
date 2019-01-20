var width = 600, height = 600

colors = ["red", "green", "blue"]
var numNodes = 30
var nodes = d3.range(numNodes).map(function(d) {
  return {
      radius: Math.random() * 50,
      fill: 'white',
      label: "hello"
    }
})

var simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-5))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collision', d3.forceCollide().radius(function(d) {
    return d.radius
  }))
  .on('tick', ticked);

function ticked() {
    var node = d3.select('svg').selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node");

    node
    .append('circle')
        .attr('r', function(d) {
            return d.radius
        })
        .merge(node)
        .attr('cx', function(d) {
            return d.x
        })
        .attr('cy', function(d) {
            return d.y
        })
        .attr('fill', function(d) {
            return d.fill
        });
        
    node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.label });

  node.exit().remove()
}