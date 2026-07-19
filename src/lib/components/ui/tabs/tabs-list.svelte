<script>
    let {
        children,
        orientation = 'horizontal'
    } = $props();
</script>

<div class="fl-tabs-list"
    class:fl-tabs-list-vertical={orientation.toLowerCase() === 'vertical'}
>
    {@render children?.()}
</div>

<style>
    .fl-tabs-list {
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: var(--white);
        /* border: 1px solid var(--semi-light); */
        border-radius: 0.5rem;
        padding: 0.5rem 0;
    }
    .fl-tabs-list.fl-tabs-list-vertical {
        flex-direction: column;
        /* align-items: stretch; */
        justify-content: left;
        text-align: left;
        gap: 0rem;
        width: 13rem;
    }
</style>
