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
    import Select from "$lib/components/ui/select.svelte";
    import { formatDate, parseDate } from "./calendar-helper.svelte";

    const calendarState = getContext('CALENDAR_STATE');
    const staffState = getContext('STAFF_STATE');
    const allStaff = staffState.map(d => {
        return { text: d.name, value: d.id };
    });

    let locationText = '137 The Square';
    let dateDisplay = $derived.by(() => {
        let dt = parseDate(calendarState.date);
        return `${dt.toLocaleDateString('en-NZ', { weekday: 'long' })} -
            ${dt.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    });
</script>

<div class="fl-cal-header flex-center between">
    <div class="fl-cal-nav flex-center">
        <Button class="btn-location btn-emphasize border" Icon={MapPin}>
            {locationText}
        </Button>

        <Button Icon={Plus} class="border">New booking</Button>
        <!-- {#if calendarState.mode === 'month' && allStaff.length > 1}
        <Select items={allStaff} placeholder="Choose staff" />
        {/if} -->
        <!-- {calendarState.mode} -->
    </div>

    <div class="fl-cal-nav flex-center">
        <Button class="btn-today btn-emphasize border" Icon={CalendarArrowDown}>
            {dateDisplay}
        </Button>

        <ButtonGroup>
            <Button flat={true} Icon={ChevronLeft} onclick={() => calendarState.prevDate()} />
            <Button flat={true} Icon={Armchair} onclick={() => calendarState.today()}>Today</Button>
            <Button flat={true} Icon={ChevronRight} onclick={() => calendarState.nextDate()} />
        </ButtonGroup>

        <ButtonGroup>
            <!-- <Button active={calendarState.mode === 'month'} flat={true} onclick={() => calendarState.mode = 'month'}>Month</Button> -->
            <Button active={calendarState.mode === 'week'} flat={true} onclick={() => calendarState.mode = 'week'}>Week</Button>
            <Button active={calendarState.mode === 'day'} flat={true} onclick={() => calendarState.mode = 'day'}>Day</Button>
        </ButtonGroup>
        <!-- <Button Icon={CalendarCog} /> -->
    </div>
</div>

<style>
    .fl-cal-header {
        gap: 1rem;
        padding: 0.75rem 1rem;
    }
    .fl-cal-nav { gap: 1rem; }
    :global(.btn-emphasize) {
        font-weight: 600;
        text-transform: uppercase;
    }
</style>
