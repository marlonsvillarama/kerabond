<script>
    // import Calendar from "$lib/components/calendar.svelte";
    import CalendarTitle from "$lib/components/calendar-title.svelte";
    import CalendarControls from "$lib/components/calendar-controls.svelte";
    import CalendarWeek from "$lib/components/calendar-week.svelte";
    import CalendarMonth from "$lib/components/calendar-month.svelte";

    let mode = $state('month');
    let date = new Date();
</script>

<main>
    <div class="controls">
        <CalendarTitle {date} {mode} />
        <CalendarControls {date} {mode} />
    </div>
    <div class="content">
        {#if mode === 'week'}
        <CalendarWeek />
        {:else}
        <CalendarMonth />
        {/if}
    </div>
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
        padding: 0.5rem 0.75rem;
    }
    .controls {
        border-bottom: 1px solid var(--border-light);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .content {
        flex: 1;
        overflow-y: auto;
    }
</style>