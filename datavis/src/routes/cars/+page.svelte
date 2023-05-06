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



</script>


<h1>Petar Benjak - KU Leuven - r0924552</h1>
<h2>Overview</h2>

<div>
    <label for="cars">Select car to highlight:</label>
    <select name="" id="cars">
        {#each cars as car}
            <option value="">Car {car}</option>
        {/each}
    </select>
</div>

{#if !{data}}
    Loading data...
{:else}
    <svg width={width} height={height}>
        <!-- GPS TRAICKING -->
        {#each gpsTracking as point}
           <circle cx={xScale(point.long)} cy={yScale(point.lat)} r="3"/>
        {/each}

        <!-- POINTS OF INTEREST -->
        {#each points as point}
            <circle class="interest {point.type}" cx={xScale(point.long)} cy={yScale(point.lat)} r="5"/>
        {/each}
    </svg>
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
</style>