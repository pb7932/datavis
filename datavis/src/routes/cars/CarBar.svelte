<script>
    import { scaleLinear } from 'd3-scale';
    export let stops = [];
    export let slider_value = 0;

    const width = 500;
    const height = 350;
    const margin = {top: 0, left:150, bottom: 50, right: 20}

    const days = [6,7,8,9,10,11,12,13,14,15,16,17,18,19];

    // BARS
    const barWidth = width - margin.left - margin.right;
    const barHeight = (height - margin.bottom - margin.top) / days.length;

    $: xScale = scaleLinear().domain([0,86400]).range([0,barWidth])
    $: xSliderScale = scaleLinear().domain([0,1440]).range([0,barWidth-5])
    $: yScale = scaleLinear().domain([6,19]).range([0,height - margin.bottom - margin.top])

    // TOOLTIP
    let selected_point = undefined;

    let mouse_x, mouse_y;                            
    const setMousePosition = function(event) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    }
</script>

{#if {stops}}
    <svg width={width} height={height}>
    
        <!-- REACTANGLES -->
        <g transform="translate({margin.left},0)">
            {#each days as day}
                <rect x=0 y={yScale(day)} width={barWidth} height={barHeight} />
            {/each}
            
            {#each stops as stop}
                <rect x={xScale(stop.start.time)} 
                      y={yScale(stop.start.day)} 
                      width={barWidth * (stop.end.time - stop.start.time) / 86400} 
                      height={barHeight} 
                      class = "{stop.location.location_type}"
                      on:mouseover={function(event) {selected_point = stop; setMousePosition(event)}}
                      on:mouseout={function(event) {selected_point = undefined;}}/>
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
    
        <rect x={margin.left} y=0 width=2 height={height - margin.bottom/3}  class="axis"/>
        <rect x={margin.left + barWidth/4} y=0 width=2 height={height - margin.bottom/3} class="axis" />
        <rect x={margin.left + 2*barWidth/4} y=0 width=2 height={height - margin.bottom/3} class="axis" />
        <rect x={margin.left + 3*barWidth/4} y=0 width=2 height={height - margin.bottom/3} class="axis" />
        <rect x={margin.left + barWidth - 1} y=0 width=2 height={height - margin.bottom/3} class="axis" />


        <!-- SLIDER -->
        <g transform="translate({margin.left},0)">
            <rect class="slider" x={xSliderScale(slider_value%1440)} y={yScale(Math.floor(slider_value/1440) + 6)} width={5} height={barHeight} />
        </g>
    </svg>
{/if}


<!-- TOOLTIP -->
{#if selected_point != undefined}
<div id="tooltip" style="left: {mouse_x}px; top: {mouse_y + 20}px">
    {selected_point.start.time}-{selected_point.end.time}: {selected_point.location.name} ({selected_point.location.location_type})
</div>
{/if}


<style>
    rect {
        fill: skyblue;
        opacity: 0.6;
    }

    rect.axis {
        fill: burlywood;
    }

    rect.catering {
        fill: green;
    }

    rect.domestic {
        fill: yellow;
    }

    rect.housing {
        fill: mediumblue;
    }

    rect.professional {
        fill: red;
    }

    rect.other {
        fill: black;
    }

    rect.slider {
        fill:black;
        opacity: 1;
    }

    .yaxis text {
        opacity: 0.7;
		text-anchor: end;
		dominant-baseline: middle;
	}

    #tooltip {
        background-color: lightgray;
        position: fixed;
        padding: 4px;
        border-radius: 3px;
    }
</style>