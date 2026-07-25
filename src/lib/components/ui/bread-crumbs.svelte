<script>
    import { ChevronRight } from "@lucide/svelte";
    let {
        items = []
    } = $props();
</script>

<div class="fl-crumbs">
    {#each {length: items.length } as _, i}
        <a href={items[i].link} title={items[i].text}
            class:crumb-active={i === items.length - 1}
        >{items[i].text}</a>

        {#if i < items.length - 1}
        <ChevronRight size={16} />
        {/if}
    {/each}
</div>

<style>
    .fl-crumbs {
        /* background-color: var(--lighter); */
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        /* font-weight: 300; */
    }
    .fl-crumbs > a,
    .fl-crumbs > a:visited {
        border-bottom: 1px solid transparent;
        color: var(--dark);
        padding-bottom: 2px;
        text-decoration: none;
        opacity: 0.7;
    }
    .fl-crumbs > a:hover {
        border-bottom: 1px solid var(--dark);
        opacity: 1;
    }
    .fl-crumbs > a.crumb-active {
        color: var(--darker);
        font-weight: 500;
        opacity: 1;
        }
</style>
