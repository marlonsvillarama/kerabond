<script>
    let {
        data = [],
        mode = $bindable()
    } = $props();
</script>

<div class="toggle-wrapper">
    <button onclick={() => { mode = 'week' }}
        class={mode === 'week' ? 'selected' : ''}>Week</button>
    <div class="separator">&nbsp;</div>
    <button onclick={() => { mode = 'month' }}
        class={mode === 'month' ? 'selected' : ''}>Month</button>
</div>

<style>
    .toggle-wrapper {
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
    }
    button {
        border: 1px solid var(--accent-light);
        cursor: pointer;
        font-weight: 500;
        padding: 0.375rem 1rem;
    }
    button:first-child {
        border-right: 0;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }
    button:last-child {
        border-left: 0;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    button.selected {
        background-color: var(--accent-light);
    }
    .separator {
        background-color: var(--accent-light);
        border-top: 1px solid var(--accent-light);
        border-bottom: 1px solid var(--accent-light);
        height: 100%;
        padding: 0.375rem 0;
        width: 1px;
    }
</style>