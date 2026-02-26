<script>
    import { createSettingsData } from "$lib/data/settings.svelte";
    import { onMount } from "svelte";

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
                    toTimeInt(day) >= parseInt(endShift)) ||
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
            onclick={onslotselect}
            class="slot
                {slot.disabled === true ? 'slot-disabled' : ''}
                {i < slots.length - 1 && slot.value.indexOf('30') > 0 ? 'slot-end' : ''}"
        >
        </div>
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
        height: 2rem;
        transition: var(--transition);
    }
    .slot:not(.slot-disabled):hover {
        background-color: var(--accent-light);
    }
    .slot-disabled {
        background-color: var(--lightest);
        cursor: not-allowed;
    }
    .slot-end {
        border-bottom: 1px solid var(--border-light);
    }
</style>