<script>
    import { createSettingsData } from "$lib/data/settings.svelte";
    import CalendarMonthDay from "./calendar-monthday.svelte";
    import CalendarMonthday from "./calendar-monthday.svelte";

    let {
        data = [],
        value = new Date()
    } = $props();

    const settings = createSettingsData();
    // let weekDays = settings.weekDays;
    // console.log('weekDays', weekDays);

    let weeks = $derived.by(() => {
        let output = [];
        let startDay = new Date(value.getFullYear(), value.getMonth(), 1);
        let endDay = new Date(value.getFullYear(), value.getMonth() + 1, 0);
        let currentDay = new Date(startDay.getFullYear(), startDay.getMonth(), 1);
        console.log('startDay', startDay);
        console.log('endDay', endDay);

        let week = [];
        do {
            let currentDate = currentDay.getDate();
            let dayOfWeek = currentDay.getDay();

            if (week.length >= 7) {
                output.push(week);
                week = [];
            }

            if (currentDate === 1) {
                week = [];
                let count = 0;

                // if start with Sunday
                if (settings.weekStart === 0) {
                    if (dayOfWeek === 0) count = 0;
                    else count = dayOfWeek;
                }
                else {
                    if (dayOfWeek === 0) count = 6;
                    else count = dayOfWeek - 1;
                }
                console.log('** 1 count = ', count);

                for (let i = 0; i < count; i++) {
                    week.push(null);
                }
            }

            week.push({
                date: new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()),
                day: dayOfWeek
            });

            if (currentDate === endDay.getDate()) {
                for (let i = week.length; i < 7; i++) {
                    week.push(null);
                }
    
                output.push(week);
                break;
            }

            currentDay.setDate(currentDate + 1);
        } while (currentDay <= endDay);
        console.log('*** calendar-month output', output);

        return output;
    });
</script>

<div class="wrapper">
    <div class="header border-b border-(--border)">
        {#each settings.weekDays as day, i}
            <div class="week-day text-center {i < settings.weekDays.length - 1 ? 'border-r border-(--border)' : ''}">
                {day.name}
            </div>
        {/each}
    </div>
    
    <div class="calendar-contents">
        <div class="calendar-grid">
            {#each weeks as week}
            <div class="row">
                {#each settings.weekDays as day, i}
                <CalendarMonthday
                    day={week[i]}
                    disabled={settings.daysOff.indexOf(day.id) >= 0}
                />
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
    }
    .header {
        font-weight: 600;
        grid-template-columns: repeat(7, 1fr);
    }
    .week-day {
        background-color: var(--accent-light);
        padding: 0.25rem;
    }
    .row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    /* .slot {
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
    } */
</style>