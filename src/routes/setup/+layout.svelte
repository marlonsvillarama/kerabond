<script>
    import {
        IdCard,
        CalendarRange,
        Package,
        Scissors
    } from "@lucide/svelte";

    import { Plus } from "@lucide/svelte";

    import Button from "$lib/components/ui/button.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";
    import Sidebar from "$lib/components/global/sidebar/page-sidebar.svelte";

    let { children } = $props();
    let sidebarItems = [
        { id: 'services', label: 'Services', Icon: Scissors },
        { id: 'staff', label: 'Staff', Icon: IdCard },
        { id: 'schedule', label: 'Schedule', Icon: CalendarRange },
        { id: 'inventory', label: 'Inventory', Icon: Package }
    ];

    let pageTitle = $state('Setup Overview');
    const updateSetup = (tab) => {
        pageTitle = sidebarItems.find(d => d.id === tab).label;
    };
</script>

<div class="fl-setup">
    <Sidebar root="/setup" items={sidebarItems} onselect={updateSetup} />

    <div class="fl-content fl-page">
        {@render children?.()}
    </div>
</div>

<style>
    .fl-setup {
        flex: 1;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        margin: 1.5rem;
        overflow-y: auto;
    }
    .fl-setup > .fl-content {
        border-left: 1px solid var(--light);
        display: flex;
        flex-direction: column;
        padding: 0 0 1rem 2rem;
        gap: 1rem;
    }
</style>
