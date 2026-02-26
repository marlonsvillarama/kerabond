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
        value = new Date()
    } = $props();

    const parseTime = (dt) => {
        let hours = dt.getHours();
        let output = `${hours > 12 ? hours - 12 : hours}:${dt.getMinutes().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
        return output;
    };

    const toTimeInt = (dt) => {
        return parseInt(`${dt.getHours()}${dt.getMinutes().toString().padStart(2, '0')}`);
    }

    let slots = $state([]);
    let now = new Date();
    let day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(startDay.slice(0, 2)),
        parseInt(startDay.slice(2))
    );
    // console.log('*** START day', day);

    let timeSlots = $state([]);

    onMount(() => {
        console.log('** weekDay value', value);
        do {
            let isBlockedSlot = false;
            blocks.forEach(b => {
                if (parseInt(b.start) <= toTimeInt(day) && parseInt(b.end) > toTimeInt(day)) {
                    isBlockedSlot = true;
                }
            });
            slots.push({
                value: day,
                text: parseTime(day),
                disabled: (
                    toTimeInt(day) < parseInt(startShift) ||
                    toTimeInt(day) >= parseInt(endShift)) ||
                    blocked === true ||
                    isBlockedSlot === true
            })
            day.setMinutes(day.getMinutes() + interval);
            day = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                day.getHours(),
                day.getMinutes()
            );
        } while (day.getHours() < parseInt(endDay.slice(0, 2)));
        // console.log('slots', slots);
    });

    const showForm = () => {};
</script>

<div class="day-wrapper">
    {#each slots as slot, i}
        <div data-slot={slot.text}
            onclick={showForm}
            class="slot
                {slot.disabled === true ? 'slot-disabled' : ''}
                {i < slots.length - 1 && slot.text.indexOf('30') > 0 ? 'slot-end' : ''}"
        >
        </div>
    {/each}
</div>

<style>
    .day-wrapper {
        position: relative;
    }
    .slot {
        border: 1px solid var(--light);
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