<script>
    let {
        badges,
        controls,
        center,
        details,
        Icon
    } = $props();
</script>

<div class="fl-item">
    <div class="icon"><Icon size={20} /></div>
    <div class="content">
        {@render details?.()}
        <!-- {#if center}
            {@render center?.()}
        {/if} -->

        {#if badges}
        <div class="badges">
            {@render badges?.()}
        </div>
        {/if}

        {#if controls}
        <div class="controls">
            {@render controls?.()}
        </div>
        {/if}
    </div>
</div>

<style>
    .fl-item {
        align-items: center;
        background-color: var(--white);
        border: 1px solid var(--semi-light);
        border-radius: 0.5rem;
        display: flex;
        gap: 0.75rem;
        outline: none;
        padding: 0.5rem 0.625rem;
        position: relative;
        text-align: start;
    }
    .fl-item:hover {
        background-color: var(--lighter);
    }
    .fl-item > .icon {
        color: var(--semi-dark);
        height: 2.5rem;
        width: 2.5rem;
        background-color: var(--light);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-item > .content {
        flex: 1;
        /* border: 1px solid red; */
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
    .fl-item > .content > .badges {
        margin-right: 2rem;
    }
    .fl-item > .content > .controls {
        /* margin-left: 0.5rem; */
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    .fl-item > .content > .controls {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    :global(.fl-item > .content > .controls > *) {
        align-items: center;
        background-color: transparent;
        border: 0;
        border-radius: 0.25rem;
        color: var(--primary);
        cursor: pointer;
        display: flex;
        justify-content: center;
        outline: none;
        height: 2rem;
        width: 2rem;
    }
    :global(.fl-item > .content > .controls > *:hover) {
        background-color: var(--primary);
        color: var(--white);
    }
</style>
