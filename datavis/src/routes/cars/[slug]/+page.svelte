<script>
    import { scaleLinear } from 'd3-scale';
    import { extent } from 'd3-array';
    import CarBar from '../CarBar.svelte';
    export let data;

    const width = 300;
    const height = 300;

    $: gpsTracking = data.gps.filter((d) => { return d.car_id == data.car_id});
    $: stops = data.stops;
    $: car_id = data.car_id;
    const car_ids = data.car_ids;


    // LINKS
    $: getIndex = function(carId) {for(let i=0; i<car_ids.length; i++) {
        if(car_ids[i] == carId)
            return i
    }}
    $: next_car_index = getIndex(car_id) == (car_ids.length - 1) ? 0 : getIndex(car_id) + 1;
    $: prev_car_index = getIndex(car_id) == 0 ? (car_ids.length - 1) : getIndex(car_id) - 1;


    // CIRCLES
    $: xScale = scaleLinear().domain(extent(data.gps.map((d) => { return d.long}))).range([0,width])
    $: yScale = scaleLinear().domain(extent(data.gps.map((d) => { return d.lat}))).range([height,0])


    // SLIDER
    let slider_value = 0;
</script>


{#if {data}}
<div>
    <a href="/cars">Car overview</a>
</div>
<div>
    <a href="../cars/{car_ids[prev_car_index]}">Previous car</a>
    <a href="../cars/{car_ids[next_car_index]}">Next car</a>
</div>

<h1>Petar Benjak - KU Leuven - r0924552</h1>
<h2>Details for car {car_id}</h2>

<input type="range" min="0" max="1440" bind:value={slider_value} style="width: 300px"/><br/>

<!-- GPS DATA -->
<svg width={width} height={height}>
    {#each gpsTracking as point}
       <circle cx={xScale(point.long)} cy={yScale(point.lat)} r="3"/>
    {/each}
</svg>

<CarBar data={data}></CarBar>

{:else}
    Loading data...
{/if}


<style>
    circle {
        fill: skyblue;
        opacity: 0.5;
    }
</style>