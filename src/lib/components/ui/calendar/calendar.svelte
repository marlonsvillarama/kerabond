<script>
    import CalendarHeader from "./calendar-header.svelte";
    import CalendarMonthView from "./calendar-month-view.svelte";
    import CalendarTimelineView from "./calendar-timeline-view.svelte";

    // let { mode = '' } = $props();
    let date = $state(new Date());
    let mode = $state('month');
    // let view = $state('week');

    let data = [
        { id: 1, date: '2026-06-15', slot: '1100', duration: 120, name: 'John' },
        { id: 1, date: '2026-06-15', slot: '1430', duration: 60, name: 'Apple' },
        { id: 1, date: '2026-06-15', slot: '1545', duration: 30, name: 'Mayey' },
        { id: 1, date: '2026-06-17', slot: '1015', duration: 90, name: 'Linda' },
        { id: 1, date: '2026-06-18', slot: '0930', duration: 60, name: 'Jheng' },
        { id: 1, date: '2026-06-18', slot: '1045', duration: 30, name: 'Ice' },
        { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'Marlong' },
        { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'fssgdfgdfg' },
        { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'aaaa' },
        { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'iksjngljsdbfglkjbsdfgjb' },
    ];

    const viewDay = () => {
        console.log(`selected date ==>`, date);
        mode = 'day';
    };
</script>

<div class="fl-sub-wrapper">
    <CalendarHeader bind:mode bind:date />

    <div class="fl-cal">
        <!-- <div class="fl-cal-content">content</div> -->
        <!-- <div class=""> -->
        {#if mode === 'week'}
            <CalendarTimelineView view='week' {date} {data} />
            <!-- <span>Week Calendar</span> -->
        {:else if mode === 'day'}
            <CalendarTimelineView view='day' {date} {data} />
            <!-- <span>Timeline</span> -->
        {:else}
            <CalendarMonthView bind:date {data} onselectdate={viewDay} />
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
