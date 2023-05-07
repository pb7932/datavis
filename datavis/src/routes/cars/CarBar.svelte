<script>
    import { scaleLinear } from 'd3-scale';
    export const data = [];

    const width = 500;
    const height = 350;
    const margin = {top: 0, left:150, bottom: 50, right: 20}

    const days = [6,7,8,9,10,11,12,13,14,15,16,17,18,19];

    const barWidth = width - margin.left - margin.right;
    const barHeight = (height - margin.bottom - margin.top) / days.length;

    $: yScale = scaleLinear().domain([6,19]).range([0,height - margin.bottom - margin.top])
    
</script>

<svg width={width} height={height}>
    <g transform="translate({margin.left},0)">
        {#each days as day}
            <rect x=0 y={yScale(day)} width={barWidth} height={barHeight} />
        {/each}
    </g>

    <!-- Y AXIS-->
    <g class="yaxis" transform="translate({margin.left - 10}, 0)">
        {#each days as day}
            <text y={days.indexOf(day) * (barHeight + 1.7 ) + 12}>{day}</text>
            
        {/each}
    </g>
    <!-- X AXIS -->
    <g class="xaxis" transform="translate({margin.left-3},{height-margin.bottom/8 + 2})">
        <text>0</text>
        <text x={barWidth/4}>6</text>
        <text x={2*barWidth/4 - 5}>12</text>
        <text x={3*barWidth/4 - 5}>18</text>
        <text x={barWidth - 5}>24</text>
    </g>

    <rect x={margin.left} y=0 width=1 height={height - margin.bottom/3} style="fill:black" />
    <rect x={margin.left + barWidth/4} y=0 width=1 height={height - margin.bottom/3} style="fill:black" />
    <rect x={margin.left + 2*barWidth/4} y=0 width=1 height={height - margin.bottom/3} style="fill:black" />
    <rect x={margin.left + 3*barWidth/4} y=0 width=1 height={height - margin.bottom/3} style="fill:black" />
    <rect x={margin.left + barWidth - 1} y=0 width=1 height={height - margin.bottom/3} style="fill:black" />


</svg>

<style>
    rect {
        fill: skyblue;
    }

    line {
        fill: black;
        opacity: 1;
    }

    .yaxis text {
        opacity: 0.7;
		text-anchor: end;
		dominant-baseline: middle;
	}
</style>