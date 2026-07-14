<script>
    import { ChevronDown, ChevronRight } from "@lucide/svelte";

    let {
        badge = '',
        children,
        title = 'Title'
    } = $props();

    let isOpen = $state(true);
</script>

<div class="fl-collapsible">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="header" onclick={() => isOpen = !isOpen}>
        <div class="icon">
            {#if isOpen}
                <ChevronDown size={16} />
            {:else}
                <ChevronRight size={16} />
            {/if}
        </div>
        <span class="title">{title}</span>
        {#if badge}
            <span class="badge">{badge}</span>
        {/if}
    </div>

    {#if isOpen}
    <div class="contents">
        {@render children?.()}
    </div>
    {/if}
</div>

<style>
    .fl-collapsible {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .fl-collapsible > .header {
        /* border: 1px solid */
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .fl-collapsible > .header > .icon {
        background-color: var(--light);
        border: 0;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
    }
    .fl-collapsible > .header > .title {
        color: var(--darker);
        font-weight: 500;
    }
    .fl-collapsible > .header > .badge {
        background-color: var(--light);
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.25rem;
        width: 1.25rem;
    }
</style>
