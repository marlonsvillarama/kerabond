<script>
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";
    import CalendarWeekDay from "./calendar-week-day.svelte";

    let settings = createSettingsData();
    let timeSlots = settings.timeSlots;
</script>

<div class="time-col">
    {#each timeSlots as slot, i}
        {#if slot.time.indexOf(':30') < 0}
        <div class="slot {i < timeSlots.length - 1 ? 'border-b' : ''} border-(--border-light)">
            {slot.text}
        </div>
        {/if}
    {/each}
</div>

<style>
    .time-col {
        min-width: 4.5rem;
        width: 4.5rem;
    }
    .slot {
        font-size: 0.75rem;
        height: 4rem;
        text-align: right;
        padding-right: 0.5rem;
    }
</style>