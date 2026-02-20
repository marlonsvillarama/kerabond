<script>
    import { onMount } from "svelte";
    import CalendarDay from "./calendar-day.svelte";
    let days = [
        { id: 1, name: 'Monday' },
        { id: 2, name: 'Tuesday' },
        { id: 3, name: 'Wednesday' },
        { id: 4, name: 'Thursday' },
        { id: 5, name: 'Friday' },
        { id: 6, name: 'Saturday' },
        { id: 7, name: 'Sunday' },
    ];
    const WEEK_START = 1;

    let weeks = $state([]);
    onMount(() => {
        let now = new Date(2026, 3, 11);
        // let now = new Date();

        let startDay = new Date(now.getFullYear(), now.getMonth(), 1);
        let endDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        let currentDay = new Date(startDay.getFullYear(), startDay.getMonth(), 1);
        // console.log(' - startDay', startDay);
        // console.log(' - endDay', endDay);

        let week = [];
        do {
            // console.log(' - currentDay', currentDay);
            let currentDate = currentDay.getDate();
            let dayOfWeek = currentDay.getDay();
            // console.log(`>>> START >> dayOfWeek = ${dayOfWeek}; currentDate = ${currentDate}`, currentDay);

            if (week.length >= 7) {
                // console.log(' - adding week to month...');
                weeks.push(week);
                week = [];
            }

            if (currentDate === 1) {
                // console.log(' - initializing new week...');
                week = [];

                let count = dayOfWeek - WEEK_START;
                // console.log(` - pre-populating week; dayOfWeek = ${dayOfWeek}; count = ${count}`);
                for (let i = 0; i < count; i++) {
                    week.push(null);
                }
            }

            week.push({
                date: new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()),
                day: dayOfWeek
            });

            if (currentDate === endDay.getDate()) {
                // console.log(` - week (${week.length}) ==>`, JSON.stringify(week));
                // console.log(` - populating until end of month; remaining = ${7 - week.length}`);
                for (let i = week.length; i < 7; i++) {
                    week.push(null);
                }
    
                // console.log(' - adding week to end of month...');
                weeks.push(week);
                break;
            }

            // console.log(` - week (${week.length}) ==>`, JSON.stringify(week));
            currentDay.setDate(currentDate + 1);
        } while (currentDay <= endDay);

        console.log('weeks', JSON.stringify(weeks));
    });
</script>

<!-- Wrapper -->
<div class="wrapper">
    <!-- Header -->
    <div class="header border-b border-(--border)">
        <!-- <div class="time-col border-r border-(--border)"></div> -->
        {#each days as day, i}
            <div class="week-day text-center {i < days.length - 1 ? 'border-r border-(--border)' : ''}">
                {day.name}
            </div>
        {/each}
    </div>
    
    <div class="calendar-contents">
        <div class="calendar-grid">
            {#each weeks as week}
            <div class="row">
                {#each days as day, i}
                <div class="slot{week[day.id - 1] ? '' : '-disabled'}">
                    {#if week[day.id - 1]}
                    <div class="title">
                        {week[day.id - 1].date.getDate()}
                    </div>
                    {/if}
                </div>
                {/each}
            </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
    .calendar-contents {
        flex: 1;
        overflow-y: auto;
    }
    .header,
    .calendar-grid {
        width: 100%;
        display: grid;
        /* background-color: aliceblue; */
    }
    .header {
        font-weight: 600;
        grid-template-columns: repeat(7, 1fr);
    }
    /* .calendar-grid { */
        /* background-color: aliceblue; */
        /* height: 1000px; */
    /* } */
    .week-day {
        background-color: var(--accent-light);
        padding: 0.25rem;
    }
    .row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .slot {
        height: 10rem;
        position: relative;
    }
    .slot-disabled {
        background: repeating-linear-gradient(
            45deg,
            white,
            white 10px,
            var(--accent) 10px,
            var(--accent) 11px
        )
    }
    .slot,
    .slot-disabled {
        border-bottom: 1px solid var(--border);
    }
    .slot:not(:last-child),
    .slot-disabled:not(:last-child) {
        border-right: 1px solid var(--border);
    }
    .title {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-weight: 500;
    }
    /* .time-col {
        background-color: aliceblue;
    } */
    /* .calendar-grid {
        height: 1000px;
    } */
</style>