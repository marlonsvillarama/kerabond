<script>
    import { setContext } from "svelte";
    import { TabsState, tabsContext } from "./tabs-context.svelte";
    // import { TabsState, tabsContext } from "./tabs.svelte";
    // import TabsContent from "./tabs-content.svelte";
    // import TabsList from "./tabs-list.svelte";
    // import TabsTrigger from "./tabs-trigger.svelte";

    let {
        children,
        defaultTab = 'address',
        orientation = 'horizontal',
    } = $props();

    const tabsState = new TabsState(defaultTab);
    tabsContext.set(tabsState);
</script>

<div class="fl-tabs"
    class:fl-tabs-vertical={orientation.toLowerCase() === 'vertical'}
>
    {@render children?.()}
</div>

<style>
    .fl-tabs {
        gap: 2rem;
        display: flex;
        align-items: center;
    }
    .fl-tabs.fl-tabs-vertical {
        flex-direction: row;
        align-items: flex-start;
    }
    /* :global(.fl-tabs.fl-tabs-vertical > *) {
        border: 1px solid red;
    } */
</style>
