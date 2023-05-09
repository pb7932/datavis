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
    $: slider_value = 0;

    $: isInterval = (point, minutes) => Math.abs((point.day-6)*24*60 + point.hour*60 + point.minute - slider_value) <= minutes
</script>


{#if {data}}
<div class="btn-group" role="group" aria-label="Basic outlined example" style="margin-top: 30px; margin-bottom: 30px;">
    <a  href="../cars/{car_ids[prev_car_index]}">
     <button type="button" class="btn btn-outline-primary" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">Previous Car</button>
    </a>
    <a  href="../cars/{car_ids[next_car_index]}">
     <button type="button" class="btn btn-outline-primary" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">Next Car</button>
    </a>
 </div>

<h2>Details for car {car_id}</h2>

<input type="range" min="0" max="20159" bind:value={slider_value} style="width: 300px"/><br/>

<!-- GPS DATA -->
<svg width={width} height={height}>
    {#each gpsTracking as point}
       <circle cx={xScale(point.long)} cy={yScale(point.lat)} r="{isInterval(point,15) ? 5 : 3}"
               class:window="{isInterval(point,15)}"/>
    {/each}
</svg>

<CarBar stops={stops} slider_value={slider_value}></CarBar>

{:else}
    Loading data...
{/if}


<style>
    circle {
        fill: skyblue;
        opacity: 0.5;
    }

    circle.window {
        fill: red;
        opacity: 1;
    }
</style>