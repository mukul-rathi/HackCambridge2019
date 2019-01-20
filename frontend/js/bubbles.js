

var scaleFactor = 12;
// some colour variables
  var tcBlack = "#130C0E";
  var circleTextColor = "#000";

// rest of vars
var w = 960,
    h = 800,
    maxNodeSize = 50,
    x_browser = 0,
    y_browser = 0,
    root;

var vis;
var force = d3.layout.force();

var path;
var node;

vis = d3.select("#vis").append("svg").attr("width", w).attr("height", h);

// TODO
d3.json("/hc2019/data/bubble_data.json", function(json) {

  root = json;
  root.fixed = true;
  root.x = w / 2;
  root.y = h / 4;


        // Build the path
  var defs = vis.insert("svg:defs")
      .data(["end"]);


  defs.enter().append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

     update();
});

function updateJSOND3(){
  // Re-select for update.
  // path = vis.selectAll("path").attr('class','path.link');
  // node = vis.selectAll("g").attr('class','g.node');

  d3.json("/hc2019/data/bubble_data.json", function(json) {

    root = json;
    root.fixed = true;
    root.x = w / 2;
    root.y = h / 4;


          // Build the path
    var defs = vis.insert("svg:defs")
        .data(["end"]);


    defs.enter().append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    update();
  });
}

/**
 *
 */
function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force.nodes(nodes)
        .links(links)
        .gravity(0.05)
    .charge(-1000)
    .linkDistance(200)
    .friction(0.5)
    .linkStrength(function(l, i) {return 1; })
    .size([w, h])
    .on("tick", tick)
        .start();

    path = vis.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    path.enter().insert("svg:path")
      .attr("class", "link")
      // .attr("marker-end", "url(#end)")
      .style("stroke", "#eee");


  // Exit any old paths.
  path.exit().remove();



  // Update the nodes…
  node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id; });


  // Enter any new nodes.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      //.on("click", click)
      .call(force.drag);


  var circleSize = function(d) { return Math.sqrt(d.size) * scaleFactor; }
  // Append a circle
  var circles = nodeEnter.append("svg:circle")
      .attr("r", circleSize)
      .style("fill", "#fe98fe");

  // Append images
  var images = nodeEnter.append("svg:image")
        .attr("class","nodeimage")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return Math.sqrt(d.size) * scaleFactor * -1;})
        .attr("y", function(d) { return Math.sqrt(d.size) * scaleFactor * -1;})
        .attr("height", function(d) { return Math.sqrt(d.size) * scaleFactor * 2; })
        .attr("width", function(d) { return Math.sqrt(d.size) * scaleFactor * 2; });

  // Add text to node
  var texts = nodeEnter.append("text")
      .attr("class", "nodetext")
      .attr("x", x_browser)
      .attr("y", y_browser)
      .attr("fill", circleTextColor)
      .attr("text-anchor","middle")
      .attr("dominant-baseline","middle")
      .attr("style", function(d) {return "font-size: " + Math.sqrt(d.size) * 2.3 + "px" })
      .text(function(d) { return d.text; });

  // make the image grow a little on mouse over
  var setEvents = circles
          // Append hero text
          .on( 'mousedown', function (d) {
              d3.select("h3").html ("This is the " + d.text + " node" );
           })

          .on( 'mouseenter', function() {
            // select element in current context
            d3.select( this )
              .transition()
              .attr("x", function(d) { return 0;})
              .attr("y", function(d) { return 0;})
              .attr("height", circleSize * 1.2)
              .attr("width", circleSize * 1.2);
          })
          // set back
          .on( 'mouseleave', function() {
            d3.select( this )
              .transition()
              .attr("x", function(d) { return 0;})
              .attr("y", function(d) { return 0;})
              .attr("height", circleSize)
              .attr("width", circleSize);
          });

  // Exit any old nodes.
  node.exit().remove();


  // Re-select for update.
  path = vis.selectAll("path.link");
  node = vis.selectAll("g.node");

function tick() {


    path.attr("d", function(d) {

     var dx = d.target.x - d.source.x,
           dy = d.target.y - d.source.y,
           dr = Math.sqrt(dx * dx + dy * dy);
           return   "M" + d.source.x + ","
            + d.source.y
            + "A" + dr + ","
            + dr + " 0 0,1 "
            + d.target.x + ","
            + d.target.y;
  });
    node.attr("transform", nodeTransform);
  }
}


/**
 * Gives the coordinates of the border for keeping the nodes inside a frame
 * http://bl.ocks.org/mbostock/1129492
 */
function nodeTransform(d) {
  d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
    d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
    return "translate(" + d.x + "," + d.y + ")";
   }

/**
 * Toggle children on click.
 */
// function click(d) {
//   if (d.children) {
//     d._children = d.children;
//     d.children = null;
//   } else {
//     d.children = d._children;
//     d._children = null;
//   }

//   update();
// }


/**
 * Returns a list of all nodes under the root.
 */
function flatten(root) {
  var nodes = [];
  var i = 0;

  function recurse(node) {
    if (node.children)
      node.children.forEach(recurse);
    if (!node.id)
      node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}

