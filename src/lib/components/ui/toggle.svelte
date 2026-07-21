<script>
    let {
        checked = $bindable(),
        id = 'toggle',
        label = '',
        labels,
        onclick,
        ontoggle
    } = $props();

    const triggerChange = () => {
        checked = !checked;
        ontoggle();
    };

    const toggleCheck = () => {
        console.log('toggleCheck', checked);
        ontoggle();
    };

    let toggleLabels = $derived.by(() => {
        if (!labels) { return null }
        if (labels.length < 2) { return null }

        return labels;
    });
</script>

<div class="fl-toggle">
    <input type="checkbox" bind:checked id="toggle-{id}" name="toggle-{id}"
        {onclick}
        onchange={toggleCheck}
    />
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="toggle" onclick={triggerChange}></div>
    
    {#if toggleLabels}
        <label for="toggle-{id}">{toggleLabels[checked ? 0 : 1]}</label>
    {:else}
        {#if label}
            <label for="toggle-{id}">{label}</label>
        {/if}
    {/if}
</div>

<style>
    .fl-toggle {
        position: relative;
        box-sizing: border-box;
        padding: 0 0.125rem;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        /* border: 1px solid red; */
        cursor: pointer;
        
        /* border: 1px solid blue; */
    }
    .fl-toggle > input[type="checkbox"] {
        /* appearance: none; */
        position: absolute;
        left: -9999px;
        /* border: 1px solid blue; */
        /* top: 0; */
        /* z-index: 10; */
        /* width: 100%; */
        /* height: 100%; */
        cursor: pointer;
        /* display: inline-grid; */
        height: 1.4rem;
        width: 1.4rem;
        /* transform: scale(1.4); */
    }
    :global(.fl-toggle > label) {
        cursor: pointer;
        font-size: 0.875rem;
        flex: 1;
    }
    .fl-toggle > .toggle {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
    }
    .fl-toggle > .toggle:before {
        content: '';
        width: 2.75rem;
        height: 1.5rem;
        background: #ccc;
        position: relative;
        display: inline-block;
        border-radius: 0.25rem;
        box-sizing: border-box;
        transition: 100ms ease-out;
    }
    .fl-toggle > .toggle:after {
        content: '';
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 0.125rem;
        left: 2px;
        top: 2px;
        z-index: 2;
        background: #fff;
        box-sizing: border-box;
        transition: 100ms ease-out;
    }
    .fl-toggle > input[type="checkbox"]:checked + .toggle:before {
        /* background: #4BD865; */
        background: var(--primary);
    }
    .fl-toggle input[type="checkbox"]:checked + .toggle:after {
        left: 1.375rem;
    }
</style>
