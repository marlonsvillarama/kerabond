<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";

    import CalendarWeekSlots from "./calendar-week-slots.svelte";
    import CalendarWeekDay from "./calendar-week-day.svelte";

    let calendar = createCalendarData();
    let {
        value,
        onclose
    } = $props();
</script>

<div class="dlg-container">
    <div class="dlg-header">
        <div class="dlg-title">
            <span>{value.toLocaleDateString('en-NZ', {   })}</span>
            <button class="dlg-close" onclick={onclose}>
                Close<!-- <i class="ph ph-x"></i> -->
            </button>
        </div>
    </div>
    <div class="flex flex-cols-[120px_1fr] border-1">
        <CalendarWeekSlots />
        <CalendarWeekDay
            blocked={false}
            items={calendar.items}
            onslotselect={() => {}}
        />
    </div>
</div>

<style>
    .dlg-container {
        padding: 1rem 1.5rem 1.5rem;
        /* border: 1px solid var(--border-light); */
        border-radius: 0.5rem;
        outline: 0;
        width: 100%;
    }
    .dlg-header {
        display: grid;
        gap: 0rem;
        margin-bottom: 2rem;
    }
    .dlg-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .dlg-title > span {
        font-size: 1rem;
        font-weight: 600;
    }
    .dlg-close {
        border: 1px solid var(--border-light);
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
    .dlg-close:hover {
        box-shadow: var(--shadow-sm);
    }
</style>