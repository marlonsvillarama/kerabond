<script>
    import { onMount } from "svelte";

    const START_HOUR = 6;
    const END_HOUR = 19;
    const INTERVAL = 30;

    let slots = $state([]);
    onMount(() => {
        let now = new Date();
        let day = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            START_HOUR,
            0
        );

        do {
            slots.push({
                time: day.toLocaleTimeString({ hour: 'numeric', minute: 'numeric' })
            });
            day.setMinutes(day.getMinutes() + INTERVAL);
        } while (day.getHours() < END_HOUR);
        console.log('slots', slots);
    });
</script>

<div class="day-wrapper">
    {#each slots as slot, i}
        <div class="slot {i < slots.length - 1 ? 'border-b' : ''}
            border-(--border-{slot.time.indexOf('30') > 0 ? 'light' : ''})">
            {slot.time.indexOf('30') > 0 ? ' ' : slot.time}
        </div>
    {/each}
</div>

<style>
    .slot {
        /* background-color: aliceblue; */

    }
</style>