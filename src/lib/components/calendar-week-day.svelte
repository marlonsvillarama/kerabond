<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";

    const calendarData = createCalendarData();
    const settings = createSettingsData();
    let {
        blocked = false,
        blocks = [],
        data = [],
        startDay = settings.startDay,
        startShift = settings.startShift,
        endDay = settings.endDay,
        endShift = settings.endShift,
        interval = settings.interval,
        value = new Date(),
        onslotselect,
        onblockselect
    } = $props();

    const parseDate = (dt) => {
        return `${dt.getFullYear()}/${(dt.getMonth() + 1)}/${dt.getDate()}`;
    };

    const parseDateTime = (dt) => {
        return `${dt.getFullYear()}/${(dt.getMonth() + 1)}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes().toString().padStart(2, '0')}`;
    };

    const toTimeInt = (dt) => {
        return parseInt(`${dt.getHours()}${dt.getMinutes().toString().padStart(2, '0')}`);
    }

    let today = new Date();
    let isToday = $derived.by(() => {
        console.log(`* isToday >> today = ${parseDate(today)}, value = ${parseDate(value)}`);
        return parseDate(today) === parseDate(value);
    });
    let slots = $derived.by(() => {
        let output = [];
        let currentDay = new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate(),
            parseInt(startDay.slice(0, 2)),
            parseInt(startDay.slice(2))
        );
        // console.log(`* weekday slots day`, currentDay);
        do {
            let isBlockedSlot = false;
            blocks.forEach(b => {
                if (parseInt(b.start) <= toTimeInt(currentDay) && parseInt(b.end) > toTimeInt(currentDay)) {
                    isBlockedSlot = true;
                }
            });
            output.push({
                value: parseDateTime(currentDay),
                // time: parseTime(day),
                // text: parseTime(day),
                disabled: (
                    toTimeInt(currentDay) < parseInt(startShift) ||
                    toTimeInt(currentDay) >= parseInt(endShift)
                ) ||
                settings.daysOff.indexOf(value.getDay()) >= 0 ||
                isBlockedSlot === true
            })
            currentDay.setMinutes(currentDay.getMinutes() + interval);
            currentDay = new Date(
                value.getFullYear(),
                value.getMonth(),
                value.getDate(),
                currentDay.getHours(),
                currentDay.getMinutes()
            );
            // console.log(`* > weekday day.getHours() = ${currentDay.getHours()}; endDay.slice = ${endDay.slice(0, 2)}`);
        } while (currentDay.getHours() < parseInt(endDay.slice(0, 2)));
        // console.log('* weekday slots', output);

        return output;
    });
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
        // console.log(`calcAppointmentCoords dt`, dt);
        // console.log(`calcAppointmentCoords start`, start);
        let interval = Math.floor((dt.getTime() - start.getTime()) / 1800000);
        // console.log(`interval = ${interval}`);
        return interval;
    };

    const getSlotAppointment = (slot) => {
        return blocks.find(b => b.slot === slot);
    };

    const hasAppointment = (slot) => {
        // let appointment = blocks.find(b => b.slot === slot);
        let appointment = slots.find(s => s.value === slot);
        // console.log(`hasAppointment; slot = ${slot}`, appointment);
        return !!appointment;
    };

    const setSlot = (slot) => {
        calendarData.slot = slot;
        onslotselect();
    };

    const showAppointment = (slot) => {
        calendarData.block = null;
        calendarData.block = blocks.find(b => b.slot === slot);
        onslotselect();
        // alert(`showAppointment slot = ${slot}`);
        // calcAppointmentCoords(slot);
    };
</script>

<div class="day-wrapper {isToday ? 'today' : ''}">
    {#each slots as slot, i}
        <div data-slot={slot.value}
            onclick={() => setSlot(slot.value)}
            class="slot
                {slot.disabled === true ? 'slot-disabled' : ''}
                {i < slots.length - 1 && slot.value.indexOf('30') > 0 ? 'slot-end' : ''}"
        >
            <!-- {slot.value} -->
        </div>
    {/each}
    {#each blocks as block, i}
        {#if hasAppointment(block.slot)}
            <div class="appointment" onclick={() => showAppointment(block.slot)}
                style="top:calc(2.5rem * {calcAppointmentY(block.slot)}); height:calc((2.5rem * {calcAppointmentHeight(block.slot)}) - 1px);"
            >
                <span class="customer">{getSlotAppointment(block.slot).customer}</span>
                <span class="service">{getSlotAppointment(block.slot).service}</span>
            </div>
        {/if}
    {/each}
</div>

<style>
    .day-wrapper {
        position: relative;
        /* border: 2px solid red; */
    }
    .day-wrapper.today {
        border: 0;
        border-left: 2px solid var(--accent);
        border-right: 2px solid var(--accent);
    }
    .slot {
        /* border: 1px solid var(--light); */
        border: 0;
        border-left: 1px solid var(--border-lightest);
        border-bottom: 1px solid var(--border-lightest);
        /* cursor: pointer; */
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
        background-color: var(--slot-bg);
        /* margin: 1px; */
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        /* height: 6rem; */
        /* bottom: 1px; */
        z-index: 100;
        padding: 0rem 0.25rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .appointment > .customer {
        font-size: 0.75rem;
        font-weight: 500;
    }
    .appointment > .service {
        font-size: 0.75rem;
        font-weight: 300;
        color: var(--font-medium);
    }
</style>