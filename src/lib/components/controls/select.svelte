<script>
    import { ChevronDown, ChevronUp } from "@lucide/svelte";

    let {
        flat = false,
        items = [],
        style = ''
    } = $props();

    const getRandomString = (length = 12) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
            counter++;
        }

        return result;
    };

    let optionsPopover = $state();
    let targetId = $state('');
    let selectedValue = $state('');
    let selectedText = $derived(items.find(d => d.value === selectedValue)?.text || '...');

    const selectOption = (v) => {
        selectedValue = v;
        optionsPopover.hidePopover();
    };
</script>

<button type="button" class="fl-select flex-center between shadow" popovertarget="options-{targetId}" {style} class:flat={flat === true}>
    {selectedText || ''}
    <ChevronDown size={20} class="fl-select-icon" />
</button>

<div class="fl-select-options shadow" popover id="options-{targetId}" bind:this={optionsPopover} {style}>
    {#each items as item}
    <button type="button" data-fl-select-option-value={item.value} onclick={() => selectOption(item.value)}>{item.text}</button>
    {/each}
</div>

<style>
    .fl-select {
        anchor-name: --button;
        background-color: var(--white);
        border: 0;
        border-radius: var(--border-radius);
        color: var(--espresso);
        cursor: pointer;
        font-size: 1rem;
        outline: none;
        padding: 0.65rem 0.5rem 0.625rem 1rem;
        position: relative;
        text-align: left;
    }
    :global(.fl-select-icon) {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateX(-60%) translateY(-50%);
    }
    [popover] {
        border: 0;
        border-radius: var(--border-radius);
        margin-top: 0.5rem;
        top: anchor(--button bottom);
        left: anchor(--button left);
        position-anchor: --button;
        position-try-fallbacks: flip-block, flip-inline, flip-start;
        padding: 0.25rem;
    }
    .fl-select-options > button {
        background-color: var(--white);
        border: 0;
        display: block;
        cursor: pointer;
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
        text-align: left;
        transition: all 100ms ease-in-out;
        width: 100%;
    }
    .fl-select-options > button:hover {
        background-color: var(--accent);
        border-radius: var(--border-radius);
        color: var(--white);
    }
</style>
