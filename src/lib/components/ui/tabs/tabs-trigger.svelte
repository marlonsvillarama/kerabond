<script>
    // import { getContext } from "svelte";
    import { tabsContext } from "./tabs-context.svelte";

    let {
        children,
        id,
        value = 'trigger'
    } = $props();

    const tabsState = tabsContext.get();
    const isActive = $derived(tabsState.activeTab === id);
</script>

<button type="button" class="fl-tabs-trigger"
    class:fl-tabs-trigger-active={tabsContext.currentTab === value}
    {value}
>
    {@render children?.()}
</button>

<style>
    .fl-tabs-trigger {
        background-color: var(--white);
        border: 0;
        outline: 0;
        padding: 1rem 1.25rem;
        text-align: left;
        width: 100%;
        font-size: 0.875rem;
        cursor: pointer;
    }
    .fl-tabs-trigger:hover {
        background-color: var(--primary-lightest);
    }
    .fl-tabs-trigger.fl-tabs-trigger-active {
        background-color: var(--primary);
        color: var(--white);
    }
</style>
