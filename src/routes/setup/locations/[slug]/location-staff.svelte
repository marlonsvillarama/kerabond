<script>
    import { supabase } from "$lib/supabaseClient";
    import { Plus } from "@lucide/svelte";
    import LocationStaffItem from "./location-staff-item.svelte";
    import StaffItem from "../../staff/staff-item.svelte";

    let {
        items,
        location,
        onchange
    } = $props();
    console.log('LocationStaff items', items);
    let locationStaff = $state(items);
    let sortedItems = $derived(locationStaff.toSorted((a, b) => a.first_name.localeCompare(b.first_name)));

    let dialog = $state();
    let dialogData = $state([]);
    let isLoading = $state(false);

    const loadData = async () => {
        isLoading = true;
        try {
            const { data:staff } = await supabase.from('kb_staff')
                .select().eq('is_active', true);
            dialogData = staff.map(d => {
                return {
                    ...d,
                    selected: locationStaff.map(item => item.id).indexOf(d.id) >= 0
                };
            });
        }
        catch (ex) {
            console.error('Failed to load data', error);
        }
        finally {
            isLoading = false;
        }
    };

    const openDialog = () => {
        loadData();
        dialog?.showModal();
    };

    const closeDialog = () => {
        dialog?.close();
    };

    const assignStaff = async (staff) => {
        staff.selected = !staff.selected;
        console.log(`assignStaff; selected = ${staff.selected}`, staff);

        if (staff.selected === true) {
            locationStaff.push(staff);

            const { data, error } = await supabase.from('kb_staff_locations')
                .insert({
                    location: location.id,
                    staff: staff.id
                }).select();
        }
        else {
            locationStaff = locationStaff.filter(d => d.id !== staff.id);

            const { data, error } = await supabase.from('kb_staff_locations')
                .delete()
                .eq('staff', staff.id)
                .eq('location', location.id);
        }

    };
</script>

<div class="fl-loc-staff">
    <div class="header">
        <span class="title">Staff</span>
        <span class="badge">{locationStaff.length}</span>
        <button type="button" class="btn-add" onclick={openDialog}>
            <Plus size={16} />Assign staff
        </button>
    </div>
    <div class="content">
    {#each sortedItems as _, i}
        <LocationStaffItem data={sortedItems[i]} />
    {/each}
    </div>
</div>

<dialog class="fl-staff-dlg" id="fl-staff-assign"
    bind:this={dialog}
>
    {#if isLoading}
        <p>Loading data...</p>
    {:else if dialogData}
        <div class="header">
            <span class="title">All Staff</span>
            <button type="button" class="close-btn" onclick={closeDialog}>Close</button>
        </div>
        <div class="content">
            {#each dialogData as item}
                <StaffItem data={item} onselect={assignStaff} />
            {/each}
        </div>
    {/if}
</dialog>

<style>
    .fl-loc-staff {
        display: flex;
        flex-direction: column;
        background-color: var(--white);
        border: 1px solid var(--semi-light);
        border-top: 4px solid var(--semi-light);
        border-radius: 0.375rem;
    }
    .fl-loc-staff > .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        /* padding: 1rem 1.5rem; */
        padding: 1rem 2rem;
        border-bottom: 1px solid var(--semi-light);
    }
    .fl-loc-staff > .header > .title {
        color: var(--darker);
        font-weight: 500;
    }
    .fl-loc-staff > .header > .badge {
        background-color: var(--semi-light);
        border-radius: 50%;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.375rem;
        width: 1.375rem;
    }
    .fl-loc-staff > .header > button {
        background-color: var(--primary);
        font-size: 0.75rem;
        color: var(--white);
        cursor: pointer;
        border: 0;
        outline: 0;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        /* justify-content: center; */
        /* height: 1.375rem; */
        /* width: 1.25rem; */
        padding: 0.375rem 0.5rem;
    }
    .fl-loc-staff > .content {
        /* margin: 0 1.5rem; */
        /* margin: 0 1.25rem; */
        /* display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.5rem 1.5rem 2rem; */
        /* border: 1px solid red; */
        display: grid;
        grid-auto-columns: 25rem;
        grid-template-columns: repeat(3, 1fr);
        /* display: flex; */
        /* flex-wrap: wrap; */
        column-gap: 1rem;
        row-gap: 1rem;
        /* padding: 1.5rem 1.5rem 2rem; */
        padding: 2rem;
    }
    dialog.fl-staff-dlg {
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        border: 1px solid var(--semi-light);
        border-radius: 0.5rem;
        outline: none;
    }
    dialog.fl-staff-dlg > .header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--light);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    dialog.fl-staff-dlg > .header > .title {
        font-weight: 600;
    }
    dialog.fl-staff-dlg > .header > .close-btn {
        padding: 0.25rem 0.5rem;
        background-color: var(--primary);
        border: 0;
        border-radius: 0.25rem;
        color: var(--white);
        cursor: pointer;
    }
    dialog.fl-staff-dlg > .content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 30rem;
        overflow-y: auto;
        padding: 1.5rem;
    }
</style>
