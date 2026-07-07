<script>
    import { supabase } from "$lib/supabaseClient";
    import { getContext, setContext } from "svelte";
    import { IdCard, Plus, Save, X } from "@lucide/svelte";
    import Drawer from "$lib/components/ui/drawer.svelte";
    // import FormField from "$lib/components/ui/calendar/forms/form-field.svelte";
    // import FormCheckbox from "$lib/components/ui/calendar/forms/form-checkbox.svelte";
    import FormCheckboxPill from "$lib/components/ui/calendar/forms/form-checkbox-pill.svelte";
    import FormFieldEmail from "$lib/components/ui/calendar/forms/form-field-email.svelte";
    import FormFieldPhone from "$lib/components/ui/calendar/forms/form-field-phone.svelte";
    import FormFieldPills from "$lib/components/ui/calendar/forms/form-field-pills.svelte";
    import FormFieldText from "$lib/components/ui/calendar/forms/form-field-text.svelte";
    import FormStaffLocation from "$lib/components/ui/calendar/forms/form-staff-location.svelte";
    import InputSearch from "$lib/components/ui/input-search.svelte";
    import TableStaff from "$lib/components/ui/table/table-staff.svelte";

    let { data } = $props();
    console.log('data', data);
    let openDrawer = $state(false);
    let openDialog = $state(false);
    let staffPopover = $state();

    const newStaff = () => {
        console.log('newStaff');
        openDrawer = true;
        openDialog = true;
        staffPopover.showModal();
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

    let allStaff = $derived(
        data.staff.map(d => {
            return {
                ...d,
                name: `${d.first_name}${d.last_name ? ' ' + d.last_name : ''}`
            }
        })
    );
    let sortedStaff = sortByKey(data.staff, 'first_name');
    let searchValue = $state('');
    let filteredStaff = $derived(searchValue ?
        allStaff.filter(d => d.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) : allStaff
    );
    let headers = [
        { id: 'id', label: 'ID' },
        { id: 'is_active', label: 'Active' },
        { id: 'name', label: 'Name' },
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' },
        { id: 'email', label: 'Email' },
        { id: 'email', label: 'Email' },
    ]

    // const closeModal = () => {
        // openDrawer = false;
        // openDialog = false;
        // if (confirm("Are you sure you want to c"))
        // staffPopover.hideModal();
    // };

    let staffDetails = $state({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });
    const submitForm = async () => {
        console.log('staffDetails', staffDetails);
        // const { error } = await supabase.from('kb_staff').insert(staffDetails);
        // console.log('rsvp error', error);
        staffPopover.hideModal();
    };
</script>

<div class="fl-page-header flex-center between">
    <h2 class="flex-center"><IdCard size={32} />Manage Staff</h2>
    <div class="fl-page-controls flex-center">
        <InputSearch bind:value={searchValue} />
        <!-- <button type="button" onclick={newStaff} class="fl-btn-new-staff"> -->
        <button type="button" command="show-modal" commandfor="fl-staff-new" class="fl-btn-new-staff">
            <Plus size={16} />Add staff
        </button>
    </div>
</div>

<div class="fl-full-scrollable fl-page-content">
    <TableStaff rows={filteredStaff} {headers} />
</div>

<!-- <Drawer bind:open={openDrawer} /> -->

<dialog class="fl-staff-dlg" id="fl-staff-new" bind:this={staffPopover}>
    <div class="form-header">
        <div class="form-title">
            <span class="title">Add New Staff</span>
            <!-- <span class="sub-title">Fill out the booking form below</span> -->
        </div>
        <button type="button" command="close" commandfor="fl-staff-new"><X size={20} /></button>
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
                <!-- <div class="fl-staff-locations">
                    <FormFieldPills id="fl-staff-locs" label="Staff Locations" required={true}
                        options={data.locations.map(d => {
                            return {
                                id: d.id,
                                name: d.name || d.street_1
                            };
                        })}
                    /> -->
                    <!-- <span>Select branches</span> -->
                    <!-- {#each data.locations as loc} -->
                        <!-- <FormCheckboxPill id="fl-staff-loc-{loc.id}" label={loc.name || loc.street_1} /> -->
                        <!-- <FormCheckbox id="fl-staff-loc-{loc.id}" label={loc.name || loc.street_1} /> -->
                        <!-- <div class="fl-staff-loc-cb">
                            <input type="checkbox" id="staff-loc-{loc.id}" data-location={loc.id}>
                            <label for="staff-loc-{loc.id}">{loc.name || loc.street_1}</label>
                        </div> -->
                        <!-- <button type="button">{loc.name || loc.street_1}</button> -->
                    <!-- {/each} -->
                <!-- </div> -->
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
            <button type="button" class="fl-btn-submit"
                onclick={submitForm}
            >
                <Save size={16} />Create Staff
            </button>
            <button type="button" class="fl-btn-default">Cancel</button>
        </div>
    </div>
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
        /* width: 8rem; */
    }
    /* .fl-btn-new-staff {
        anchor-name: --anchor-add-staff;
    } */
    .fl-btn-new-staff:hover,
    .fl-btn-submit:hover {
        background-color: var(--primary-dark);
    }
    /* .fl-btn-open-dialog {
        background-color: var(--white);
        border-bottom-right-radius: 0;
        z-index: 999;
    } */
    .fl-staff-dlg {
        /* top: 50%; */
        /* left: 50%; */
        border: none;
        border-radius: 0.5rem;
        outline: none;
        /* transform: translateX(-50%) translateY(-50%); */
        margin-top: 0.25rem;
        /* padding: 1rem 1.5rem; */
        position: absolute;
        position-anchor: --anchor-add-staff;
        position-area: bottom span-left;
    }
    .fl-staff-dlg {
        /* height: 100%; */
        /* width: 100%; */
        /* display: flex; */
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
    .form-title > .sub-title {
        color: var(--lighter);
        font-size: 0.75rem;
        font-weight: 400;
        margin-top: 0.125rem;
        opacity: 0.8;
    }
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
    /* .form-content, */
    .staff-details {
        display: grid;
        /* gap: 1.25rem; */
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
        /* font-weight: 500; */
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
</style>
