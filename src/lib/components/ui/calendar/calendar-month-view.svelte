<script>
    // import { getContext, setContext } from "svelte";
    import { CalendarStore } from "./calendar-store.svelte";
    // import { formatDate, parseDate } from "./calendar-store.svelte";
    import { ArrowRight } from "@lucide/svelte";
    import CalendarMonthData from "./calendar-month-data.svelte";
    import Calendar from "./calendar.svelte";

    let {
        data = [],
        onselectdate
    } = $props();
    let calendarStore = CalendarStore();
    // let calendarStore = getContext('calendarStore');

    let daysOfWeek = [
        { day: 0, short: 'Sun', long: 'Sunday' },
        { day: 1, short: 'Mon', long: 'Monday' },
        { day: 2, short: 'Tue', long: 'Tuesday' },
        { day: 3, short: 'Wed', long: 'Wednesday' },
        { day: 4, short: 'Thu', long: 'Thursday' },
        { day: 5, short: 'Fri', long: 'Friday' },
        { day: 6, short: 'Sat', long: 'Saturday' },
    ];
    // let dateObject = $derived(new Date(date));
    let year = $derived(calendarStore.date.getMonth());
    let month = $derived(calendarStore.date.getMonth());
    let day = $derived(calendarStore.date.getDate());
    let dayOfWeek = $derived(calendarStore.date.getDay());

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

        let year = calendarStore.date.getFullYear();
        let month = calendarStore.date.getMonth();
        let day = calendarStore.date.getDate();
        let dayOfWeek = calendarStore.date.getDay();
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

            // let dateValue = `${year}-${(month + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`;
            let dateValue = calendarStore.formatDate(dt);
            output.push({
                date: dt.getDate(),
                value: dateValue,
                data: sortByKey(data.filter(d => d.date === dateValue), 'slot')
            });
        }

        for (let i = (nextMonth.getDay() + 1); i < 7; i++) {
            let dt = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate());
            dt.setDate(dt.getDate() + (i - nextMonth.getDay()));
            output.push({
                date: dt.getDate(),
                data: [],
                value: calendarStore.formatDate(dt),
                inMonth: false
            });
                // value: `${year}-${(month + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}`,
        }
        
        return output;
    });

    const clickCell = (day) => {
        console.log('clicked day cell', day);
        calendarStore.date = new Date(day.value);
        onselectdate?.();
    };
</script>

<div class="fl-cal-month">
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
                            <CalendarMonthData {...d} />
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
        /* border: 2px solid red; */
        display: grid;
        grid-template-rows: auto 1fr;
        margin: 1rem;
        margin-top: 0;
        /* margin: 1rem 0.25rem 1rem 1rem; */
        overflow-y: auto;
    }
    .fl-cal-month-cells {
        border-left: 1px solid var(--border);
        /* border-top: 1px solid var(--border); */
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: auto;
        /* margin-right: 0.75rem; */
    }
    .fl-cal-month-cells > .fl-cell {
        border-right: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        cursor: pointer;
        /* border: 1.5px solid transparent; */
        min-height: 12rem;
        padding: 0.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 100ms ease-in-out;
    }
    .fl-cal-month-cells > .fl-cell:hover {
        /* background-color: var(--border-pale); */
        box-shadow: inset 0 0 0 3px var(--accent-border);
    }
    .fl-cal-month-headers {
        border-top: 1px solid var(--accent-border);
        border-left: 1px solid var(--accent-border);
        border-bottom: 1px solid var(--accent-border);
        /* border-right: 1px solid var(--border); */
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .fl-month-header {
        background-color: var(--accent-pale);
        border-right: 1px solid var(--accent-border);
        /* color: var(--white); */
        font-weight: 600;
        padding: 0.5rem;
        text-align: center;
    }
    .fl-cell {
        background-color: var(--white);
    }
    .fl-cell-header {
        /* border: 1px solid red; */
        /* display: block; */
        font-weight: 600;
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
        /* padding: 0.25rem 0.5rem 0; */
        /* text-align: right; */
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
        background-color: var(--border);
    }
    .fl-cell.fl-out-of-month .fl-cell-header {
        opacity: 0.5;
    }
    .fl-cell-content {
        display: grid;
        gap: 0.125rem;
    }
    .fl-cell-footer {
        background-color: transparent;
        /* border: 1px solid red; */
        border: none;
        cursor: pointer;
        display: inline;
        /* color: var(--accent); */
        font-weight: 600;
        text-align: right;
        padding: 0.25rem 0.25rem 0.25rem 0;
    }
</style>
