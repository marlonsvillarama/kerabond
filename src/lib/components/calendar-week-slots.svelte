<script>
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";
    import CalendarWeekDay from "./calendar-weekday.svelte";

    let settings = createSettingsData();
    console.log('week-slots timeSlots', settings.timeSlots);
</script>

<div class="time-col">
    {#each settings.timeSlots as slot, i}
        <div class="slot {i < settings.timeSlots.length - 1 ? 'border-b' : ''} border-(--border-light)">
            {slot.text}
        </div>
    {/each}
</div>

<style>
    /* .slot {
        height: 4rem;
    } */
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
    .slot {
        height: 5rem;
    }
</style>