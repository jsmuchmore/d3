// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

var svgWidth = 500;
var svgHeight = 500;

var margin = { top: 20, right: 20, bottom: 20, left: 20 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
.select("body")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



d3.csv("../data/data.csv", function(error, data) {
    console.log(data);
    
    

    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });
    
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.poverty)])
      .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "black")
    .attr("opacity", "0.5")
    
    
    var circleLabels = chartGroup.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .text(d => d.abbr)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "red");
    
    
      







  });