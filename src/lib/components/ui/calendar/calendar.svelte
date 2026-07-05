<script>
    import { getContext, setContext } from "svelte";
    import BookingForm from "./forms/booking-form.svelte";
    import Button from "../button.svelte";
    import CalendarHeader from "./calendar-header.svelte";
    import CalendarMonthView from "./calendar-month-view.svelte";
    import CalendarTimelineView from "./timeline/timeline.svelte";
    import Drawer from "../drawer.svelte";
    import { formatDate, parseDate } from "./calendar-helper.svelte";

    let staffState = getContext('STAFF_STATE');
    let openDrawer = $state(false);

    let { data } = $props();
    // let data = [
    //     { id: 1, date: '2026-06-15', slot: '1100', staff: 1, duration: 120, name: 'John', service: { id: 1, name: 'Haircut + blow-dry' } },
    //     { id: 2, date: '2026-06-15', slot: '1430', staff: 2, duration: 60, name: 'Apple' },
    //     { id: 3, date: '2026-06-16', slot: '1545', staff: 3, duration: 30, name: 'Mayey' },
    //     { id: 4, date: '2026-06-17', slot: '1015', staff: 4, duration: 90, name: 'Linda' },
    //     { id: 5, date: '2026-06-25', slot: '0930', staff: 1, duration: 60, name: 'Jheng' },
    //     { id: 6, date: '2026-06-25', slot: '1045', staff: 2, duration: 30, name: 'Ice' },
    //     { id: 6, date: '2026-06-25', slot: '1115', staff: 2, duration: 15, name: 'Ice' },
    //     { id: 7, date: '2026-06-25', slot: '1300', staff: 3, duration: 105, name: 'Marlong' },
    //     { id: 8, date: '2026-06-25', slot: '1300', staff: 4, duration: 30, name: 'fssgdfgdfg' },
    //     { id: 8, date: '2026-06-25', slot: '1330', staff: 4, duration: 120, name: 'fssgdfgdfg' },
    //     { id: 9, date: '2026-06-18', slot: '1300', staff: 1, duration: 90, name: 'aaaa' },
    //     { id: 10, date: '2026-06-21', slot: '1300', staff: 2, duration: 120, name: 'iksjng ljsdbfglkjbsdfgjbasdkjbasdf' },
    // ];

    class CalendarState {
        date = $state('');
        defaults = $state({
            location: 1
        });
        endHour = $state(21);
        interval = $state(15);
        locations = $state([
            { id: 1, text: '137 The Square' },
            { id: 2, text: '351 Broadway Avenue' },
        ]);
        mode = $state('month');
        selectedStaff = $state([]);
        selectedLocation = $state('');
        slot = $state('');
        slotHeight = 24;
        startHour = $state(8);
        
        constructor (initialDate) {
            let dt = new Date();
            if (initialDate) {
                dt = new Date(initialDate);
            }

            this.date = formatDate(dt);
            this.selectedStaff = staffState.map(d => d.id);
        }

        prevDate (type) {
            let dt = new Date(this.date);
            const prevDay = new Date(dt.getTime());
            switch (type) {
                case 'month': { prevDay.setMonth(prevDay.getMonth() - 1); break }
                case 'week': { prevDay.setDate(prevDay.getDate() - 7); break }
                default: { prevDay.setDate(prevDay.getDate() - 1); break }
            }
            this.date = formatDate(prevDay);
        };

        nextDate (type) {
            let dt = new Date(this.date);
            const prevDay = new Date(dt.getTime());
            switch (type) {
                case 'month': { prevDay.setMonth(prevDay.getMonth() + 1); break }
                case 'week': { prevDay.setDate(prevDay.getDate() + 7); break }
                default: { prevDay.setDate(prevDay.getDate() + 1); break }
            }
            this.date = formatDate(prevDay);
        };

        today () {
            this.date = formatDate(new Date());
        };
    }

    const calendarState = new CalendarState();
    setContext('CALENDAR_STATE', calendarState);

    const showDrawer = () => openDrawer = true;
    const hideDrawer = () => {
        if (confirm('Are you sure you want to close?') !== true) {
            e.preventDefault();
            return;
        }

        openDrawer = false;
    };
</script>

<div class="fl-sub-wrapper">
    <CalendarHeader oncreate={showDrawer} />

    <div class="fl-cal">
        {#if calendarState.mode === 'month'}
            <CalendarMonthView {data} />
        {:else}
            <CalendarTimelineView {data} oncellclick={showDrawer} />
        {/if}
        <!-- {:else if calendarState.mode === 'day'}
            <CalendarTimelineView {data} /> -->
        <!-- {:else} -->
        <!-- {/if} -->
    </div>
</div>

<Drawer bind:open={openDrawer}>
    <BookingForm onclose={hideDrawer}>
        {#snippet footer()}
        <Button onclick={hideDrawer}>Close</Button>
        {/snippet}
    </BookingForm>
</Drawer>

<style>
    .fl-cal {
        flex: 1;
        display: grid;
        grid-template-rows: auto 1fr;
        overflow-y: auto;
        gap: 0.5rem;
    }
</style>
