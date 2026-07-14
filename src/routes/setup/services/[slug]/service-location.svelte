<script>
    import { getContext } from "svelte";
    import { ChevronRight, CircleMinus, Dot, X } from "@lucide/svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data = $bindable(),
        index
    } = $props();
    // let { detail, staff } = data;

    let service = getContext('SERVICE');
    let allStaff = getContext('STAFF');
    // let serviceLocations = $state(data.locations)
    let locationStaff = $derived(
        allStaff.filter(d => service.locations.map(l => l.staff)).includes(d.id)
    );
    console.log('locationStaff', locationStaff);
</script>

{JSON.stringify(data)}

<div class="fl-service-location">
    <div class="header">
        <div class="title">
            <ChevronRight class="icon" size={16} />
            Location #{index}
            <Dot size={16} /><span class="name">{data.name || data.street_1}</span>
        </div>
        <div class="details">
            <div class="actions">
                <button type="button"><X size={16} /></button>
            </div>
        </div>
    </div>
    <div class="contents">
        <span class="title">Assigned:</span>
        <div class="staff">
        </div>
    </div>
</div>

<style>
    .fl-service-location {
        padding: 0.25rem 0.375rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .fl-service-location:hover {
        border-radius: 0.25rem;
        outline: 2px solid var(--primary);
        /* background-color: var(--lighter); */
    }
    .fl-service-location > .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .fl-service-location > .header > .title {
        /* font-style: italic; */
        font-weight: 300;
    }
    .fl-service-location > .header > .title {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
    }
    .fl-service-location > .header > .title > .name {
        font-weight: 300;
    }
    .fl-service-location > .header > .details > .actions > button {
        background-color: transparent;
        font-size: 0.75rem;
        color: var(--primary);
        cursor: pointer;
        border-radius: 0.25rem;
        border: 0;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
    }
    /* .fl-service-variant > .header > .details > .actions > button:hover { */
    .fl-service-location > .header > .details > .actions > button:hover {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-service-location > .contents {
        margin-left: 1rem;
    }
    .fl-service-location > .contents > .title {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
    }
</style>
