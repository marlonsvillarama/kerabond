<script>
    // import Calendar from "$lib/components/calendar.svelte";
    import CalendarWeek from "$lib/components/calendar-week.svelte";
    import CalendarMonth from "$lib/components/calendar-month.svelte";

    let mode = $state('week');
</script>

<div class="wrapper">
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
</div>

<style>
    .wrapper {
        border: 2px solid green;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
    .header {
        /* box-shadow: var(--shadow-sm); */
        border-bottom: 1px solid var(--border);
		padding: 0.25rem 0.75rem;
        /* z-index: 2; */
    }
    .contents {
        border: 2px solid red;
        overflow: auto;
    }
</style>