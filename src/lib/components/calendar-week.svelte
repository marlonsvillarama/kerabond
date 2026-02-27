<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";
    import CalendarWeekSlots from "./calendar-week-slots.svelte";
    import CalendarWeekDay from "./calendar-week-day.svelte";
    // import CalendarDialog from "./calendar-dialog.svelte";

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
    // let open = $state(false);
    const showForm = () => {
        // alert(`showForm value = ${value}`);
        slotDialog.showModal();
        dialogDate = calendarData.slot;
        // console.log(`dialogDate = "${dialogDate}"`)
        // open = true;
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
                        { id: 1, slot: '2026/2/26 10:00', duration: 60, customer: 'Apple Villarama', service: "Men/Women (Gold Card Holder)", email: 'apple.v@gmail.com', phone: '0227000215' },
                        { id: 2, slot: '2026/2/26 11:30', duration: 30, customer: 'Marlongst Villarama', service: "Women's Haircut with Blowdry Men/Women (Gold Card Holder)", email: 'apple.v11@gmail.com', phone: '0227000222' },
                        { id: 3, slot: '2026/2/27 10:30', duration: 60, customer: 'Marlonger Villaramer', service: "Women's Haircut with Blowdry Men/Women (Gold Card Holder)", email: 'apple.v22@gmail.com', phone: '0227000217' },
                        { id: 4, slot: '2026/2/27 11:30', duration: 90, customer: 'Apfel V', service: "Women's Haircut with Blowdry Men/Women (Gold Card Holder)", email: 'apple.v34345234523@gmail.com', phone: '0227000214' },
                    ]}
                    onslotselect={() => showForm()}
                />
            {/each}
        </div>
    </div>
</div>

<!-- <CalendarDialog bind:open={open} /> -->


<dialog class="day-dialog" bind:this={slotDialog}>
    <div class="dlg-header">
        <div class="dlg-title">
            <span>Appointment Details</span>
            <i class="ph ph-x"></i>
        </div>
        {#if calendarData.block}
            <span class="dlg-desc">Update your appointment details here</span>
        {:else}
            <span class="dlg-desc">Add an appointment</span>
        {/if}
    </div>
    <!-- <span>{calendarData.slot}</span> -->
    <div class="dlg-contents">
        <div class="contact">
            <span class="name">{calendarData.block?.customer}</span>
            <span class="phone">{calendarData.block?.phone}</span>
            <span class="email">{calendarData.block?.email}</span>
        </div>
        <!-- <div class="row">
            <label for="customer">Customer Name</label>
        </div>
        <div class="row">
            <label for="phone">Phone</label>
        </div>
        <div class="row">
            <label for="email">Email</label>
        </div> -->
        <div class="row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" />
        </div>
    </div>
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
        padding: 1rem 1.5rem;
        top: 35%;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid var(--border-light);
        border-radius: 0.5rem;
        outline: 0;
        width: 30rem;
    }
    .dlg-header {
        display: grid;
        gap: 0rem;
        margin-bottom: 1rem;
    }
    .dlg-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .dlg-title > span {
        font-size: 1rem;
        font-weight: 600;
    }
    .dlg-desc {
        color: var(--medium);
    }
    .dlg-contents {
        display: grid;
        gap: 1rem;
    }
    .row * {
        display: grid;
        font-size: 0.875rem;
    }
    .row > label {
        /* border: 1px solid red; */
        font-weight: 500;
    }
    input[type=email],
    input[type=tel],
    input[type=text],
    select
    {
        border: 1px solid var(--border-light);
        border-radius: 0.375rem;
        padding: 0.25rem 0.5rem;
        width: 100%;
        /* outline: 1px solid var(--accent); */
    }
    input[type=tel] {
        width: 10rem;
    }
    input[type=email]:focus,
    input[type=tel]:focus,
    input[type=text]:focus,
    select {
        border: 1px solid var(--accent);
        box-shadow: 0 0 5px var(--accent-light);
        outline: none;
        /* outline: 2px solid var(--accent); */
    }
    .contact {
        padding: 0.25rem 0.5rem;
        background-color: var(--accent-lightest);
        border: 0;
        /* border: 1px solid var(--border-lighter); */
        border-radius: 0.375rem;
        box-shadow: 0 0 3px var(--accent);
        display: grid;
    }
    .contact > span {
        color: var(--medium);
    }
    .contact > span.name {
        color: var(--darkest);
        font-size: 1rem;
        font-weight: 600;
    }
</style>