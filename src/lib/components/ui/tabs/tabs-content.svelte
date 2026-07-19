<script>
    import { getContext } from "svelte";

    let {
        children,
        value = ''
    } = $props();

    let isActive = $derived(getContext('TABS').currentTab === value);
</script>

{#if isActive}
    <div class="fl-tab-content">
        {@render children?.()}
    </div>
{/if}

<style>
    .fl-tab-content {
        border: 1px solid red;
        padding: 0 1.5rem 2rem;
    }
</style>
