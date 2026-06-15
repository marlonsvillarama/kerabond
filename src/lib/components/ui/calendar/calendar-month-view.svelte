<script>
    let {
        date = $bindable(new Date())
    } = $props();

    let daysOfWeek = [
        { day: 0, short: 'Sun', long: 'Sunday' },
        { day: 1, short: 'Mon', long: 'Monday' },
        { day: 2, short: 'Tue', long: 'Tuesday' },
        { day: 3, short: 'Wed', long: 'Wednesday' },
        { day: 4, short: 'Thu', long: 'Thursday' },
        { day: 5, short: 'Fri', long: 'Friday' },
        { day: 6, short: 'Sat', long: 'Saturday' },
    ];
    let year = $derived(date.getMonth());
    let month = $derived(date.getMonth());
    let day = $derived(date.getDate());
    let dayOfWeek = $derived(date.getDay());

    let monthDates = $derived.by(() => {
        let output = [];

        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let dayOfWeek = date.getDay();
        let startOfMonth = new Date(year, month, 1);
        let startOfMonthDay = startOfMonth.getDay();
        // console.log(`startOfMonth (day = ${startOfMonthDay})`, startOfMonth);

        for (let i = 0; i < startOfMonthDay; i++) {
            let dt = new Date(year, month, 1);
            dt.setDate(dt.getDate() - (startOfMonthDay - i));
            output.push({
                date: dt.getDate(),
                inMonth: false
            });
        }
        
        let nextMonth = new Date(year, month + 1, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        let dayCount = nextMonth.getDate();

        for (let i = 0; i < dayCount; i++) {
            let dt = new Date(year, month, 1);
            dt.setDate(dt.getDate() + i);
            output.push({
                date: dt.getDate()
            });
        }

        for (let i = (nextMonth.getDay() + 1); i < 7; i++) {
            let dt = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate());
            dt.setDate(dt.getDate() + (i - nextMonth.getDay()));
            output.push({
                date: dt.getDate(),
                inMonth: false
            });
        }
        
        return output;
    });
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
            <div class="fl-cell" class:fl-out-of-month={day.inMonth === false}>
                <span class="fl-cell-header">{day.date}</span>
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
        min-height: 10rem;
        padding: 0.25rem;
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
        display: block;
        font-weight: 500;
        padding: 0.25rem 0.5rem 0;
        text-align: right;
    }
    .fl-cell.fl-out-of-month {
        background-color: var(--border);
    }
    .fl-cell.fl-out-of-month > .fl-cell-header {
        opacity: 0.5;
    }
</style>
