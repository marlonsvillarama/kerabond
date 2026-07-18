<script>
    import {
        Armchair,
        CalendarArrowDown,
        CalendarCog,
        ChevronLeft,
        ChevronRight,
        IdCardLanyard,
        MapPin,
        Plus,
        Settings
    } from "@lucide/svelte";

    import { getContext } from "svelte";
    import Button from "$lib/components/ui/button.svelte";
    import ButtonGroup from "$lib/components/ui/button-group.svelte";
    import Select from "$lib/components/ui/select-OLD.svelte";
    import CalendarCreateBooking from "./calendar-create-booking.svelte";
    import CalendarDateSelect from "./calendar-date-select.svelte";
    import CalendarLocationSelect from "./calendar-location-select.svelte";
    import CalendarModeSelect from "./calendar-mode-select.svelte";
    import { formatDate, parseDate } from "./calendar-helper.svelte";

    let {
        oncreate
    } = $props();

    const calendarState = getContext('CALENDAR_STATE');
    const staffState = getContext('STAFF_STATE');
    const allStaff = staffState.map(d => {
        return { text: d.name, value: d.id };
    });

    // let locationText = '137 The Square';
    let activeLocation = $derived(calendarState.selectedLocation ? calendarState.locations.find(d => d.id === calendarState.selectedLocation) : null);
    let locationText = $derived(activeLocation ? activeLocation.text : 'Select Location...');
    let dayDisplay = $derived.by(() => {
        let dt = parseDate(calendarState.date);
        return dt.toLocaleDateString('en-NZ', { weekday: 'long' });
    });
    let dateDisplay = $derived.by(() => {
        let dt = parseDate(calendarState.date);
        return dt.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' });
    });
</script>

<div class="fl-cal-header">
    <div class="fl-cal-nav flex-center">
        <CalendarLocationSelect />
    </div>

    <div class="date-display">
        <span class="day">{dayDisplay}</span><span class="date">{dateDisplay}</span>
    </div>
    
    <div class="date-nav">
        <button type="button" class="btn-nav" onclick={() => calendarState.prevDate(calendarState.mode)}>
            <ChevronLeft size={20} />
        </button>
        
        <button type="button" class="btn-nav" onclick={() => calendarState.nextDate(calendarState.mode)}>
            <ChevronRight size={20} />
        </button>

        <CalendarDateSelect />

        <CalendarModeSelect />
        
        <CalendarCreateBooking {oncreate} />
    </div>
</div>

<style>
    .fl-cal-header {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding: 1rem;
        /* gap: 1rem;
        padding: 0.75rem 1rem; */
    }
    .fl-cal-nav { gap: 0.25rem; }
    :global(.btn-emphasize) {
        font-weight: 600;
        text-transform: capitalize;
    }
    .date-nav {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .date-display {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
    }
    .date-display > .day {
        color: var(--darkest);
        font-weight: 500;
    }
    .date-display > .day::after {
        content: ", ";
        margin-right: 0.5rem;
    }
    .date-display > .date {
        color: var(--semi-dark);
        /* font-size: 1rem; */
        font-weight: 300;
    }
    .fl-cal-header > :nth-child(2) {
        display: flex;
        justify-content: center;
        /* gap: 1rem; */
    }
    .fl-cal-header > :last-child {
        display: flex;
        justify-content: end;
    }
    .btn-nav {
        height: 2.125rem;
        width: 2.125rem;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        outline: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn-nav:hover {
        background-color: var(--border);
    }
    /* :global(.btn-today) {
        background-color: transparent;
        border: 0;
        outline: none;
        font-size: 1.25rem;
        width: 10rem;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.25rem 0.5rem;
    } */
</style>
