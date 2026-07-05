<script>
    import { getContext } from "svelte";
    import { formatDate } from "./calendar-helper.svelte";
    import { ArrowRight } from "@lucide/svelte";
    import CalendarMonthData from "./calendar-month-data.svelte";
    import Calendar from "./calendar.svelte";

    let {
        data = [],
        style = ''
    } = $props();
    let calendarState = getContext('CALENDAR_STATE');
    let staffState = getContext('STAFF_STATE');

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
                value: dateValue,
                data: sortByKey(
                    data.filter(d => d.date === dateValue && calendarState.selectedStaff.indexOf(d.staff) >= 0)
                        .map(d => {
                            return { ...d, staffFull: staffState.find(s => s.id === d.staff)}
                        }),
                    'slot'
                )
            });
        }

        for (let i = (nextMonth.getDay() + 1); i < 7; i++) {
            let dt = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate());
            dt.setDate(dt.getDate() + (i - nextMonth.getDay()));
            output.push({
                date: dt.getDate(),
                data: [],
                value: formatDate(dt),
                inMonth: false
            });
        }
        
        return output;
    });

    const clickCell = (day) => {
        calendarState.date = day.value;
        calendarState.mode = 'day';
    };
</script>

<div class="fl-cal-month" {style}>
    <div class="fl-cal-month-headers">
        {#each daysOfWeek as dow}
            <div class="fl-month-header" data-dow={dow.day}>
                {dow.short}
            </div>
        {/each}
    </div>
    <div class="fl-cal-month-cells fl-full-scrollable">
        {#each monthDates as day}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="fl-cell"
                class:fl-out-of-month={day.inMonth === false}
                class:today={day.value === calendarState.date}
                data-date={day.value}
                onclick={() => clickCell(day)}
            >
                <div>
                    <div class="fl-cell-header flex-center between">
                        <span>{day.date}</span>
                        <span class="count" class:hidden={day.data.length <= 0}>{day.data.length > 0 ? day.data.length : ''}</span>
                    </div>
                    <div class="fl-cell-content">
                        {#each day.data.slice(0, 4) as d}
                            <CalendarMonthData {...d} staff={d.staffFull.initials} />
                        {/each}
                    </div>
                </div>
                {#if day.data.length > 4}
                    <div class="fl-cell-footer flex-center">
                        <span>{day.data.length - 4} more</span>
                        <ArrowRight size={12} />
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .fl-cal-month {
        display: grid;
        grid-template-rows: auto 1fr;
        margin: 1rem;
        margin-top: 0;
        overflow-y: auto;
    }
    .fl-cal-month-cells {
        border-left: 1px solid var(--border);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: auto;
    }
    .fl-cal-month-cells > .fl-cell {
        border-right: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        cursor: pointer;
        min-height: 12rem;
        padding: 0.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 100ms ease-in-out;
    }
    :global(.fl-cell.today) {
        box-shadow: inset 0 0 0 4px var(--primary);
    }
    .fl-cal-month-cells > .fl-cell:not(.today):not(.fl-out-of-month):hover {
        box-shadow: inset 0 0 0 4px var(--primary-lighter);
    }
    .fl-cal-month-headers {
        border-top: 1px solid var(--border);
        border-left: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .fl-month-header {
        background-color: var(--primary-lightest);
        border-right: 1px solid var(--border);
        font-weight: 600;
        padding: 0.5rem;
        text-align: center;
    }
    .fl-cell {
        background-color: var(--white);
    }
    .fl-cell-header {
        font-weight: 600;
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
    }
    .fl-cell-header > span.count {
        font-size: 0.75rem;
        background-color: var(--accent-pale);
        height: 24px;
        width: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-cell-header > span.count.hidden {
        background-color: transparent;
        color: transparent;
        height: 32px;
        width: 32px;
    }
    .fl-cell.fl-out-of-month {
        background-color: var(--lighter);
        cursor: not-allowed;
        pointer-events: none;
    }
    .fl-cell.fl-out-of-month .fl-cell-header {
        color: var(--dark);
        font-weight: 400;
        opacity: 0.5;
    }
    /* .fl-cell-content {
        display: grid;
        gap: 0.125rem;
    } */
    .fl-cell-footer {
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: inline;
        font-weight: 600;
        text-align: right;
        padding: 0.25rem 0.25rem 0.25rem 0;
    }
</style>
