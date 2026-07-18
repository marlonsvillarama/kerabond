<script>
    import { getContext } from "svelte";

    let {
        // start = '0800',
        // end = '1800',
        // interval = 30,
        options = [],
        value = $bindable('0800')
    } = $props();

    let timeSlots = getContext('TIME_SLOTS');
    let timeDisplay = $derived.by(() => {
        let hours = value.slice(0, 2);
        let hoursInt = parseInt(hours);
        let minutes = value.slice(2);

        return `${hoursInt}:${minutes} ${hoursInt >= 12 ? 'PM' : 'AM'}`
    });

    let isOpen = $state(false);
    let selectRoot = $state();
    let selectTrigger = $state();
    let selectedContent = $derived(options.find(d => d.value === value)?.text || '---');
</script>

<div class="fl-select-root" bind:this={selectRoot}>
    <button type="button" class="fl-select-trigger" bind:this={selectTrigger}>
        <span class="selected-value">{selectedContent}</span>
    </button>

    {#if isOpen}
    <ul class="fl-select-options">
        {#each options as option, i}
        <li value={option.value}>{option.text}</li>
        {/each}
    </ul>
    {/if}
</div>

<style>
    .fl-select-root {
        position: relative;
    }
    .fl-select-trigger {
        background-color: var(--semi-light);
        border: 0;
        border-radius: 0.25rem;
        color: var(--darker);
        cursor: pointer;
        font-size: 0.75rem;
        outline: 0;
        padding: 0.25rem 0.375rem;
        width: 6rem;
    }
    .fl-select-options {
        position: absolute;
        z-index: 20;
        top: calc(100% + 0.25rem);
        left: 0;
        right: 0;
        list-style: none;
        background-color: var(--white);
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        max-height: 15rem;
        overflow-y: auto;
        overscroll-behavior: contain;
    }
    :global(.fl-select-option > li) {
        display: flex;
        font-size: 0.75rem;
        padding: 0.375rem 0.5rem;
    }
    .fl-select-options::-webkit-scrollbar {
        width: 0.5rem;
    }
    .fl-select-options::-webkit-scrollbar-thumb {
        background: var(--light);
        border-radius: 0.25rem;
    }
    .fl-select-options::-webkit-scrollbar-thumb:hover {
        background: var(--semi-light);
    }
    /* .fl-time-select {
        position-area: bottom;
        margin: 0;
        flex-direction: column;
        width: 6rem;
        max-height: 12rem;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--semi-light);
        border: none;
        border-radius: 0.5rem;
        box-sizing: border-box;
        outline: 1px solid var(--semi-light);
    }
    .fl-time-select > * {
        font-size: 0.75rem;
        padding: 0.375rem 0.5rem;
    } */
    /* .fl-time-select::picker {
        max-height: 10rem;
    } */
</style>
