<script>
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";
    import CalendarWeekDay from "./calendar-weekday.svelte";

    let settings = createSettingsData();
    // let timeSlots = $state([]);

    /* const parseTime = (dt) => {
        let hours = dt.getHours();
        let output = `${hours > 12 ? hours - 12 : hours}:00 ${hours >= 12 ? 'PM' : 'AM'}`;
        return output;
    }; */

    /* onMount(() => {
        // let now = new Date();
        let startHour = settings.startDay.slice(0, 2);
        let endHour = settings.endDay.slice(0, 2);
        let day = new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate(),
            parseInt(startHour),
            0
        );

        do {
            timeSlots.push({ value: day, text: parseTime(day) });
            day.setMinutes(day.getMinutes() + (2 * settings.interval));
        } while (day.getHours() < endHour);
        console.log('timeSlots', timeSlots);
    }); */
</script>

<div class="time-col">
    {#each settings.timeSlots as slot, i}
        <div class="slot {i < timeSlots.length - 1 ? 'border-b' : ''} border-(--border-light)">
            {slot.text}
        </div>
    {/each}
</div>

<style>
    .slot {
        height: 4rem;
    }
    /* .header {
        width: 100%;
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
    }
    .week-day {
        background-color: var(--accent-light);
        padding: 0.25rem 0.5rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0.5rem 0.5rem 0.675rem;
    }
    .day-title {
        display: flex;
        align-items: center;
        gap: 1rem;
    } */
</style>