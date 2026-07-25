<script>
    import { Check, ChevronDown, ChevronUp, MapPin } from "@lucide/svelte";
    import { getContext } from "svelte";
    import Select from "../select.svelte";

    const calendarState = getContext('CALENDAR_STATE');
    console.log('** calendar-location-select locations', calendarState.locations);
    // let items = [ 'month', 'week', 'day' ];

    let popover = $state();
    const changeLocation = (value) => {
        calendarState.selectedLocation = value;
        popover.hidePopover();
    };

    let selectedLocationText = $derived(
        calendarState.selectedLocation ?
            calendarState.locations.find(d => d.id === calendarState.selectedLocation).text : 'Select location...'
    );
</script>

<Select options={calendarState.locations}
    placeholder="Select the branch..."
    valueField="id"
    textField="name"
    bind:value={calendarState.selectedLocation}
    // onchange={updateSchedule}
    width="15rem"
/>
<!-- <button type="button" class="fl-cal-loc-select" id="fl-cal-loc-select"
    popovertarget="fl-cal-loc-popover"
>
    <div class="loc">
        <MapPin size={16} />{selectedLocationText}
    </div>
    <ChevronDown size={16} />
</button> -->

<!-- <div class="fl-cal-loc-popover" id="fl-cal-loc-popover" popover bind:this={popover}>
    {#each calendarState.locations as location}
        !-- svelte-ignore a11y_click_events_have_key_events --
        !-- svelte-ignore a11y_no_static_element_interactions --
        <div class="option"
            class:selected={calendarState.selectedLocation === location.id}
            onclick={() => changeLocation(location.id)}
        >
            {location.text}
            {#if calendarState.selectedLocation === location.id}
                <Check size={16} />
            {/if}
        </div>
    {/each}
</div> -->

<style>
    .fl-cal-loc-select {
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
        gap: 0.5rem;
        text-transform: capitalize;
        width: 15rem;
    }
    .fl-cal-loc-select > .loc {
        display: flex;
        align-content: center;
        gap: 0.25rem;
    }
    .fl-cal-loc-popover {
        position-area: block-end span-inline-end;
        position-try-fallbacks: flip-inline;
        margin-top: 2px;
        background-color: var(--white);
        border: 1px solid var(--border);
        border-radius: var(--border-radius);
        font-size: 0.875rem;
    }
    .fl-cal-loc-popover > .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 0.5rem 0.75rem;
        text-transform: capitalize;
        width: 15rem;
    }
    :global(.fl-cal-loc-popover > .option.selected) {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-cal-loc-popover > .option:not(.selected):hover {
        background-color: var(--primary-lightest);
    }
</style>