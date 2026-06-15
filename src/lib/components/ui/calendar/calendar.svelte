<script>
    import CalendarHeader from "./calendar-header.svelte";
    import CalendarMonthView from "./calendar-month-view.svelte";
    import CalendarTimelineView from "./calendar-timeline-view.svelte";

    // let { mode = '' } = $props();
    let mode = $state('timeline');
</script>

<div class="fl-sub-wrapper">
    <CalendarHeader bind:mode />
    <div class="fl-cal">
        <!-- <div class="fl-cal-content">content</div> -->
        <!-- <div class=""> -->
        {#if mode === 'week'}
            <!-- <CalendarMonthView /> -->
            <span>Week Calendar</span>
        {:else if mode === 'timeline'}
            <CalendarTimelineView />
            <!-- <span>Timeline</span> -->
        {:else}
            <CalendarMonthView />
        {/if}
        <!-- </div> -->
    </div>
</div>

<style>
    .fl-cal {
        /* background-color: red; */
        /* border: 2px solid red; */
        /* display: grid; */
        flex: 1;
        /* margin: 1rem; */
        display: grid;
        grid-template-rows: auto 1fr;
        overflow-y: auto;
        gap: 0.5rem;
        /* * flex-direction: column; * */
        /* height: 100%; */
    }
    /* .fl-cal-content-wrapper {
        * height: 100%; *
        overflow-y: auto;
    } */
    /* .fl-cal-content {
        height: 1000px;
    } */
</style>
