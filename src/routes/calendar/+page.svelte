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
<!-- <div class="wrapper">
    <div class="header">
        Calendar Header
    </div>
    <div class="contents">
        {#if mode === 'week'}
        <CalendarWeek />
        {:else}
        <CalendarMonth />
        {/if}
    </div>
</div> -->

<style>
    main {
        height: 100%;
        /* border: 4px solid green; */
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
    /* .wrapper {
        border: 2px solid green;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
    .header {
        border-bottom: 1px solid var(--border);
		padding: 0.25rem 0.75rem;
    }
    .contents {
        border: 2px solid red;
        overflow: auto;
    } */
</style>