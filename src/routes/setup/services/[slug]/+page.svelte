<script>
    import { setContext } from "svelte";
    import Collapsible from "$lib/components/ui/collapsible.svelte";
    import ServiceBadge from "../service-badge.svelte";
    import ServiceLocations from "./service-locations.svelte";
    import ServiceVariants from "./service-variants.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data
    } = $props();
    let service = $state(data.service);
    setContext('SERVICE', data);
    setContext('LOCATIONS', data.locations);
    setContext('STAFF', data.staff);

    const clickActive = (e) => {
        if (service.is_active === true && confirm('Are you sure you want to inactivate this service?') === false) {
            e.preventDefault();
        }
    };

    const clickHasVariants = (e) => {
        if (service.has_variants === true && confirm('Are you sure you want to inactivate all variants for this service?') === false) {
            e.preventDefault();
        }
    }
</script>

{JSON.stringify(service)}

<div class="fl-service wrapper">
    <div class="breadcrumbs">crumbs</div>
    
    <section class="fl-page-header">
        <!-- <h2 class="flex-center"><Scissors size={24} />Services</h2> -->
        <h2 class="flex-center">{service.name}</h2>
        <!-- <div class="fl-page-controls flex-center">
            <InputSearch bind:value={searchValue} />
            <button type="button" command="show-modal" commandfor="fl-service-new" class="fl-btn-new-service">
                <Plus size={16} />Add service
            </button>
        </div> -->
        <!-- {#if service.is_active === false}
        <div class="fl-page-status">
            <ServiceBadge type="alert">Inactive</ServiceBadge>
        </div>
        {/if} -->
        <textarea>{service.description}</textarea>
        <div class="toggle">
            <Toggle id="active-{service.id}" bind:checked={service.is_active} onclick={(e) => clickActive(e)} />
            <label for="active-{service.id}"
                class:inactive={service.is_active !== true}
            >
                {#if service.is_active === true}
                    This service is active and can be booked.
                {:else}
                    This service is currently unavailable.
                {/if}
            </label>
        </div>
    </section>
    <!-- <section class="fl-page-controls">
    </section> -->

    <section class="fl-variants">
        <div class="toggle">
            <Toggle id="has-variants-{service.id}" bind:checked={service.has_variants} onclick={(e) => clickHasVariants(e)} />
            <label for="has-variants-{service.id}"
                class:inactive={service.has_variants !== true}
            >
                {#if service.has_variants === true}
                    This service has variants enabled.
                {:else}
                    This service does not use variants.
                {/if}
            </label>
        </div>

        {#if service.has_variants}
            <ServiceVariants bind:data={service.variants} />
        {/if}
    </section>

    <section class="fl-locations">
        <!-- <div class="toggle">
            <Toggle id="has-variants-{service.id}" bind:checked={service.has_variants} onclick={(e) => clickHasVariants(e)} />
            <label for="has-variants-{service.id}"
                class:inactive={service.has_variants !== true}
            >
                {#if service.has_variants === true}
                    This service has variants enabled.
                {:else}
                    This service does not use variants.
                {/if}
            </label>
        </div> -->

        <!-- {#if service.has_variants} -->
            <ServiceLocations bind:data={service.locations} />
        <!-- {/if} -->
    </section>

</div>

<style>
    .fl-service {
        color: var(--dark);
        display: flex;
        flex-direction: column;
        /* gap: 1rem; */
    }
    .fl-service > section {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    /* .fl-page-header {
        margin-bottom: 1rem;
    } */
    .fl-page-header {
        margin-top: 1rem;
    }
    .fl-page-header > h2 {
        color: var(--darkest);
        font-size: 1.75rem;
        gap: 0.5rem;
        font-weight: 500;
        /* margin-bottom: 1rem; */
    }
    .fl-page-header > textarea {
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        color: var(--dark);
        font-family: var(--font-default);
        font-size: 0.875rem;
        font-weight: 300;
        height: 4rem;
        outline: none;
        padding: 0.25rem 0.375rem;
        resize: none;
        width: 100%;
    }
    .fl-page-header > textarea:focus {
        border: 1px solid var(--primary);
        outline: 1px solid var(--primary);
        /* outline-offset: 1px; */
    }
    .fl-page-controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        /* margin-bottom: 1rem; */
    }
    .fl-service > section > .toggle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
    }
    .fl-service > section > .toggle > label {
        color: var(--dark);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 300;
    }
    .fl-service > section > .toggle > label.inactive {
        /* color: var(--semi-dark); */
        opacity: 0.6;
    }
    .fl-variants {
        display: flex;
        flex-direction: column;
    }
</style>
