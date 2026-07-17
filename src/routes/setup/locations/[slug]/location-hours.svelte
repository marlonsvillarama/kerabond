<script>
    import { onMount } from "svelte";
    import TimeSelect from "$lib/components/ui/time-select.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data = $bindable()
    } = $props();

    let weekDays = $state([
        { day: 0, name: 'Sunday' },
        { day: 1, name: 'Monday' },
        { day: 2, name: 'Tuesday' },
        { day: 3, name: 'Wednesday' },
        { day: 4, name: 'Thursday' },
        { day: 5, name: 'Friday' },
        { day: 6, name: 'Saturday' },
    ]);

    onMount(() => {
        let days = (data || '').split(',');
        console.log('days', days);

        if (days.length <= 0) {
            return weekDays.map(d => {
                return { ...d, is_active: false }
            });
        }

        weekDays = weekDays.map(wd => {
            let weekDay = days.find(d => d.indexOf(`${wd.day}:`) === 0);
            if (!weekDay) {
                return { ...wd, is_active: false }
            }

            let parts = weekDay.split(':');
            if (parts.length < 2 || !parts[1]) {
                return { ...wd, is_active: false }
            }

            let bizHours = parts[1].split('-');
            return {
                ...wd,
                is_active: true,
                start: bizHours[0],
                end: bizHours[1]
            };
        });
        console.log('weekDays', weekDays);
    });

    const toggleDay = (day) => {
        console.log('toggleDay', day);
        let index = weekDays.findIndex(d => d.day.toString() === day.toString());
        console.log('toggleDay index', index);
        weekDays[index].is_active = !weekDays[index].is_active;
        let schedule = updateSchedule();
        console.log('schedule', schedule);
        data = schedule;
    };

    const updateSchedule = () => {
        return weekDays.map(d => {
            let hours = (d.is_active && d.start && d.end) ?
                `${d.start}-${d.end}` : '';
            return `${d.day}${d.hours ? `:${d.hours}` : ''}`;
        }).join(',');
    };
</script>

<!-- data = {JSON.stringify(data)} -->

<div class="fl-loc-hours">
    <!-- <div class="row" data-id="0">
        <span class="header">&nbsp;</span>
        <span class="header">Open</span>
        <span class="header">From</span>
        <span class="header">To</span>
    </div> -->
    <!-- {JSON.stringify(weekDays)} -->
    {#each weekDays as _, i}
    <div class="row">
        <div class="day" data-day={weekDays[i].day}>
            <div class="avatar">{weekDays[i].name[0]}</div>
            <div>{weekDays[i].name}</div>
        </div>
        <Toggle id="bizday-active-{weekDays[i].day}"
            checked={weekDays[i].is_active}
            ontoggle={() => toggleDay(weekDays[i].day)}
        />
        <div class="controls">
            <TimeSelect value={weekDays[i].start} />
            <TimeSelect value={weekDays[i].end} />
        </div>
    </div>
    {/each}
</div>

<style>
    .fl-loc-hours {
        display: flex;
        flex-direction: column;
        /* gap: 0.25rem; */
        /* border: 1px solid red; */
    }
    .fl-loc-hours > .row {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        /* border:  1px solid red; */
        font-size: 0.875rem;
        padding: 0.5rem 0;
        margin-left: 1rem;
    }
    .fl-loc-hours > .row:nth-child(odd) {
        background-color: var(--lighter);
    }
    .fl-loc-hours > .row > .day {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .fl-loc-hours > .row > .day > .avatar {
        background-color: var(--primary);
        border-radius: 50%;
        color: var(--white);
        height: 1.75rem;
        width: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-loc-hours > .row > .controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    /* .fl-loc-hours > .row > .controls > input[type=text] {
        border: 1px solid red;
        width: 3rem;
    } */
    /* .fl-loc-hours > .row > .controls > .header {
        color: var(--darker);
        font-weight: 600;
    } */
</style>
