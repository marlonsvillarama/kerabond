<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";

    const calendarData = createCalendarData();
    const settings = createSettingsData();
    let {
        blocked = false,
        blocks = [
        ],
        data = [],
        startDay = settings.startDay,
        startShift = settings.startShift,
        endDay = settings.endDay,
        endShift = settings.endShift,
        interval = settings.interval,
        value = new Date(),
        onslotselect
    } = $props();

    const parseDateTime = (dt) => {
        return `${dt.getFullYear()}/${(dt.getMonth() + 1)}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes().toString().padStart(2, '0')}`;
    };

    const toTimeInt = (dt) => {
        return parseInt(`${dt.getHours()}${dt.getMinutes().toString().padStart(2, '0')}`);
    }

    let slots = $state([]);
    
    // let now = new Date();
    let day = new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate(),
        parseInt(startDay.slice(0, 2)),
        parseInt(startDay.slice(2))
    );
    // console.log('*** START day', day);
    // let timeSlots = $state([]);

    // const showForm = (value) => {
        // alert(`showForm value = ${value}`);
        // document.getElementById('day-dialog').showModal();
        // dialogDate = value;
        // console.log(`dialogDate = "${dialogDate}"`)
    // };

    const calcAppointmentHeight = (slot) => {
        let appointment = blocks.find(b => b.slot === slot);
        return Math.floor(appointment.duration / 30);
        // let str = `calc(${settings.slotHeight} * Math.floor(${appointment.duration} / 30))`;
        // console.log(`calcAppointmentHeight str`, str);
    };

    const calcAppointmentY = (slot) => {
        let dt = new Date(slot);
        let start = new Date(
            dt.getFullYear(),
            dt.getMonth(),
            dt.getDate(),
            parseInt(settings.startDay.slice(0, 2)),
            parseInt(settings.startDay.slice(2))
        );
        console.log(`calcAppointmentCoords dt`, dt);
        console.log(`calcAppointmentCoords start`, start);
        let interval = Math.floor((dt.getTime() - start.getTime()) / 1800000);
        console.log(`interval = ${interval}`);
        return interval;
    };

    const getSlotAppointment = (slot) => {
        return blocks.find(b => b.slot === slot);
    };

    const hasAppointment = (slot) => {
        let appointment = blocks.find(b => b.slot === slot);
        console.log(`hasAppointment; slot = ${slot}`, appointment);
        return !!appointment;
    };

    const setSlot = (slot) => {
        calendarData.slot = slot;
        onslotselect();
    };

    const showAppointment = (slot) => {
        alert(`showAppointment slot = ${slot}`);
        calcAppointmentCoords(slot);
    };

    onMount(() => {
        // console.log('** weekDay value', value);
        do {
            let isBlockedSlot = false;
            blocks.forEach(b => {
                if (parseInt(b.start) <= toTimeInt(day) && parseInt(b.end) > toTimeInt(day)) {
                    isBlockedSlot = true;
                }
            });
            slots.push({
                value: parseDateTime(day),
                // time: parseTime(day),
                // text: parseTime(day),
                disabled: (
                    toTimeInt(day) < parseInt(startShift) ||
                    toTimeInt(day) >= parseInt(endShift)
                ) ||
                settings.daysOff.indexOf(value.getDay()) >= 0 ||
                isBlockedSlot === true
            })
            day.setMinutes(day.getMinutes() + interval);
            day = new Date(
                value.getFullYear(),
                value.getMonth(),
                value.getDate(),
                day.getHours(),
                day.getMinutes()
            );
        } while (day.getHours() < parseInt(endDay.slice(0, 2)));
        console.log('slots', slots);
    });
    // () => showForm(slot.value)
</script>

<div class="day-wrapper">
    {#each slots as slot, i}
        <div data-slot={slot.value}
            onclick={() => setSlot(slot.value)}
            class="slot
                {slot.disabled === true ? 'slot-disabled' : ''}
                {i < slots.length - 1 && slot.value.indexOf('30') > 0 ? 'slot-end' : ''}"
        >
            {slot.value}
        </div>
    {/each}
    {#each blocks as block, i}
        {#if hasAppointment(block.slot)}
            <div class="appointment" onclick={() => showAppointment(block.slot)}
                style="top:calc(2.5rem * {calcAppointmentY(block.slot)}); height:calc((2.5rem * {calcAppointmentHeight(block.slot)}) - 1px);"
            >
                <span>{getSlotAppointment(block.slot).customer}</span>
            </div>
        {/if}
    {/each}
</div>

<style>
    .day-wrapper {
        position: relative;
    }
    .slot {
        /* border: 1px solid var(--light); */
        border: 0;
        border-left: 1px solid var(--border-lightest);
        border-bottom: 1px solid var(--border-lightest);
        cursor: pointer;
        height: 2.5rem;
        transition: var(--transition);
        position: relative;
        z-index: 0;
    }
    /* .slot:not(.slot-disabled):hover {
        background-color: var(--accent-light);
    } */
    .slot-disabled {
        background-color: var(--lightest);
        cursor: not-allowed;
    }
    .slot-end {
        border-bottom: 1px solid var(--border-light);
    }
    .appointment {
        border: 1px solid var(--border-lighter);
        border-radius: 3px;
        background-color: var(--accent-lighter);
        /* margin: 1px; */
        position: absolute;
        left: 1px;
        top: 1px;
        right: 1px;
        /* height: 6rem; */
        /* bottom: 1px; */
        z-index: 100;
        padding: 0.125rem;
    }
</style>