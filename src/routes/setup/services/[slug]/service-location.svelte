<script>
    import { getContext } from "svelte";
    import { ChevronRight, CircleMinus, Dot, X } from "@lucide/svelte";
    import StaffChip from "./staff-chip.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data = $bindable(),
        index
    } = $props();
    // let { detail, staff } = data;

    let service = getContext('SERVICE');
    let allStaff = getContext('STAFF');
    // console.log('allStaff', allStaff);
    // let serviceLocations = $state(data.locations)
    let locationStaff = $derived.by(() => {
        let staff = [ ...new Set(service.locations.filter(d => d.location === data.id).map(d => d.staff)) ];
        console.log('staff set', staff);
        return allStaff.filter(d => staff.indexOf(d.id) >= 0);
        // allStaff.filter(d => service.locations.map(l => l.location).includes(d.id))
    });
    console.log(`staff for location = ${data.id}`, locationStaff);
</script>

<!-- {JSON.stringify(service)} -->
<!-- {JSON.stringify(locationStaff)} -->

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
            <button type="button" class="btn-all">Select all</button>
            {#each locationStaff as item}
                <StaffChip label={item.first_name} />
            {/each}
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
        display: flex;
        align-items: first baseline;
        gap: 1rem;
    }
    .fl-service-location > .contents > .title {
        font-size: 0.875rem;
        font-weight: 300;
        margin-bottom: 0.5rem;
        opacity: 0.8;
    }
    .fl-service-location > .contents > .staff {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    .fl-service-location > .contents > .staff > .btn-all {
        background-color: transparent;
        border: 0;
        outline: 0;
        cursor: pointer;
        color: var(--primary);
        text-decoration: underline;
    }
</style>
