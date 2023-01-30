var data = [
    { ScrumTeamName: 'Cha-Ching', score: 2},
    { ScrumTeamName: 'INDHAN', score: 3},
    { ScrumTeamName: 'Ka-Chow', score: 0},
];

var width = 800;
var height = 400;
var margin = { top: 50, bottom: 50, left: 50, right: 50 };

var svg = d3.select("#d3-container")
 .append('svg')
 .attr('height', height - margin.top - margin.bottom)
 .attr('width', width - margin.left - margin.right)
 .attr('viewBox', [0, 0, width, height]);

 var x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1);

var y = d3.scaleLinear()
 .domain([0, 20])
 .range([height - margin.bottom, margin.top]);

svg.append('g')
 .attr('fill', 'green')
 .selectAll('rect')
 .data(data.sort((a, b) => d3.descending(a.score, b.score)))
 .join('rect')
  .attr('x', (d, i) => x(i))
  .attr('y', (d) => y(d.score))
  .attr('height', d => y(0) - y(d.score))
  .attr('width', x.bandwidth())
  .attr('class', 'rectangle')

svg.append('g')
 .attr('fill', 'black')
 .selectAll('text')
 .data(data.sort((a, b) => d3.descending(a.score, b.score)))
 .join('text')
 .text((d) => d.score)
 .attr('x', (d, i) => x(i) + x.bandwidth()/2) // center of the bar
 .attr('y', (d) => y(d.score) - 6) //lift off the bar
 .attr('font-size', '25px')
 .style('text-anchor','middle')
 .style('font-weight', '900')

  function xAxis (g){
      g.attr('transform', `translate(0, ${height - margin.bottom})`)
      g.call(d3.axisBottom(x).tickFormat(i => data[i].ScrumTeamName))
      .attr('font-size', '20px')

  }

  function yAxis (g){
    g.attr('transform', `translate(${margin.left}, 0)`)
     .call(d3.axisLeft(y).ticks(null, data.format))
     .attr('font-size', '20px')
}

svg.append('g').call(yAxis);
svg.append('g').call(xAxis);
svg.node();
