<script>
    import { setContext } from "svelte";
    import { SvelteDate } from "svelte/reactivity";
    // import { CalendarStore } from "./calendar-store.svelte";
    import CalendarHeader from "./calendar-header.svelte";
    import CalendarMonthView from "./calendar-month-view.svelte";
    import CalendarTimelineView from "./calendar-timeline-view.svelte";

    // const { date, mode, updateDate, updateMode } = CalendarStore();
    // let calendarStore = CalendarStore();
    // setContext('calendarStore', calendarStore);

    let props = $props();
    // let { mode = '' } = $props();
    // let date = $state(new Date());
    // let mode = $state('month');

    // let data = [
    //     { id: 1, date: '2026-06-15', slot: '1100', duration: 120, name: 'John' },
    //     { id: 1, date: '2026-06-15', slot: '1430', duration: 60, name: 'Apple' },
    //     { id: 1, date: '2026-06-15', slot: '1545', duration: 30, name: 'Mayey' },
    //     { id: 1, date: '2026-06-17', slot: '1015', duration: 90, name: 'Linda' },
    //     { id: 1, date: '2026-06-18', slot: '0930', duration: 60, name: 'Jheng' },
    //     { id: 1, date: '2026-06-18', slot: '1045', duration: 30, name: 'Ice' },
    //     { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'Marlong' },
    //     { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'fssgdfgdfg' },
    //     { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'aaaa' },
    //     { id: 1, date: '2026-06-18', slot: '1300', duration: 120, name: 'iksjngljsdbfglkjbsdfgjb' },
    // ];

    // const viewDay = () => {
    //     console.log(`calendar; selected date ==>`, calendarStore.date);
    //     // calendarStore.date = calendarStore.date;
    //     calendarStore.mode = 'day';
    // };
    // let currentView = $derived(mode());

    class CalendarState {
        date = $state(new SvelteDate(new Date()));
        mode = $state('month');
        dateDisplay = $derived(`${this.date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
            ${this.date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`);
        
        constructor (initialDate) {
            if (initialDate) {
                this.date = new SvelteDate(initialDate);
            }
        }

        prevDate () {
            console.log('prevDate, this.date', this.date);
            const prevDay = new Date(this.date.getTime());
            console.log('prevDate; prevDay', prevDay)
            prevDay.setDate(prevDay.getDate() - 1);
            // let dt = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
            // dt.setDate(dt.getDate() - 1);
            this.date = new SvelteDate(prevDay);
        };
        nextDate () {
            let dt = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
            dt.setDate(dt.getDate() + 1);
            this.date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        };
        todayDate () {
            this.date = new Date();
        }
    }

    const calendarState = new CalendarState();
    setContext('CALENDAR_STATE', calendarState);
</script>

<div class="fl-sub-wrapper">
    <CalendarHeader />

    <div class="fl-cal">
        <!-- <div class="fl-cal-content">content</div> -->
        <!-- <div class=""> -->
        <!-- {#if calendarStore.mode === 'week'}
            <CalendarTimelineView {data} />
        {:else if calendarStore.mode === 'day'}
            <CalendarTimelineView {data} />
        {:else}
            <CalendarMonthView {data} />
        {/if} -->
        {calendarState.mode}
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
