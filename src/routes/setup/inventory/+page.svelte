<script>
    import { getContext, setContext } from "svelte";
    import { Plus, StarOff } from "@lucide/svelte";

    import Button from "$lib/components/ui/button.svelte";
    import Drawer from "$lib/components/ui/drawer.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";
    import TableInventory from "$lib/components/ui/table/table-inventory.svelte";
    let openDrawer = $state(false);

    const newStaff = () => {
        console.log('newStaff');
        openDrawer = true;
    };

    const sortByKey = (list, key) => {
        if (key) {
            list.sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (b[key] < a[key]) return 1;
                return 0;
            });
        }
        else {
            list.sort((a, b) => {
                if (a < b) return -1;
                if (b < a) return 1;
                return 0;
            });
        }

        list = list;
        return list;
    };

    let allStaff = getContext('STAFF_STATE');
    let sortedStaff = sortByKey(allStaff, 'name');
    console.log('staff', allStaff);

    let searchValue = $state('');
    // let filteredStaff = allStaff;
    let filteredStaff = $derived(searchValue ?
        allStaff.filter(d => d.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) : allStaff
    );
    let headers = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Name' },
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' },
        { id: 'active', label: 'Active' },
    ]
</script>

<div class="fl-page-header flex-center between">
    <h2>Manage Inventory</h2>
    <div class="fl-page-controls flex-center">
        <InputSearch bind:value={searchValue} />
        <button type="button" class="fl-btn-new-staff" onclick={newStaff}>
            <Plus size={16} />Add product
        </button>
    </div>
</div>

<div class="fl-full-scrollable fl-page-content">
    <TableInventory rows={filteredStaff} {headers} />
</div>

<Drawer bind:open={openDrawer} />

<style>
    .fl-btn-new-staff {
        background-color: var(--primary);
        border: 0;
        border-radius: 0.375rem;
        color: var(--white);
        cursor: pointer;
        font-size: 0.875rem;
        outline: none;
        padding: 0.5rem 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    .fl-btn-new-staff:hover {
        background-color: var(--primary-dark);
    }
</style>
