<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";
    import CalendarWeekSlots from "./calendar-week-slots.svelte";
    import CalendarWeekDay from "./calendar-weekday.svelte";

    let calendarData = createCalendarData();
    let settings = createSettingsData();

    let {
        data = [],
        value = new Date()
    } = $props();

    let timeSlots = $state([]);
    let dialogDate = $state('');

    const blockDay = (id) => {
        alert(`blocking day ${id}...`);
    };

    let weekStart = $derived.by(() => {
        let dt = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        dt.setDate(value.getDate() - value.getDay() + settings.weekStart);
        // console.log(`week value`, value);
        // console.log(`weekStart`, dt);
        return dt;
    });

    let currentWeekDays = $derived.by(() => {
        let output = [];
        for (let i = 0; i < 7; i++) {
            let dt = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());
            dt.setDate(dt.getDate() + i);
            
            let obj = {
                date: dt,
                name: settings.weekDays.find(d => d.id === dt.getDay())?.name
            };
            // console.log(`* currentWeekDays obj, i = ${i}`, obj);
            output.push(obj);
        }
        return output;
    });

    let slotDialog = $state(null);
    const showForm = () => {
        // alert(`showForm value = ${value}`);
        slotDialog.showModal();
        dialogDate = calendarData.slot;
        // console.log(`dialogDate = "${dialogDate}"`)
    };
</script>

<div class="wrapper">
    <div class="header border-b-2 border-(--accent)">
        <div class="time-col border-r border-(--border)"></div>
        {#each currentWeekDays as cd, i}
            <div class="week-day {i < settings.weekDays.length - 1 ? 'border-r border-(--border)' : ''}">
                <span class="date">{cd.date.getDate().toString()}</span>
                <span class="name">{cd.name.slice(0, 3).toUpperCase()}</span>
                <button class="menu" title="Menu" onclick={blockDay(i)}>
                    <i class="ph ph-gear-six"></i>
                </button>
            </div>
        {/each}
    </div>
    
    <div class="calendar-contents">
        <div class="calendar-grid">

            <CalendarWeekSlots />

            {#each currentWeekDays as cd, i}
                <CalendarWeekDay
                    value={cd.date}
                    blocked={false}
                    blocks={[
                        { id: 1, slot: '2026/2/26 10:00', duration: 60, customer: 'Apple Villarama', service: "Men/Women (Gold Card Holder)" },
                        { id: 2, slot: '2026/2/26 11:30', duration: 30, customer: 'Marlongst Villarama', service: "Women's Haircut with Blowdry Men/Women (Gold Card Holder)" },
                        { id: 3, slot: '2026/2/27 10:30', duration: 60, customer: 'Marlongst Villarama', service: "Women's Haircut with Blowdry Men/Women (Gold Card Holder)" },
                        { id: 4, slot: '2026/2/27 11:30', duration: 90, customer: 'Marlongst Villarama', service: "Women's Haircut with Blowdry Men/Women (Gold Card Holder)" },
                    ]}
                    onslotselect={() => showForm()}
                />
            {/each}
        </div>
    </div>
</div>

<dialog class="day-dialog" bind:this={slotDialog}>
    <span>dialog</span>
    <span>{calendarData.slot}</span>
</dialog>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
    .header {
        width: 100%;
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
    }
    .calendar-contents {
        flex: 1;
        overflow-y: auto;
    }
    /* .header, */
    .calendar-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
    }
    .week-day {
        /* background-color: var(--accent-lighter); */
        padding: 0.25rem 0.5rem 0.25rem 0.75rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* position: relative; */
        /* padding: 0.5rem 0.5rem 0.675rem; */
    }
    /* .day-title {
        width: 100%;
        border: 1px solid red;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    } */
    .week-day .date {
        /* color: var(--dark); */
        font-size: 1.5rem;
        font-weight: 400;
        /* border: 1px solid red; */
        line-height: 1.5rem;
    }
    .week-day .name {
        color: var(--medium);
        /* font-size: 1.25rem; */
        font-weight: 400;
        /* border: 1px solid red; */
        line-height: 1.25rem;
    }
    .slot {
        height: 4rem;
    }
    .menu {
        /* position: absolute; */
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
    .day-dialog {
        padding: 1rem;
        /* width: 20rem;
        height: 10rem; */
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
    }
</style>