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
    const START = {
        DAY: '0600',
        SHIFT: '0830'
    };
    const END = {
        DAY: '2000',
        SHIFT: '1700'
    };
    const INTERVAL = 30;

    const parseTime = (dt) => {
        let hours = dt.getHours();
        let output = `${hours > 12 ? hours - 12 : hours}:00 ${hours >= 12 ? 'PM' : 'AM'}`;
        return output;
    };

    let slots = $state([]);
    onMount(() => {
        let now = new Date();
        let startHour = START.DAY.slice(0, 2);
        let endHour = END.DAY.slice(0, 2);
        let day = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(startHour),
            0
        );

        do {
            slots.push({ value: day, text: parseTime(day) });
            day.setMinutes(day.getMinutes() + (2 * INTERVAL));
        } while (day.getHours() < endHour);
        console.log('slots', slots);
    });
</script>

<!-- Wrapper -->
<div class="wrapper">
    <!-- Header -->
    <div class="header border-b border-(--border)">
        <div class="time-col border-r border-(--border)"></div>
        {#each days as day, i}
            <div class="week-day text-center {i < days.length - 1 ? 'border-r border-(--border)' : ''}">
                {day.name}
            </div>
        {/each}
    </div>
    
    <div class="calendar-contents">
        <div class="calendar-grid">
            <div class="time-col">
                {#each slots as slot, i}
                    <div class="slot {i < slots.length - 1 ? 'border-b' : ''} border-(--border-light)">
                        {slot.text}
                    </div>
                {/each}
            </div>
            {#each days as day, i}
                <!-- <div class="week-day {i < days.length - 1 ? 'border-r border-(--border)' : ''}">
                    {day.id}
                </div> -->
                <CalendarDay
                    startDay={START.DAY}
                    endDay={END.DAY}
                    startShift={START.SHIFT}
                    endShift={END.SHIFT}
                    interval={INTERVAL}
                    blocked={false}
                    blocks={[
                        {start: '1000', end: '1100'},
                        {start: '1400', end: '1430'}
                    ]}
                />
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
        grid-template-columns: 100px repeat(7, 1fr);
    }
    .week-day {
        background-color: var(--accent-light);
        padding: 0.25rem;
    }
    .slot {
        height: 4rem;
    }
    /* .calendar-grid {
        height: 1000px;
    } */
</style>