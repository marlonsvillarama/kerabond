<script>
    import { getContext, setContext } from "svelte";
    import CalendarHeader from "$lib/components/ui/calendar/calendar-header.svelte";
    import CalendarMonthData from "$lib/components/ui/calendar/calendar-month-data.svelte";
    import CalendarTimelineView from "$lib/components/ui/calendar/timeline/timeline.svelte";
    import CalendarMonthView from "./calendar-month-view.svelte";
    // import CalendarTimelineView from "./timeline/calendar-timeline-view.svelte";
    import { formatDate, parseDate } from "$lib/components/ui/calendar/calendar-helper.svelte";

    let staffState = getContext('STAFF_STATE');
    // let openDrawer = $state(false);

    // let { } = $props();
    let data = [
        { id: 1, date: '2026-06-15', slot: '1100', staff: 1, duration: 120, name: 'John' },
        { id: 2, date: '2026-06-15', slot: '1430', staff: 2, duration: 60, name: 'Apple' },
        { id: 3, date: '2026-06-16', slot: '1545', staff: 3, duration: 30, name: 'Mayey' },
        { id: 4, date: '2026-06-17', slot: '1015', staff: 4, duration: 90, name: 'Linda' },
        { id: 5, date: '2026-06-18', slot: '0930', staff: 1, duration: 60, name: 'Jheng' },
        { id: 6, date: '2026-06-18', slot: '1045', staff: 2, duration: 30, name: 'Ice' },
        { id: 7, date: '2026-06-18', slot: '1300', staff: 3, duration: 120, name: 'Marlong' },
        { id: 8, date: '2026-06-18', slot: '1300', staff: 4, duration: 120, name: 'fssgdfgdfg' },
        { id: 9, date: '2026-06-18', slot: '1300', staff: 1, duration: 120, name: 'aaaa' },
        { id: 10, date: '2026-06-21', slot: '1300', staff: 2, duration: 120, name: 'iksjng ljsdbfglkjbsdfgjbasdkjbasdf' },
    ];

    const calendarMap = {
        'month': CalendarMonthView,
        'week': CalendarTimelineView,
    };

    class CalendarState {
        date = $state('');
        mode = $state('month');
        selectedStaff = $state([]);
        
        constructor (initialDate) {
            let dt = new Date();
            if (initialDate) {
                dt = new Date(initialDate);
            }

            this.date = formatDate(dt);
            this.selectedStaff = staffState.map(d => d.id);
        }

        prevDate () {
            let dt = new Date(this.date);
            const prevDay = new Date(dt.getTime());
            switch (this.mode) {
                case 'month': { prevDay.setMonth(prevDay.getMonth() - 1); break }
                case 'week': { prevDay.setDate(prevDay.getDate() - 7); break }
                case 'day': { prevDay.setDate(prevDay.getDate() - 1); break }
            }
            this.date = formatDate(prevDay);
        };

        nextDate () {
            let dt = new Date(this.date);
            const prevDay = new Date(dt.getTime());
            switch (this.mode) {
                case 'month': { prevDay.setMonth(prevDay.getMonth() + 1); break }
                case 'week': { prevDay.setDate(prevDay.getDate() + 7); break }
                case 'day': { prevDay.setDate(prevDay.getDate() + 1); break }
            }
            this.date = formatDate(prevDay);
        };

        today () {
            this.date = formatDate(new Date());
        };
    }

    const calendarState = new CalendarState();
    setContext('CALENDAR_STATE', calendarState);
</script>

<div class="fl-sub-wrapper">
    <CalendarHeader />

    <div class="fl-cal">
        <!-- {#if calendarState.mode === 'week' || calendarState.mode === 'day'} -->
            <!-- <CalendarTimelineView style="display: {calendarState.mode === 'week' ? 'block' : 'hidden'}" {data} /> -->
        <!-- {:else if calendarState.mode === 'day'}
            <CalendarTimelineView {data} /> -->
        <!-- {:else} -->
            <CalendarMonthView {data} />
        <!-- {/if} -->
    </div>
</div>

<style>
    .fl-cal {
        flex: 1;
        display: grid;
        grid-template-rows: auto 1fr;
        overflow-y: auto;
        gap: 0.5rem;
    }
</style>
