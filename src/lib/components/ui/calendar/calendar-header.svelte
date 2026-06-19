<script>
    import {
        Armchair,
        CalendarArrowDown,
        CalendarCog,
        ChevronLeft,
        ChevronRight,
        MapPin,
        Plus,
        Settings
    } from "@lucide/svelte";

    import { getContext, setContext } from "svelte";
    // import { CalendarStore } from "./calendar-store.svelte";
    import Button from "$lib/components/ui/button.svelte";
    import ButtonGroup from "$lib/components/ui/button-group.svelte";
    import Select from "$lib/components/ui/select.svelte";

    const calendarState = getContext('CALENDAR_STATE');
    console.log(calendarState);

    // const { date, dateDisplay, mode, updateDate, updateMode } = CalendarStore();
    // let {
    //     date = $bindable(new Date),
    //     mode = $bindable('month')
    // } = $props();
    
    // let today = new Date();
    // let dateText = $derived.by(() => {
    //     console.log('header dateText date', calendarStore.date);
    //     return `${calendarStore.date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
    //         ${calendarStore.date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}
    //     `;
    // });
    let locationText = '137 The Square';
    // let dateDisplay = $state(calendarStore.displayDate());

    const viewPreviousDay = () => {
        calendarState.date.setDate(calendarState.date.getDate() - 1);
        calendarState.date = calendarState.date;
        // updateDate(date().setDate(date().getDate() - 1));
        // calendarStore.setDatedate;
        // dateDisplay = calendarStore.displayDate();
        // console.log('viewPreviousDay', calendarStore.date);
    };

    const viewNextDay = () => {
        calendarState.date.setDate(calendarState.date.getDate() + 1);
        calendarState.date = calendarState.date;
        // updateDate(date().setDate(date().getDate() + 1));
        // calendarStore.date.setDate(calendarStore.date.getDate() + 1);
        // calendarStore.date = calendarStore.date;
        // dateDisplay = calendarStore.displayDate();
        // console.log('viewNextDay', calendarStore.date);
        // console.log('viewNextDay', calendarStore.dateDisplay);
    };

    const viewToday = () => {
        calendarState.date = new Date();
        // updateDate(new Date());
        // calendarStore.date = new Date();
        // dateDisplay = calendarStore.displayDate();
        // console.log('viewToday', calendarStore.date);
    };

    let dateDisplay = $derived(`${calendarState.date.toLocaleDateString('en-NZ', { weekday: 'long' })} -
            ${calendarState.date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`);
</script>

<div class="fl-cal-header flex-center between">
    <!-- <CmdHeader /> -->
    <div class="fl-cal-nav flex-center">
        <Button class="btn-location btn-emphasize" Icon={MapPin}>
            {locationText}
        </Button>
        <ButtonGroup>
            <Button active={calendarState.mode === 'month'} flat={true} onclick={() => calendarState.mode = 'month'}>Month</Button>
            <Button active={calendarState.mode === 'week'} flat={true} onclick={() => calendarState.mode = 'week'}>Week</Button>
            <Button active={calendarState.mode === 'day'} flat={true} onclick={() => calendarState.mode = 'day'}>Day</Button>
        </ButtonGroup>
    </div>

    <div class="fl-cal-nav flex-center">
        <Button class="btn-today btn-emphasize" Icon={CalendarArrowDown}>
            {dateDisplay}
             <!-- {calendarState.dateDisplay} -->
        </Button>

        <ButtonGroup>
            <Button flat={true} Icon={ChevronLeft} onclick={calendarState.prevDate} />
            <Button flat={true} Icon={Armchair} onclick={calendarState.todayDate}>Today</Button>
            <Button flat={true} Icon={ChevronRight} onclick={calendarState.nextDay} />
        </ButtonGroup>

        <Button Icon={Plus} />
        <Button Icon={CalendarCog} />
    </div>
</div>

<style>
    .fl-cal-header {
        /* background-color: var(--white); */
        /* border-bottom: 1.5px solid var(--border); */
        gap: 1rem;
        padding: 0.75rem 1rem;
    }
    .fl-cal-nav { gap: 1rem; }
    :global(.btn-emphasize) {
        font-weight: 600;
        text-transform: uppercase;
    }
</style>
