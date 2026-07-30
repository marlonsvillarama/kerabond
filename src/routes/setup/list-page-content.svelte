<script>
    import InputSearch from "$lib/components/ui/input-search.svelte";
    let {
        count = '',
        title = 'Page',
        searchValue = $bindable(),

        controls,
        children,
        crumbs
    } = $props();
</script>

<div class="fl-page wrapper">
    {@render crumbs?.()}

    <div class="fl-page-header flex-center between">
        <div class="title">
            <span class="name">{title}</span>
            {#if count !== ''}
                <div class="count">{count}</div>
            {/if}
        </div>
        <div class="fl-page-controls flex-center">
            <!-- <InputSearch bind:value={searchValue} /> -->
            {@render controls()}
            <!-- <button type="button" command="show-modal" commandfor="fl-service-new" class="fl-btn-new-service">
                <Plus size={16} />Add service
            </button> -->
        </div>
    </div>

    <div class="fl-full-scrollable fl-page-content">
        {@render children?.()}
    </div>

</div>

<style>
    .fl-page {
        display: grid;
        gap: 1rem;
    }
    .fl-page-header {
        border-bottom: 1px solid var(--light);
        /* padding-bottom: 1rem; */
        /* margin: 0 0.625rem 1rem; */
        /* margin-bottom: 1rem; */
        padding: 0 0 1rem;
    }
    .fl-page-header > .title {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .fl-page-header > .title > .name {
        color: var(--darker);
        font-size: 1.375rem;
        gap: 0.5rem;
        font-weight: 600;
    }
    .fl-page-header > .title > .count {
        background-color: var(--primary-light);
        font-weight: 500;
        height: 1.75rem;
        /* width: 2rem; */
        padding: 0 0.625rem;
        border: 0;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-page-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
