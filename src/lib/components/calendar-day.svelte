<script>
    import { onMount } from "svelte";

    let {
        startDay = '0600',
        startShift = '0830',
        endDay = '1900',
        endShift = '1730',
        blocked = false,
        blocks = [],
        interval
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
    console.log('*** START day', day);
    onMount(() => {
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
        console.log('slots', slots);
    });
</script>

<div class="day-wrapper">
    {#each slots as slot, i}
        <div data-slot={slot.text}
            class="slot
                cursor-{slot.disabled === true ? 'disabled' : 'pointer'}
                {slot.disabled === true ? 'slot-disabled' : ''}
                {i < slots.length - 1 && slot.text.indexOf('30') > 0 ? 'slot-end' : ''}"
        >
        </div>
    {/each}
</div>

<style>
    .slot {
        height: 2rem;
        border-left: 1px solid var(--border-light);
        border-bottom: 1px solid var(--border-lightest);
    }
    .slot-end {
        border-bottom: 1px solid var(--border-light);
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
</style>