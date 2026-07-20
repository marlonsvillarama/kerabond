<script>
    import { supabase } from "$lib/supabaseClient";
    import { getContext, setContext } from "svelte";
    import { Scissors, Plus, Save, X } from "@lucide/svelte";
    import BreadCrumbs from "$lib/components/ui/bread-crumbs.svelte";
    import ListPageContent from "../list-page-content.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";
    import LocationCard from "./location-card.svelte";
    import { sortByKey } from "$lib/modules/sort";

    let { data } = $props();
    let {
        locations,
        services,
        staff,
        staffServices,
        variants
    } = data;
    let staffPopover = $state();

    const BLANK_DETAILS = {
        name: ''
    };
    const newStaff = () => staffPopover.showModal();
    const resetDetails = () => staffDetails = Object.assign({}, BLANK_DETAILS);

    setContext('LOCATIONS', locations ?? []);
    setContext('SERVICES', services ?? []);
    setContext('STAFF', staff ?? []);
    setContext('STAFF_SERVICES', staffServices ?? []);
    setContext('VARIANTS', variants ?? []);
    
    let allLocations = $state(locations);
    sortByKey(allLocations, 'name');
    console.log('allLocations sorted', allLocations);

    let searchValue = $state('');
    let filteredLocations = $derived(searchValue ?
        allLocations.filter(d => d.name.toLowerCase().indexOf(searchValue.toLowerCase()) === 0) : allLocations
    );

    // let staffDetails = $state(Object.assign({}, BLANK_DETAILS));
    // const cancelForm = (e) => {
    //     if (confirm('Are you sure you want to close?') === false) {
    //         e.preventDefault();
    //         return;
    //     }
    //     resetDetails();
    // };
    // const submitForm = async (e) => {
    //     const actionTaken = e.submitter?.value;
    //     if (actionTaken !== 'submit') { return; }

    //     staffDetails.phone = staffDetails.phone.replace(/\s/g, "");

    //     const { data, error } = await supabase.from('kb_staff').insert(staffDetails).select();
    //     staffList.push(data[0]);
    //     staffList = staffList;
    //     resetDetails();
    // };

    // const toggleAll = (add) => {
    //     console.log('toggleAll', add === true);
    //     for (let i = 0, count = tableRows.length; i < count; i++) {
    //         tableRows[i].selected = (add === true);
    //     }
    //     tableRows = tableRows;
    //     console.log(`toggleAll (${add === true}) tableRows`, tableRows);
    // };

    let selectedCount = $derived(filteredLocations.filter(d => d.selected === true).length);
    // const toggleRows = () => {
    //     toggleAll(selectedCount < tableRows.length);
    // };

    // const deleteRows = async () => {
    //     if (confirm('Are you sure you want to delete the selected rows?') === false) { return; }

    //     let rowsToDelete = tableRows.filter(d => d.selected === true).map(d => d.id);
    //     const { data, error } = await supabase.from('kb_staff').delete().in('id', rowsToDelete);
    //     tableRows = tableRows.filter(d => rowsToDelete.indexOf(d.id) < 0);
    // };

    const editLocation = (id) => {};
</script>

<ListPageContent title="Branches" count={locations.length}>
    {#snippet crumbs()}
        <BreadCrumbs items={[
            { link: '/setup', text: 'Setup' },
            { link: `/setup/locations`, text: 'Branches' },
        ]} />
    {/snippet}

    {#snippet controls()}
        <InputSearch />
        <button type="button" command="show-modal" commandfor="fl-dlg-new" class="fl-btn-new">
            <Plus size={16} />Add branch
        </button>
    {/snippet}
    
    {#each filteredLocations as location}
        <LocationCard data={location} onedit={() => {}} />
        <!-- <ServiceCard data={service} onedit={() => {}} /> -->
    {/each}
</ListPageContent>

<!-- <div class="wrapper"> -->

<!-- <div class="fl-page-header flex-center between">
    <h2 class="flex-center">Locations</h2>
    <div class="fl-page-controls flex-center">
        <InputSearch bind:value={searchValue} />
        <button type="button" command="show-modal" commandfor="fl-service-new" class="fl-btn-new-service">
            <Plus size={16} />Add service
        </button>
    </div>
</div> -->

<!-- <div class="fl-table-controls">
    <div>
        <button type="button" onclick={() => {}}>Select all</button>
        <button type="button" onclick={() => {}}>Uncheck all</button>

        {#if selectedCount > 0}
            <button type="button" onclick={() => {}}
                class="fl-btn-alert"
            >Delete {selectedCount} row{selectedCount === 1 ? '' : 's'}</button>
        {/if}
    </div>
    <div>
        <span class="found">Found {filteredServices.length} services</span>
    </div>
</div> -->

<!-- <div class="fl-full-scrollable fl-page-content">
    {#each filteredServices as service}
        <ServiceCard data={service} onedit={() => {}} />
    {/each}
</div> -->

<!-- </div> -->

<!-- <dialog class="fl-staff-dlg" id="fl-staff-new"
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
</dialog> -->

<style>
    .fl-page-header {
        /* border: 1px solid red; */
        margin-bottom: 1rem;
        padding: 0 0.62rem;
    }
    .fl-page-header > h2 {
        color: var(--darker);
        font-size: 1.5rem;
        gap: 0.5rem;
        font-weight: 600;
    }
    .fl-btn-new,
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
    .fl-btn-new,
    .fl-btn-submit {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-btn-new:hover,
    .fl-btn-submit:hover {
        background-color: var(--primary-dark);
    }
    .fl-service-dlg {
        border: none;
        border-radius: 0.5rem;
        outline: none;
        margin-top: 0.25rem;
        position: absolute;
        position-anchor: --anchor-add-staff;
        position-area: bottom span-left;
    }
    .fl-service-dlg {
        flex-direction: column;
    }
    .fl-service-dlg::backdrop {
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
    .service-details {
        display: grid;
    }
    .service-details,
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
    .fl-service-locations > .section-list {
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
        font-size: 0.875rem;
        margin-bottom: 1.5rem;
        padding: 0 0.625rem;
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
    /* .fl-table {
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        font-size: 0.875rem;
        width: 100%;
    }
    .fl-table-headers {
        padding: 0;
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
    } */
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
        flex-direction: column;
        /* flex-wrap: wrap; */
        /* column-gap: 2rem; */
        gap: 1rem;
    }
</style>
