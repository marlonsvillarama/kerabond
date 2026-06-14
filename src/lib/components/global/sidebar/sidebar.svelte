<script>
    import {
        IdCard,
        ClipboardClock,
        ShoppingBasket
    } from "@lucide/svelte";

    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import Button from "$lib/components/ui/button.svelte";

    let {
        onselect,
        root,
        items = []
    } = $props();

    let activeTab = $derived.by(() => {
        let pathName = page.url.pathname;
        let pathParts = pathName.split('/');
        return pathParts[pathParts.length - 1];
    });

    const navigateToPage = (id) => {
        // alert(`url = "${url}"`)
        onselect(id);
        goto(`${root}/${id}`);
        // goto(root);
    };
</script>

<div class="fl-sidebar">
    {#each items as item}
    <Button flat={true} Icon={item.Icon}
        active={activeTab === item.id} onclick={() => navigateToPage(item.id)}>
        {item.label}
    </Button>
    {/each}
    <!-- <Button flat={true} Icon={ClipboardClock}
        active={activeTab === 'schedule'} onclick={() => goto(`${root}/schedule`)}>
        Schedule
    </Button> -->
    <!-- <Button flat={true} Icon={ShoppingBasket}
        active={activeTab === 'inventory'} onclick={() => goto(`${root}/inventory`)}>
        Inventory
    </Button> -->
</div>

<style>
    .fl-sidebar {
        /* background-color: var(--accent); */
        /* color: var(--white); */
        /* border-right: 1px solid var(--border); */
        width: 14rem;
        padding: 0.5rem;
        /* display: flex; */
        /* flex-direction: column; */
        /* align-items: flex-start; */
        /* gap: 0.5rem; */
    }
    :global(.fl-sidebar > *) {
        flex: 1;
        width: 100%;
    }
    :global(.fl-sidebar > *:not(:last-child)) {
        margin-bottom: 0.5rem;
    }
</style>
