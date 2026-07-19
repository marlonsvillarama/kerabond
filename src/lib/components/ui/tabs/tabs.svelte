<script>
    import { setContext } from "svelte";
    // import { tabsContext } from "./tabs";
    // import TabsContent from "./tabs-content.svelte";
    // import TabsList from "./tabs-list.svelte";
    // import TabsTrigger from "./tabs-trigger.svelte";

    let {
        children,
        orientation = 'horizontal',
    } = $props();

    let tabsContext = $state({ currentTab: '' });
    setContext('TABS', tabsContext);
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
