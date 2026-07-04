<script>
    import { Calendar } from "@lucide/svelte";
    import { getContext } from "svelte";
    import { formatDate } from "./calendar-helper.svelte";
    import { ArrowRight } from "@lucide/svelte";

    const calendarState = getContext('CALENDAR_STATE');
    // let items = [ 'month', 'week', 'day' ];

    let items = $state([]);
    let popover = $state();
    const changeDate = (value) => {
        calendarState.date = value;
        popover.hidePopover();
    };

    let daysOfWeek = [
        { day: 0, short: 'Sun', long: 'Sunday' },
        { day: 1, short: 'Mon', long: 'Monday' },
        { day: 2, short: 'Tue', long: 'Tuesday' },
        { day: 3, short: 'Wed', long: 'Wednesday' },
        { day: 4, short: 'Thu', long: 'Thursday' },
        { day: 5, short: 'Fri', long: 'Friday' },
        { day: 6, short: 'Sat', long: 'Saturday' },
    ];
    let dateObject = $derived(new Date(calendarState.date));
    let year = $derived(dateObject.getMonth());
    let month = $derived(dateObject.getMonth());
    let day = $derived(dateObject.getDate());
    let dayOfWeek = $derived(dateObject.getDay());

    const sortByKey = (list, key) => {
        if (key) {
            list.sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (b[key] < a[key]) return 1;
                return 0;
            });
        }
        else {
            list.sort((a, b) => {
                if (a < b) return -1;
                if (b < a) return 1;
                return 0;
            });
        }

        list = list;
        return list;
    };

    let monthDates = $derived.by(() => {
        let output = [];

        let year = dateObject.getFullYear();
        let month = dateObject.getMonth();
        let day = dateObject.getDate();
        let dayOfWeek = dateObject.getDay();
        let startOfMonth = new Date(year, month, 1);
        let startOfMonthDay = startOfMonth.getDay();

        for (let i = 0; i < startOfMonthDay; i++) {
            let dt = new Date(year, month, 1);
            dt.setDate(dt.getDate() - (startOfMonthDay - i));
            output.push({
                date: dt.getDate(),
                data: [],
                inMonth: false
            });
        }
        
        let nextMonth = new Date(year, month + 1, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        let dayCount = nextMonth.getDate();

        for (let i = 0; i < dayCount; i++) {
            let dt = new Date(year, month, 1);
            dt.setDate(dt.getDate() + i);

            let dateValue = formatDate(dt);
            output.push({
                date: dt.getDate(),
                value: dateValue
            });
        }

        for (let i = (nextMonth.getDay() + 1); i < 7; i++) {
            let dt = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate());
            dt.setDate(dt.getDate() + (i - nextMonth.getDay()));
            output.push({
                date: dt.getDate(),
                value: formatDate(dt),
                inMonth: false
            });
        }
        
        return output;
    });
</script>

<button type="button" class="fl-cal-date-select" id="fl-cal-date-select"
    popovertarget="fl-cal-date-popover"
>
    <Calendar size={16} />
</button>

<div class="fl-cal-date-popover" id="fl-cal-date-popover" popover bind:this={popover}>
    <div class="fl-cal-date-popover-month">
        <div class="fl-cal-date-popover-headers">
            {#each daysOfWeek as dow}
                <div class="fl-cal-date-popover-header" data-dow={dow.day}>
                    {dow.short}
                </div>
            {/each}
        </div>
        <div class="fl-cal-date-popover-cells">
            {#each monthDates as day}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="fl-cell"
                    class:fl-cal-date-popover-out-of-month={day.inMonth === false}
                    class:fl-cal-date-popover-today={day.value === calendarState.date}
                    data-date={day.value}
                    onclick={() => clickCell(day)}
                >
                    <div>
                        <div class="fl-cell-header flex-center between">
                            <span>{day.date}</span>
                            <!-- <span class="count" class:hidden={day.data.length <= 0}>{day.data.length > 0 ? day.data.length : ''}</span> -->
                        </div>
                        <!-- <div class="fl-cell-content">
                            {#each day.data.slice(0, 4) as d}
                                <CalendarMonthData {...d} staff={d.staffFull.initials} />
                            {/each}
                        </div> -->
                    </div>
                    <!-- {#if day.data.length > 4}
                        <div class="fl-cell-footer flex-center">
                            <span>{day.data.length - 4} more</span>
                            <ArrowRight size={12} />
                        </div>
                    {/if} -->
                </div>
            {/each}
        </div>
    </div>
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
    .fl-cal-date-popover-month {
        display: grid;
        grid-template-rows: auto 1fr;
        margin: 1rem;
        margin-top: 0;
        overflow-y: auto;
    }
    .fl-cal-date-popover-cells {
        /* border-left: 1px solid var(--border); */
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: auto;
    }
    .fl-cal-date-popover-cells > .fl-cell {
        /* border-right: 1px solid var(--border); */
        /* border-bottom: 1px solid var(--border); */
        cursor: pointer;
        /* min-height: 12rem; */
        /* padding: 0.25rem; */
        border: none;
        outline: none;
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-content: center;
        transition: all 100ms ease-in-out;
    }
    /* .fl-cal-date-popover > .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 0.5rem 0.75rem;
        text-transform: capitalize;
        width: 6rem;
    } */
    /* :global(.fl-cal-date-popover > .option.selected) {
        background-color: var(--primary);
        color: var(--white);
    } */
    /* .fl-cal-date-popover > .option:not(.selected):hover {
        background-color: var(--primary-lightest);
    } */
</style>