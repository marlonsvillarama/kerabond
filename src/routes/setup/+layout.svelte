<script>
    import {
        IdCard,
        ClipboardClock,
        ShoppingBasket
    } from "@lucide/svelte";

    import { Plus } from "@lucide/svelte";

    import Button from "$lib/components/ui/button.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";
    import Sidebar from "$lib/components/global/sidebar/sidebar.svelte";

    let { children } = $props();
    let sidebarItems = [
        { id: 'staff', label: 'Staff', Icon: IdCard },
        { id: 'schedule', label: 'Schedule', Icon: ClipboardClock },
        { id: 'inventory', label: 'Inventory', Icon: ShoppingBasket }
    ];

    let pageTitle = $state('Setup Overview');
    const updateSetup = (tab) => {
        pageTitle = sidebarItems.find(d => d.id === tab).label;
    };
</script>

<div class="fl-setup">
    <Sidebar root="/setup" items={sidebarItems} onselect={updateSetup} />

    <div class="fl-content fl-page">
        <!-- Setup > Page content -->
        {@render children?.()}
    </div>
    <!-- <div class="fl-sub-content fl-full-scrollable">
        {@render children?.()}
    </div> -->
</div>
<!-- <h2>Setup</h2>

<ul>
    <li>Staff</li>
    <li>Schedule</li>
    <li>Inventory</li>
</ul> -->

<style>
    .fl-setup {
        flex: 1;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        overflow-y: auto;
    }
    .fl-setup > .fl-content {
        /* border: 2px solid red; */
        display: flex;
        flex-direction: column;
    }
    /* .fl-sub-content {
        border: 1px solid green;
    } */
    /* .fl-page-header {
        padding: 0.5rem;
    } */
    /* .setup-content { */
        /* border: 2px solid red; */
        /* flex: 1; */
        /* overflow-y: auto; */
    /* } */
</style>
