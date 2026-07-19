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
        return pathParts[2];
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
        <a href="/setup/{item.id}"
            class="fl-sidebar-link"
            class:fl-sidebar-link-active={activeTab === item.id}>
            <item.Icon size={20} />
            {item.label}
        </a>
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
        background-color: var(--white);
        /* color: var(--white); */
        /* border-right: 2px solid var(--semi-light); */
        width: 17rem;
        padding: 1rem;
        padding-right: 0;
        display: flex;
        flex-direction: column;
        /* align-items: flex-start; */
        gap: 0.5rem;
    }
    .fl-sidebar-link {
        /* flex: 1; */
        /* border: 1px solid red; */
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        color: var(--dark);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 300;
        padding: 0.5rem 0.75rem;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .fl-sidebar-link-active {
        background-color: var(--semi-light);
        color: var(--darker);
        font-weight: 600;
    }
    .fl-sidebar-link:not(.fl-sidebar-link-active):hover {
        /* background-color: var(--lighter); */
        outline: 1px solid var(--light);
    }
    :global(.fl-sidebar > *) {
        /* flex: 1; */
        width: 100%;
    }
    /* :global(.fl-sidebar > *:not(:last-child)) {
        margin-bottom: 0.5rem;
    } */
</style>
