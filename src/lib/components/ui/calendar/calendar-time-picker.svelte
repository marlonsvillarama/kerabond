<script>
    import { Check } from "@lucide/svelte";
    let {
        id = 'time-picker',
        onselecttime,
        value = '1000'
    } = $props();

    let availableTimes = $state([
        { value: '0830', text: '8:30 am' },
        { value: '1000', text: '10:00 am' },
        { value: '1330', text: '1:30 pm' },
        { value: '1430', text: '2:30 pm' },
    ]);
</script>

<div class="fl-cal-time-picker">
    {#each availableTimes as time}
        <button type="button" data-time={time.value}
            class="time-option"
            class:time-option-selected={time.value === value}
            onclick={() => onselecttime(time.value)}
        >
            {time.text}
            {#if time.value === value}
                <Check size={16} />
            {/if}
        </button>
    {/each}
</div>

<style>
    .fl-cal-time-picker {
        display: flex;
        flex-direction: column;
        /* gap: 0.25rem; */
        /* margin: 1rem; */
        overflow-y: auto;
        width: 10rem;
    }
    .time-option {
        flex: 1;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        /* border: 1px solid var(--primary-lighter); */
        /* border-radius: 0.25rem; */
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .time-option-selected {
        background-color: var(--primary);
        color: var(--white);
    }
    .time-option:not(.time-option-selected):hover {
        background-color: var(--primary-lighter);
    }
</style>
