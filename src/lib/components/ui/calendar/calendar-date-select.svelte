<script>
    import { Calendar } from "@lucide/svelte";
    import { getContext } from "svelte";
    import { formatDate } from "./calendar-helper.svelte";
    import { ArrowRight, ChevronLeft, ChevronRight } from "@lucide/svelte";
    import CalendarDatePicker from "./calendar-date-picker.svelte";

    const calendarState = getContext('CALENDAR_STATE');

    let popover = $state();
    let items = $state([]);

    const changeDate = (value) => {
        calendarState.date = value;
        console.log(`changeDate date = ${value}`);
        popover.hidePopover();
    };
</script>

<button type="button" class="fl-cal-date-select" id="fl-cal-date-select"
    popovertarget="fl-cal-date-popover"
>
    <Calendar size={16} />
</button>

<div class="fl-cal-date-popover" id="fl-cal-date-popover" popover bind:this={popover}>
    <CalendarDatePicker onselectdate={changeDate} />
</div>

<style>
    .fl-cal-date-select {
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
        margin-right: 1rem;
    }
    .fl-cal-date-select:hover {
        background-color: var(--border);
    }
    .fl-cal-date-popover {
        position-area: block-end span-inline-start;
        position-try-fallbacks: flip-inline;
        margin-top: 2px;
        background-color: var(--white);
        border: 1px solid var(--border);
        border-radius: var(--border-radius);
        font-size: 0.875rem;
    }
</style>