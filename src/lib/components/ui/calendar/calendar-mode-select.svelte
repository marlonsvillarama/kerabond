<script>
    import { Check, ChevronDown, ChevronUp } from "@lucide/svelte";
    import { getContext } from "svelte";
    import Select from "../select.svelte";

    const calendarState = getContext('CALENDAR_STATE');
    let items = [
        { text: 'Month', value: 'month' },
        { text: 'Week', value: 'week' },
        { text: 'Day', value: 'day' },
    ];

    let popover = $state();
    const changeMode = (value) => {
        calendarState.mode = value;
        popover.hidePopover();
    };
</script>

<Select options={items}
    // placeholder="Select the branch..."
    // valueField="id"
    // textField="name"
    bind:value={calendarState.mode}
    // onchange={updateSchedule}
    width="6rem"
/>
<!-- <button type="button" class="fl-cal-mode-select" id="fl-cal-mode-select"
    popovertarget="fl-cal-mode-popover"
>
    {calendarState.mode}
    <ChevronDown size={16} />
</button> -->

<!-- <div class="fl-cal-mode-popover" id="fl-cal-mode-popover" popover bind:this={popover}>
    {#each items as item}
        !-- svelte-ignore a11y_click_events_have_key_events --
        !-- svelte-ignore a11y_no_static_element_interactions --
        <div class="option"
            class:selected={calendarState.mode === item}
            onclick={() => changeMode(item)}
        >
            {item}
            {#if calendarState.mode === item}
                <Check size={16} />
            {/if}
        </div>
    {/each}
</div> -->

<style>
    .fl-cal-mode-select {
        background-color: var(--white);
        border: 1px solid var(--border);
        border-radius: var(--border-radius);
        color: var(--darker);
        cursor: pointer;
        font-size: 0.875rem;
        outline: none;
        padding: 0.625rem 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* gap: 0.5 */
        text-transform: capitalize;
        width: 6rem;
    }
    .fl-cal-mode-popover {
        position-area: block-end span-inline-end;
        position-try-fallbacks: flip-inline;
        margin-top: 2px;
        background-color: var(--white);
        border: 1px solid var(--border);
        border-radius: var(--border-radius);
        font-size: 0.875rem;
    }
    .fl-cal-mode-popover > .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 0.5rem 0.75rem;
        text-transform: capitalize;
        width: 6rem;
    }
    :global(.fl-cal-mode-popover > .option.selected) {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-cal-mode-popover > .option:not(.selected):hover {
        background-color: var(--primary-lightest);
    }
</style>