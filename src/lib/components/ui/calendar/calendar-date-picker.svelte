<script>
    import { getContext } from "svelte";
    import { formatDate } from "./calendar-helper.svelte";
    import { ChevronLeft, ChevronRight } from "@lucide/svelte";

    let {
        onselectdate
    } = $props();
    
    const calendarState = getContext('CALENDAR_STATE');

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
    let monthDisplay = $derived(dateObject.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long' }));

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

<div class="fl-cal-date-popover-month">
    <div class="fl-cal-date-popover-controls">
        <button type="button" class="btn-nav" onclick={() => calendarState.prevDate('month')}>
            <ChevronLeft size={16} />
        </button>
        <span>{monthDisplay}</span>
        <button type="button" class="btn-nav" onclick={() => calendarState.nextDate('month')}>
            <ChevronRight size={16} />
        </button>
    </div>
    <div class="fl-cal-date-popover-headers">
        {#each daysOfWeek as dow}
            <div class="fl-cal-date-popover-header" data-dow={dow.day}>
                {dow.short[0]}
            </div>
        {/each}
    </div>
    <div class="fl-cal-date-popover-cells">
        {#each monthDates as day}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="fl-date-popover-cell"
                class:fl-cal-date-popover-out-of-month={day.inMonth === false}
                class:fl-cal-date-popover-today={day.value === calendarState.date}
                data-date={day.value}
                onclick={() => onselectdate(day.value)}
            >
                <span>{day.date}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .fl-cal-date-popover-controls {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
    }
    .fl-cal-date-popover-controls > .btn-nav {
        height: 2rem;
        width: 2rem;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        outline: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-cal-date-popover-controls > .btn-nav:hover {
        background-color: var(--light);
    }
    .fl-cal-date-popover-month {
        display: grid;
        grid-template-rows: auto 1fr;
        margin: 1rem;
        overflow-y: auto;
    }
    .fl-cal-date-popover-controls > :nth-child(2) {
        text-align: center;
    }
    .fl-cal-date-popover-headers {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        padding: 0.5rem 0;
        margin: 0.5rem 0;
        border-bottom: 1px solid var(--light);
    }
    .fl-cal-date-popover-header {
        font-weight: 600;
        text-align: center;
    }
    .fl-cal-date-popover-cells {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: auto;
    }
    .fl-date-popover-cell {
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 100ms ease-in-out;
    }
    .fl-date-popover-cell:not(.fl-cal-date-popover-today):hover {
        background-color: var(--primary-lighter);
    }
    .fl-cal-date-popover-today {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-cal-date-popover-out-of-month {
        color: var(--semi-light);
        cursor: not-allowed;
        pointer-events: none;
    }
</style>
