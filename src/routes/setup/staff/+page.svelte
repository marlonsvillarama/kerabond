<script>
    import { supabase } from "$lib/supabaseClient";
    import { getContext, setContext } from "svelte";
    import { IdCard, Plus, Save, X } from "@lucide/svelte";
    import Drawer from "$lib/components/ui/drawer.svelte";
    import FormFieldEmail from "$lib/components/ui/calendar/forms/form-field-email.svelte";
    import FormFieldPhone from "$lib/components/ui/calendar/forms/form-field-phone.svelte";
    import FormFieldText from "$lib/components/ui/calendar/forms/form-field-text.svelte";
    import FormStaffLocation from "$lib/components/ui/calendar/forms/form-staff-location.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";
    import StaffCard from "./staff-card.svelte";
    import { sortByKey } from "$lib/modules/sort";

    let { data } = $props();
    let staffPopover = $state();

    const BLANK_DETAILS = {
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    };
    const newStaff = () => staffPopover.showModal();
    const resetDetails = () => staffDetails = Object.assign({}, BLANK_DETAILS);
    let selectAll = $state(false);

    setContext('LOCATIONS', data.locations ?? []);
    setContext('STAFF_LOCATIONS', data.staffLocations ?? []);
    
    let staffList = $state(data.staff);
    let allStaff = $state(
        staffList.map(d => {
            return {
                ...d,
                name: `${d.first_name}${d.last_name ? ' ' + d.last_name : ''}`
            }
        })
    );
    sortByKey(allStaff, 'first_name');
    console.log('allStaff sorted', allStaff);
    let searchValue = $state('');
    let filteredStaff = $derived(searchValue ?
        allStaff.filter(d => d.first_name.toLowerCase().indexOf(searchValue.toLowerCase()) === 0) : allStaff
    );

    let staffDetails = $state(Object.assign({}, BLANK_DETAILS));
    const cancelForm = (e) => {
        if (confirm('Are you sure you want to close?') === false) {
            e.preventDefault();
            return;
        }
        resetDetails();
    };
    const submitForm = async (e) => {
        const actionTaken = e.submitter?.value;
        if (actionTaken !== 'submit') { return; }

        staffDetails.phone = staffDetails.phone.replace(/\s/g, "");

        const { data, error } = await supabase.from('kb_staff').insert(staffDetails).select();
        allStaff.push(data[0]);
        sortByKey(allStaff, 'first_name');
        // allStaff = allStaff;
        resetDetails();
    };

    const toggleAll = () => {
        selectAll = !selectAll;
        console.log('toggleAll', selectAll);
        allStaff.forEach(d => d.selected = selectAll);
        allStaff = allStaff;
        // for (let i = 0, count = tableRows.length; i < count; i++) {
        //     tableRows[i].selected = (add === true);
        // }
        // tableRows = tableRows;
        // console.log(`toggleAll (${add === true}) tableRows`, tableRows);
    };

    let selectedCount = $derived(filteredStaff.filter(d => d.selected === true).length);
    const toggleOne = (id) => {
        let el = allStaff.find(d => d.id === id);
        if (!el) { return; }
        el.selected = !el.selected; 
    };

    const deleteStaff = async (id) => {
        if (confirm('Are you sure you want to delete this staff?') === false) { return; }

        const { data, error } = await supabase.from('kb_staff').delete().eq('id', id);
        allStaff = allStaff.filter(d => d.id !== id);
    };

    const deleteMultiple = async () => {
        if (confirm('Are you sure you want to delete the selected staff?') === false) { return; }

        let rowsToDelete = allStaff.filter(d => d.selected === true).map(d => d.id);
        if (rowsToDelete.length <= 0) { return; }

        const { data, error } = await supabase.from('kb_staff').delete().in('id', rowsToDelete);
        allStaff = allStaff.filter(d => rowsToDelete.indexOf(d.id) < 0);
    };
</script>

<div class="fl-page-header flex-center between">
    <h2 class="flex-center"><IdCard size={32} />Manage Staff</h2>
    <div class="fl-page-controls flex-center">
        <InputSearch bind:value={searchValue} />
        <button type="button" command="show-modal" commandfor="fl-staff-new" class="fl-btn-new-staff">
            <Plus size={16} />Add staff
        </button>
    </div>
</div>

<div class="fl-table-controls">
    <div>
        <button type="button" onclick={toggleAll}>
            {#if selectAll}Uncheck{:else}Select{/if} all
        </button>

        {#if selectedCount > 0}
            <button type="button" onclick={deleteMultiple}
                class="fl-btn-alert"
            >Delete {selectedCount} staff</button>
        {/if}
    </div>
    <div>
        <span class="found">Found {filteredStaff.length} records</span>
    </div>
</div>

<div class="fl-full-scrollable fl-page-content">
    {#each filteredStaff as staff}
        <StaffCard data={staff}
            ondelete={deleteStaff}
            onedit={() => {}}
            onselect={toggleOne}
        />
    {/each}
    <!-- <TableStaff rows={filteredStaff} {headers} /> -->
</div>

<dialog class="fl-staff-dlg" id="fl-staff-new"
    bind:this={staffPopover}
    oncancel={cancelForm}
    onsubmit={submitForm}
>
    <form method="dialog">
        <div class="form-header">
            <div class="form-title">
                <span class="title">Add New Staff</span>
            </div>
            <button type="button" command="request-close" commandfor="fl-staff-new"><X size={20} /></button>
        </div>
    <div class="form-content">
        <div class="staff-details">
            <div class="fl-section-header">
                <span class="title">Primary Details</span>
                <span class="subtitle">Select the locations for this employee</span>
            </div>
            <div class="fl-section-content">
                <div class="split-2">
                    <FormFieldText id="fl-staff-fn" label="First Name" required={true} bind:value={staffDetails.first_name} />
                    <FormFieldText id="fl-staff-ln" label="Last Name" required={true} bind:value={staffDetails.last_name} />
                </div>
                <FormFieldPhone id="fl-staff-ph" label="Phone No." width="12rem" bind:value={staffDetails.phone} />
                <FormFieldEmail id="fl-staff-em" label="Email" bind:value={staffDetails.email} />
            </div>
        </div>
        <div class="fl-staff-locations">
            <div class="fl-section-header">
                <span class="title">Staff Locations</span>
                <span class="subtitle">Select the locations for this employee</span>
            </div>
            <div class="section-list">
                {#each data.locations as loc}
                    <FormStaffLocation id={loc.id} label={loc.name || loc.street_1} />
                {/each}
            </div>
        </div>
        <div class="form-buttons">
            <button type="submit" class="fl-btn-submit" value="submit">
                <Save size={16} />Create Staff
            </button>
            <button type="button" class="fl-btn-default" command="request-close" commandfor="fl-staff-new">Cancel</button>
        </div>
    </div>
    </form>
</dialog>

<style>
    .fl-page-header > h2 {
        gap: 0.75rem;
    }
    .fl-btn-new-staff,
    .fl-btn-default,
    .fl-btn-submit {
        background-color: var(--lighter);
        border: 0;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.875rem;
        outline: none;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        anchor-name: --anchor-add-staff;
    }
    .fl-btn-new-staff,
    .fl-btn-submit {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-btn-new-staff:hover,
    .fl-btn-submit:hover {
        background-color: var(--primary-dark);
    }
    .fl-staff-dlg {
        border: none;
        border-radius: 0.5rem;
        outline: none;
        margin-top: 0.25rem;
        position: absolute;
        position-anchor: --anchor-add-staff;
        position-area: bottom span-left;
    }
    .fl-staff-dlg {
        flex-direction: column;
    }
    .fl-staff-dlg::backdrop {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
    }
    .form-header {
        background-color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1.25rem;
    }
    .form-title {
        display: flex;
        flex-direction: column;
    }
    .form-title > .title {
        color: var(--white);
        font-size: 1.5rem;
        font-weight: 500;
        letter-spacing: -0.25px;
    }
    /* .form-title > .subtitle {
        color: var(--lighter);
        font-size: 0.75rem;
        font-weight: 400;
        margin-top: 0.125rem;
        opacity: 0.8;
    } */
    .form-header > button {
        background-color: transparent;
        border: 0;
        border-radius: 50%;
        color: var(--white);
        cursor: pointer;
        outline: 0;
        height: 2.125rem;
        width: 2.125rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form-header > button:hover {
        background-color: var(--primary-light);
        color: var(--darker);
    }
    .staff-details {
        display: grid;
    }
    .staff-details,
    .fl-staff-locations,
    .form-buttons {
        padding: 1.25rem;
    }
    .form-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .split-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    .fl-staff-locations {
        border-top: 1px solid var(--light);
    }
    .fl-section-header {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.25rem;
    }
    .fl-section-header > .title {
        /* font-size: 0.875rem; */
        font-weight: 500;
    }
    .fl-section-header > .subtitle {
        color: var(--semi-dark);
        font-size: 0.75rem;
        opacity: 0.7;
    }
    .fl-section-content {
        display: grid;
        gap: 1.25rem;
    }
    .fl-staff-locations > .section-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .form-buttons {
        border-top: 1px solid var(--light);
    }

    .fl-table-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 0.875rem;
    }
    .fl-table-controls button {
        background-color: var(--light);
        border: 0;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.875rem;
        outline: none;
        padding: 0.5rem 1rem;
        margin-right: 0.25rem;
    }
    .fl-table {
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        font-size: 0.875rem;
        width: 100%;
    }
    .fl-table-headers {
        padding: 0;
        /* background-color: var(--light); */
        /* display: grid;
        align-items: center; */
    }
    .fl-table-header {
        padding: 1rem;
        text-align: left;
    }
    .fl-table-header {
        background-color: var(--primary);
        color: var(--white);
        font-size: 1rem;
        font-weight: 500;
    }
    .fl-table-id {
        cursor: pointer;
    }
    :global(.fl-table-body > :nth-child(even)) {
        background-color: var(--lighter)
    }
    /* .fl-table-body > tr:hover > .fl-table-cell {
        background-color: var(--primary-lightest);
    } */
    .fl-btn-alert {
        background-color: var(--alert) !important;
        color: var(--white);
    }

    .fl-page-content {
        /* display: grid; */
        /* grid-auto-columns: 25rem; */
        /* grid-template-columns: repeat(3, 1fr); */
        display: flex;
        flex-wrap: wrap;
        column-gap: 2rem;
        row-gap: 2rem;
    }
</style>
