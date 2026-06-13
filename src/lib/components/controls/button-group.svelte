<script>
    let {
        children
    } = $props();
</script>

<div class="fl-btn-group flex-center shadow">
    {@render children?.()}
</div>

<style>
    .fl-btn-group {
        border-radius: var(--border-radius);
        display: flex;
    }
    :global(.fl-btn-group > button:not(:first-child):not(:last-child)) {
        background-color: var(--white);
        border-left: 1px solid var(--border);
        border-radius: 0;
        border-right: 1px solid var(--border);
    }
    :global(.fl-btn-group > button:first-child) {
        background-color: var(--white);
        border-radius: 0;
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
    }
    :global(.fl-btn-group > button:last-child) {
        background-color: var(--white);
        border-radius: 0;
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    }
    :global(.fl-btn-group > button:not(:first-child):not(:last-child):hover) {
        background-color: var(--accent);
        border-color: var(--accent);
        color: var(--white);
    }
</style>
