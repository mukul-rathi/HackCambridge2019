const data = [1, 1, 1];

const circleRadius = 60;
const circleDiameter = circleRadius * 2;

const plot = (data, svg) => {
  const circle = svg
    .selectAll('circle')
    .data(data);

  circle
    .enter()
    .append('circle')
    .attr('cy', circleRadius)
    .attr('cx', (d, i) => circleRadius + (i * circleDiameter))
    .attr('r', 0)
    .transition()
    .attr('r', circleRadius);

  circle
    .exit()
    .transition()
    .attr('r', 0)
    .remove();
};

const svg = d3.select('svg');

const addCircle = () => {
  if (data.length < 5) data.push(1);
  plot(data, svg);
};

const removeCircle = () => {
  data.pop();
  plot(data, svg);
};