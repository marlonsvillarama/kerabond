<script>
    import CalendarTitle from "$lib/components/calendar-title.svelte";
    import CalendarControls from "$lib/components/calendar-controls.svelte";
    import CalendarWeek from "$lib/components/calendar-week.svelte";
    import CalendarMonth from "$lib/components/calendar-month.svelte";
    import ModeToggle from "$lib/components/mode-toggle.svelte";

    let mode = $state('week');
    let date = $state(new Date(2026, 0, 10));
</script>

<main>
    <section class="header">
        <ModeToggle bind:mode={mode} />
        <CalendarTitle {date} {mode} />
        <CalendarControls bind:date={date} {mode} />
    </section>

    <section class="content">
        {#if mode === 'week'}
            <CalendarWeek value={date} />
        {:else}
            <CalendarMonth value={date} />
        {/if}
    </section>
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
        padding: 0.5rem 0.75rem;
    }
    .header {
        padding-bottom: 0.375rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-light);
    }
    .content {
        flex: 1;
        overflow-y: auto;
    }
</style>