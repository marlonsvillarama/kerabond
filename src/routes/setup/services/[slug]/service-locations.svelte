<script>
    import { getContext } from "svelte";
    import { Plus, PlusCircle, CircleX, CircleMinus } from "@lucide/svelte";
    import ServiceLocation from "./service-location.svelte";
    // import ServiceVariant from "./service-variant.svelte";

    let {
        data = $bindable()
    } = $props();

    const allLocations = getContext('LOCATIONS');
    // console.log('allLocations', allLocations);
    let uniqueLocations = [ ...(new Set(data.map(d => d.location))) ];
    // console.log('uniqueLocations', uniqueLocations);
    let serviceLocations = $derived(allLocations.filter(d => uniqueLocations.includes(d.id)));
    // console.log('serviceLocations', serviceLocations);
</script>

<div class="fl-service-locations">
    <!-- {JSON.stringify(data)} -->
    <div class="header">
        <span class="title">Locations</span>
        <span class="badge">{serviceLocations.length}</span>
        <button type="button" class="btn-add"><Plus size={10} />Assign to location</button>
    </div>

    <div class="content">
    {#each serviceLocations as _, i}
        <ServiceLocation index={i+1} bind:data={serviceLocations[i]} />
    {/each}
    </div>
</div>

<style>
    /* .fl-service-locations {
        margin-top: 1rem;
    } */
    .fl-service-locations > .header {
        /* border: 1px solid */
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
    }
    /* .fl-service-locations > .header > .icon {
        background-color: var(--light);
        border: 0;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
    } */
    .fl-service-locations > .header > .title {
        color: var(--darker);
        font-weight: 500;
    }
    .fl-service-locations > .header > .badge {
        background-color: var(--semi-light);
        border-radius: 50%;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.375rem;
        width: 1.375rem;
    }
    .fl-service-locations > .header > button {
        background-color: var(--primary);
        font-size: 0.75rem;
        color: var(--white);
        cursor: pointer;
        border: 0;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.375rem;
        /* width: 1.25rem; */
        padding: 0 0.5rem;
    }
    .fl-service-locations > .content {
        margin: 0 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        /* border: 1px solid red; */
    }
    /* :global(.fl-service-locations > .content > *:hover) {
        background-color: var(--lighter);
    } */
    /* :global(.fl-service-locations > .content > *:not(:last-child)) {
        border-bottom: 1px solid var(--lighter);
        margin-bottom: 0.5rem;
    } */
</style>
