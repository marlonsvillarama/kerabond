<script>
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";
    import CalendarWeekDay from "./calendar-weekday.svelte";

    let settings = createSettingsData();

    const parseTime = (dt) => {
        let hours = dt.getHours();
        let output = `${hours > 12 ? hours - 12 : hours}:00 ${hours >= 12 ? 'PM' : 'AM'}`;
        return output;
    };

    const blockDay = (id) => {
        alert(`blocking day ${id}...`);
    };

    let {
        data = [],
        value = new Date()
    } = $props();
    let slots = $state([]);

    onMount(() => {
        // settings = createSettingsData();
        let now = new Date();
        let startHour = settings.startDay.slice(0, 2);
        let endHour = settings.endDay.slice(0, 2);
        let day = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(startHour),
            0
        );

        do {
            slots.push({ value: day, text: parseTime(day) });
            day.setMinutes(day.getMinutes() + (2 * settings.interval));
        } while (day.getHours() < endHour);
    });
</script>

<div class="wrapper">
    <div class="header border-b border-(--border)">
        <div class="time-col border-r border-(--border)"></div>
        {#each settings.weekDays as day, i}
            <div class="week-day {i < settings.weekDays.length - 1 ? 'border-r border-(--border)' : ''}">
                <div class="day-title">
                    {day.name.slice(0, 3).toUpperCase()}
                </div>
                <button class="menu" title="Menu" onclick={blockDay(i)}>
                    <i class="ph ph-gear-six"></i>
                </button>
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
            {#each settings.weekDays as day, i}
                <CalendarWeekDay
                    startDay={settings.startDay}
                    endDay={settings.endDay}
                    startShift={settings.startShift}
                    endShift={settings.endShift}
                    interval={settings.interval}
                    blocked={false}
                    blocks={[
                        // {start: '1000', end: '1100'},
                        // {start: '1400', end: '1430'}
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
        padding: 0.25rem 0.5rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0.5rem 0.5rem 0.675rem;
    }
    .day-title {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .slot {
        height: 4rem;
    }
    .menu {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        padding: 0.25rem 0.375rem 0.125rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: var(--transition);
        background-color: white;
    }
    .menu i {
        font-size: 1.25rem;
    }
    .menu:hover {
        background-color: var(--border-lightest);
    }
</style>