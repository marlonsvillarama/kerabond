<script>
    import { getContext } from "svelte";
    import { goto } from "$app/navigation";
    import { Dot, IdCard, Pencil, Plus, Scissors, X } from "@lucide/svelte";
    import Badge from "$lib/components/ui/badge.svelte";
    import ListItem from "$lib/components/global/list-item.svelte";
    // import ServiceBadge from "./service-badge.svelte";

    let {
        data = $bindable(),
        // onedit,
        ondelete,
        onselect,
    } = $props();

    let allVariants = getContext('VARIANTS');
    let serviceVariants = $derived(allVariants.filter(d => d.service === data.id));

    let allStaff = getContext('STAFF');
    console.log('allStaff', allStaff);
    let allStaffServices = getContext('STAFF_SERVICES')
    let staffServices = $derived.by(() => {
        return allStaffServices.filter(d => d.service === data.id)
            .map(d => {
                return {
                    ...d,
                    staff: allStaff.find(s => s.id === d.staff)
                }
            });
    });
    console.log('staffServices', staffServices);
    
    const toggleActive = async () => {
        const { data, error } = await supabase.from('kb_services')
            .update({ is_active: data.is_active }).eq('id', data.id).select();
        if (error) {
            console.error(error);
        }
    }
</script>

<!-- {JSON.stringify(data)} -->

<ListItem Icon={Scissors}>
    {#snippet details()}
    <div class="service-details"
        class:service-details-disabled={data.is_active === false}
    >
        <div class="header">{data.name}</div>
        <div class="desc">{data.description}</div>
        <div class="subdetails">
            {serviceVariants.length} variant{serviceVariants.length === 1 ? '' : 's'}
            <Dot size={16} />
            {staffServices.length} locations
        </div>
    </div>
    {/snippet}

    {#snippet badges()}
        {#if data.is_active}
            <Badge type="primary">Active</Badge>
            {:else}
            <Badge type="disabled">Inactive</Badge>
        {/if}
    {/snippet}

    <!-- <div class="service-actions"> -->
    {#snippet controls()}
        <button type="button" onclick={() => goto(`./services/${data.id}`)}><Pencil size={16} /></button>
        <button type="button" onclick={() => ondelete(data.id)}><X size={16} /></button>
    {/snippet}
    <!-- </div> -->
</ListItem>

<!-- <div class="fl-service-card">
    <div class="icon"><Scissors size={20} /></div>
    <div class="info">
        <div class="details"
            class:details-disabled={data.is_active === false}
        >
            <div class="header">{data.name}</div>
            <div class="desc">{data.description}</div>
            <div class="subdetails">
                {serviceVariants.length} variant{serviceVariants.length === 1 ? '' : 's'}
                <Dot size={16} />
                {staffServices.length} locations
            </div>
        </div>
        <div class="controls">
            <div class="badges">
                {#if data.is_active}
                    <ServiceBadge type="primary">Active</ServiceBadge>
                    {:else}
                    <ServiceBadge type="disabled">Inactive</ServiceBadge>
                {/if}
            </div>
            <div class="actions">
                <a href="./services/{data.id}"><Pencil size={16} /></a>
                <button type="button" onclick={() => ondelete(data.id)}><X size={16} /></button>
            </div>
        </div>
    </div>
</div> -->

<style>
    /* .fl-service-card {
        align-items: center;
        background-color: transparent;
        border: 0;
        border-radius: 0.5rem;
        display: flex;
        gap: 0.75rem;
        outline: none;
        padding: 0.5rem 0.625rem;
        position: relative;
        text-align: start;
    } */
    /* .fl-service-card:hover {
        background-color: var(--lighter);
    } */
    /* .fl-service-card > .icon {
        color: var(--semi-dark);
        height: 2.5rem;
        width: 2.5rem;
        background-color: var(--light);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    } */
    /* .fl-service-card > .info {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-between;
    } */
    .service-details {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.125rem;
    }
    .service-details-disabled {
        opacity: 0.4;
    }
    .service-details > .header {
        font-weight: 600;
    }
    .service-details > .desc {
        font-size: 0.875rem;
        opacity: 0.5;
    }
    .service-details > .subdetails {
        align-items: center;
        display: flex;
        font-size: 0.75rem;
        opacity: 0.8;
    }
    .service-actions {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    .service-actions > * {
        align-items: center;
        background-color: transparent;
        border: 0;
        border-radius: 0.25rem;
        color: var(--primary);
        cursor: pointer;
        display: flex;
        justify-content: center;
        outline: none;
        height: 2rem;
        width: 2rem;
    }
    .service-actions > *:hover {
        background-color: var(--primary);
        color: var(--white);
    }
    /* .card-title {
        border-radius: 0.25rem;
        outline: none;
        color: var(--dark);
        padding: 0.25rem 0.375rem;
        font-size: 1.375rem;
        font-weight: 600;
        width: calc(60% - 1rem);
        margin-bottom: 0.5rem;
    } */
    /* .card-title:hover {
        outline: 1px solid var(--primary-light);
    } */
    /* .card-title:focus {
        background-color: var(--white);
        outline: 2px solid var(--primary);
    } */
    /* .service-details > .card-details { */
    /* .card-details {
        display: none;
        gap: 1.5rem;
    } */
    /* @media (min-width: 80rem) {
        .card-details {
            grid-template-columns: 3fr 2fr;
        }
    } */
    /* .card-details > .primary {
        display: flex;
        flex-direction: column;
    } */
    /* .primary > .controls { */
    /* .service-details > .controls { */
        /* border: 1px solid red; */
        /* position: absolute;
        top: 0;
        right: 0; */
        /* display: flex;
        align-items: center; */
        /* gap: 1px; */
        /* gap: 0.25rem;
        margin-bottom: 2rem;
    } */
    /* .primary > .controls > button { */
    /* .service-details > .controls > button { */
        /* background-color: transparent; */
        /* background-color: var(--primary-lighter);
        border: 0;
        border-radius: 0.25rem; */
        /* border-bottom: 1px solid transparent; */
        /* color: var(--primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.5rem;
    } */
    /* .service-details > .controls > button:last-child {
        border-top-right-radius: 0.5rem;
    } */
    /* .primary > .controls > button:hover { */
    /* .service-details > .controls > button:hover { */
        /* background-color: var(--primary-light); */
        /* border-bottom: 1px solid var(--primary); */
    /* } */
    /* .primary > .desc { */
    /* .desc {
        background-color: var(--lighter);
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        outline: none;
        color: var(--dark);
        font-size: 0.875rem;
        line-height: 1.375rem;
        font-family: var(--font-default);
        font-weight: 400;
        opacity: 0.8;
        padding: 0.25rem 0.375rem;
        resize: none;
    } */
    /* .primary > .desc:hover { */
    /* .desc:hover {
        outline: 1px solid var(--primary-light);
    } */
    /* .primary > .desc:focus { */
    /* .desc:focus {
        background-color: var(--white);
        outline: 2px solid var(--primary);
    } */
    /* .fl-service-card > .service-details > * {
        border: 1px solid red;
    } */
    /* .card-details .section-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: space-between;
        font-size: 1rem;
        font-weight: 500;
        padding-bottom: 0.25rem;
        border-bottom: 1px solid var(--primary);
        margin-bottom: 0.25rem;
    } */
    /* .section-actions > button {
        background-color: var(--primary);
        border: 0;
        border-radius: 0.25rem;
        color: var(--white);
        cursor: pointer;
        font-size: 0.75rem;
        outline: none;
        padding: 0.5rem 0.625rem;
    } */
    /* .empty {
        padding: 1.5rem;
        background-color: var(--lighter);
        border: 3px dashed var(--border);
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: var(--semi-dark);
    } */
    /* .empty > span {
        font-size: 0.875rem;
        font-style: italic;
    } */
    /* .section-header.small {
        font-size: 1rem;
    } */
    /* .section-actions {} */
    /* .fl-service-card > .service-details .desc {
        color: var(--semi-dark);
        font-size: 0.875rem;
        line-height: 1.375rem;
        font-weight: 400;
        opacity: 0.8;
    } */
</style>
