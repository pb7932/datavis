<script>
    import { scaleLinear } from 'd3-scale';
    import { extent } from 'd3-array';
    export let data = none;

    const width = 600;
    const height = 600;

    // DATA
    const gpsTracking = data.cars;
    const points = data.points;
    const stops = data.stops;
    const cars = [ ... new Set(gpsTracking.map((d) => d.car_id)) ];


    // CIRCLES
    $: xScale = scaleLinear().domain(extent(gpsTracking.map((d) => { return d.long}))).range([0,width])
    $: yScale = scaleLinear().domain(extent(gpsTracking.map((d) => { return d.lat}))).range([height,0])

    // TOOLTIP
    let selected_point = undefined;

    let mouse_x, mouse_y;                            
    const setMousePosition = function(event) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    }

    // CAR SELECTION
    let selected_car = undefined;

</script>

<h2>Overview</h2>

<!-- DROPDOWN -->
<div>
    <label for="cars">Select car to highlight:</label>
    <select name="cars" id="cars" bind:value={selected_car}>
        <option value="" selected disabled hidden></option>
        {#each cars as car}
            <option value={car}>Car {car}</option>
        {/each}
    </select>
</div>

{#if selected_car}
    <div>
        Go to <a href="/cars/{selected_car}">details</a> for car {selected_car}.
    </div>
{/if}


<!-- DATA -->
{#if !{data}}
    Loading data...
{:else}
    <svg width={width} height={height}>
        <!-- GPS TRAICKING -->
        {#each gpsTracking as point}
           <circle cx={xScale(point.long)} cy={yScale(point.lat)} r="3"
                   class:selected = "{point.car_id == selected_car}"
           />
        {/each}

        <!-- POINTS OF INTEREST -->
        {#each points as point}
            <circle cx={xScale(point.long)} cy={yScale(point.lat)} r="5"
                    class="interest {point.type}" 
                    on:mouseover={function(event) {selected_point = point; setMousePosition(event)}}
                    on:mouseout={function(event) {selected_point = undefined;}}>
            </circle>
        {/each}
    </svg>
{/if}


<!-- TOOLTIP -->
{#if selected_point != undefined}
<div id="tooltip" style="left: {mouse_x + 10}px; top: {mouse_y - 10}px">
    {selected_point.name}
</div>
{/if}


<style>
    circle {
        fill: black;
        opacity: 0.01;
    }

    circle.interest {
        opacity: 1;
    }

    circle.catering {
        fill: green;
    }

    circle.domestic {
        fill: yellow;
    }

    circle.housing {
        fill: blue;
    }

    circle.professional {
        fill: red;
    }

    circle.other {
        fill: black;
    }

    #tooltip {
        background-color: lightgray;
        position: fixed;
        padding: 4px;
        border-radius: 3px;
    }

    .selected {
        fill:red;
        opacity: 0.5;
    }
</style>