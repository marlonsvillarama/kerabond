<script>
    import { getContext } from "svelte";
    let {
        duration = 0,
        name = '',
        slot = '',
        staff = '',
        onclick
    } = $props();
    // console.log('data slot', slot);

    let calendarState = getContext('CALENDAR_STATE');
    let slotDisplay = $derived.by(() => {
        let hour = slot ? parseInt(slot.slice(0, 2)) : '';
        let mins = slot.slice(2);
        let am_pm = hour >= 12 ? 'pm' : 'am';

        return `${hour > 12 ? hour - 12 : hour}:${mins} ${am_pm}`;
    });

    const calculateTop = () => {
        // return (1.125 * 
    };

    const calculateHeight = () => {
        // return calendarState.interval;
        let slotCount = duration / calendarState.interval;
        console.log(`slotCount = ${slotCount}`)
        return `calc(${calendarState.slotHeight}px * ${slotCount})`
    };
</script>

<div class="fl-cell-data" style="height: {calculateHeight()};">
    <!-- <span class="staff">{staff}</span> -->
    <div class="summary">
        <span class="time">{slotDisplay}</span>
        <span class="name">{name}</span>
    </div>
    <div class="details">
        details
    </div>
</div>

<style>
    .fl-cell-data {
        /* border: 1px solid red; */
        background-color: var(--accent-pale);
        /* border: inset 1px solid var(--accent-pale); */
        box-shadow: inset 0 0 0 1.5px var(--accent-border-pale);
        box-sizing: border-box;
        border-radius: 0.375rem;
        cursor: pointer;
        position: absolute;
        font-size: 0.875rem;
        /* margin: 0.125rem; */
        overflow-y: hidden;
        padding: 0.2rem 0.375rem 0.25rem;
        transition: all 100ms ease-in-out;
        top: 0;
        /* min-height: 100%; */
        /* width: 100%; */
        width: calc(100% - 0.25rem);
        z-index: 10;
    }
    .fl-cell-data:hover {
        box-shadow: inset 0 0 0 3px var(--accent-border);
    }
    .fl-cell-data > .summary {
        display: grid;
        grid-template-columns: 28% 1fr;
    }
    /* .fl-cell-data:hover {
        box-shadow: var(--shadow);
    } */
    .fl-cell-data:not(:last-of-type) {
        margin-bottom: 0.25rem;
    }
    /* .fl-cell-data:hover {
        background-color: var(--accent-pale);
    } */
    /* .fl-cell-data > .staff {
        text-align: center;
        background-color: var(--accent-pale);
        border-radius: 0.125rem;
        font-weight: 600;
        margin-right: 0.375rem;
        min-width: 1.5rem;
        padding: 0.375rem 0.375rem;
    } */
    .fl-cell-data > .summary > .name {
        opacity: 0.7;
        /* max-width: 60%; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /* border: 1px solid red; */
        /* font-weight: 600; */
        padding-right: 0.375rem;
    }
    .fl-cell-data > .summary > .time {
        font-weight: 600;
        /* text-align: right; */
        padding-right: 0.375rem;
    }
    .details {
        color: var(--semi-dark);
    }
</style>
