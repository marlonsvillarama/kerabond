<script>
    import { Plus, X } from "@lucide/svelte";
    import { getToastState } from "$lib/components/ui/toaster/toaster-state.svelte";
    import { supabase } from "$lib/supabaseClient";
    import FieldText from "$lib/components/ui/form/field-text.svelte";
    import ServiceVariant from "./service-variant.svelte";

    let {
        service
    } = $props();
    let variants = $state(service.variants);
    const toastState = getToastState();
    let dialog = $state();
    let isLoading = $state(false);
    let dialogData = $state([]);

    const addVariant = async (variant) => {};

    const deleteVariant = async (id) => {
        if (confirm('Are you sure you want to delete this variant?') === false) { return; }

        variants = variants.filter(d => d.id !== id);
        const { data, error } = await supabase.from('kb_service_variants')
            .delete().eq('id', id);
        if (error) {
            console.error('deleteVariant', error);
        }
        
        toastState.add('Success!', `Variant successfully deleted.`);
    };

    const updateVariant = async (id, key) => {
        let variant = items.find(d => d.id === id);
        if (key === 'name' && !variant[key]) {
            return;
        }

        const { data, error } = await supabase.from('kb_service_variants')
            .update({ [key]: variant[key] })
            .eq('id', id);
        
        toastState.add('Update successful', `${key} successfully updated!`);
    };

    // const openDialog = () => {
        // loadData();
        // dialog?.showModal();
        // dialog?.show();
    // };

    let tempVariant = $state({
        name: '',
        duration: '',
        price: ''
    });

    const cancelForm = () => {
        dialog.hidePopover();
        resetTempVariant();
    }

    const resetTempVariant = () => {
        tempVariant = {
            name: '',
            duration: '',
            price: ''
        };
    };

    const submitForm = async () => {
        const { data, error } = await supabase.from('kb_service_variants')
            .insert({
                ...tempVariant,
                service: service.id
            })
            .select()
            .single();
        if (error) {
            console.error('deleteVariant', error);
            return;
        }
        
        dialog.hidePopover();
        variants.push(data);
        toastState.add('Success!', `Variant successfully added.`);
    }
    // const setVariantValue = (key, value) => {
    //     tempVariant[key] = value;
    // };
</script>

<div class="fl-service-variants">
    <!-- {JSON.stringify(variants)} -->
    <div class="header">
        <span class="title">Variants</span>
        <span class="badge">{variants.length}</span>
        <button type="button" class="btn-add" popovertarget="fl-add-variant"><Plus size={16} />Add variant</button>
        <!-- <button type="button" class="btn-add" onclick={openDialog}><Plus size={16} />Add variant</button> -->
    </div>

    <div class="content">
    {#each variants as _, i}
        <ServiceVariant index={i+1} bind:data={variants[i]}
            onupdate={updateVariant}
            ondelete={() => deleteVariant(variants[i].id)}
        />
    {/each}
    </div>
</div>

<div class="fl-variants-dlg" id="fl-add-variant"
    popover
    bind:this={dialog}
    oncancel={cancelForm}
    // onsubmit={submitForm}
>
    <!-- <form method="dialog"> -->
    <div class="header">
        <!-- <div class="form-title"> -->
        <span class="title">New Variant</span>
        <!-- </div> -->
        <button type="button" onclick={cancelForm}><X size={16} /></button>
    </div>
    <div class="content">
        <FieldText id="new-variant-name" label="Name" required={true}
            bind:value={tempVariant.name}
            width="100%"
        />
        <div class="split-row">
            <FieldText id="new-variant-duration" label="Duration"
                required={true}
                bind:value={tempVariant.duration}
                width="5rem"
            />
            <FieldText id="new-variant-price" label="Price" required={true}
                bind:value={tempVariant.price}
                width="5rem"
            />
        </div>
        <div class="controls">
            <button type="button" class="btn-save" onclick={submitForm}>Add</button>
            <button type="button" onclick={cancelForm}>Cancel</button>
        </div>
            <!-- onblur={() => setVariantValue('name', )} -->
    </div>
    <!-- </form> -->

    <!-- {#if isLoading}
        <p>Loading data...</p>
    {:else if dialogData} -->
        <!-- <div class="header">
            <span class="title">All Staff</span>
            <button type="button" class="close-btn" onclick={closeDialog}>Close</button>
        </div>
        <div class="content">
            {#each dialogData as item}
                <StaffItem data={item} onselect={assignStaff} />
            {/each}
        </div> -->
    <!-- {/if} -->
</div>

<style>
    .fl-service-variants {
        /* margin-top: 1rem; */
        display: flex;
        flex-direction: column;
        /* gap: 2rem; */
        /* padding: 1.5rem 1.5rem 2rem; */
        background-color: var(--white);
        border: 1px solid var(--semi-light);
        border-top: 4px solid var(--semi-light);
        border-radius: 0.375rem;
    }
    .fl-service-variants > .header {
        /* border: 1px solid */
        /* cursor: pointer; */
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--semi-light);
        /* margin-bottom: 0.5rem; */
        /* display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--semi-light); */
    }
    /* .fl-service-variants > .header > .icon {
        background-color: var(--light);
        border: 0;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
    } */
    .fl-service-variants > .header > .title {
        color: var(--darker);
        font-weight: 500;
    }
    .fl-service-variants > .header > .badge {
        background-color: var(--semi-light);
        border-radius: 50%;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.375rem;
        width: 1.375rem;
    }
    .fl-service-variants > .header > button {
        background-color: var(--primary);
        border-radius: 0.25rem;
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
    .fl-service-variants > .header > button.btn-add {
        anchor-name: --anchor-add-variant;
    }
    .fl-service-variants > .content {
        /* margin: 0 1.5rem; */
        /* margin: 0 1.25rem; */
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.5rem 1.5rem 2rem;
        /* border: 1px solid red; */
    }
    :global(.fl-service-variants > .content > *:not(:last-child)) {
        /* background-color: var(--lighter); */
        border-bottom: 1px solid var(--light);
    }
    /* :global(.fl-service-variants > .content > *:hover) {
        background-color: var(--lighter);
    } */
    /* :global(.fl-service-variants > .content > *:not(:last-child)) {
        border-bottom: 1px solid var(--lighter);
        margin-bottom: 0.5rem;
    } */
    .fl-variants-dlg {
        /* border: none;
        border-radius: 0.5rem;
        outline: none;
        margin-top: 0.25rem;
        position: absolute; */

        background-color: var(--white);
        border: 1px solid var(--primary);
        border-radius: 0.25rem;
        outline: none;
        /* box-shadow: var(--shadow); */
        margin-top: 0.25rem;
        position: absolute;
        position-anchor: --anchor-add-variant;
        position-area: bottom span-right;
    }
    .fl-variants-dlg > .header {
        background-color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.375rem 0.75rem;
    }
    /* .form-title {
        display: flex;
        flex-direction: column;
    } */
    .fl-variants-dlg > .header > .title {
        color: var(--white);
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: -0.25px;
    }
    .fl-variants-dlg > .header > button {
        height: 1.75rem;
        width: 1.75rem;
        border: 0;
        border-radius: 50%;
        background-color: transparent;
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .fl-variants-dlg > .header > button:hover {
        background-color: var(--lighter);
        color: var(--dark);
    }
    .fl-variants-dlg > .content {
        padding: 0.75rem 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .fl-variants-dlg > .content > .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .fl-variants-dlg > .content > .controls > button {
        border: 0;
        outline: none;
        border-radius: 0.25rem;
        padding: 0.375rem 0.5rem;
    }
    .fl-variants-dlg > .content > .controls > button.btn-save {
        background-color: var(--primary);
        color: var(--white);
        width: 5rem;
    }


    /* .fl-variants-dlg > .header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--light);
        display: flex;
        align-items: center;
        justify-content: space-between;
    } */
    /* .fl-variants-dlg > .header > .title {
        font-weight: 600;
    } */
    .fl-variants-dlg > .header > .close-btn {
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
    /* .fl-variants-dlg::backdrop {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
    } */

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
