<script>
    let {
        formatter = null,
        onchange,
        options = [],
        value = $bindable()
    } = $props();

    let isOpen = $state(false);
    let selectRoot = $state();
    let selectTrigger = $state();
    let selectedContent = $derived(options.find(d => d.value === value)?.text || '---');

    const selectOption = (option) => {
        value = option.value;
        isOpen = false;
        console.log('selectOption value', value);
        onchange();
    };

    const handleKeyUp = (e) => {
        console.log(e.key);
        if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            isOpen = false;
        }
    };

    const onDocumentClick = (e) => {
        console.log('onDocumentClick', e.target);
        if (isOpen && selectRoot && !selectRoot.contains(e.target)) {
            isOpen = false;
        }
    };

    $effect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', onDocumentClick);
            return () => document.removeEventListener('mousedown', onDocumentClick);
        }
    })
</script>

<div class="fl-select-root" bind:this={selectRoot}>
    <button type="button" class="fl-select-trigger" bind:this={selectTrigger}
        onclick={() => isOpen = !isOpen}
        // onblur={() => isOpen = false}
        onkeyup={handleKeyUp}
    >
        <span class="selected-value">{selectedContent}</span>
    </button>

    {#if isOpen}
        <ul class="fl-select-options">
            {#each options as option, i}
                <!-- svelte-ignore a11y_role_has_required_aria_props -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <li type="button"
                    id="option-{i}"
                    data-index={i}
                    class:selected={value === option.value}
                    onclick={() => selectOption(option)}
                >{option.text}</li>
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
    :global(.fl-select-options > li) {
        display: flex;
        font-size: 0.75rem;
        padding: 0.375rem 0.5rem;
    }
    :global(.fl-select-options > li:hover) {
        background-color: var(--light);
        cursor: pointer;
    }
    :global(.fl-select-options > li.selected) {
        background-color: var(--primary);
        color: var(--white);
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
