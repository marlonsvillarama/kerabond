<script>
    import { getContext } from "svelte";
    import { ChevronRight, CircleMinus, Dot, MapPin, Pencil, Plus, X } from "@lucide/svelte";
    import Badge from "$lib/components/ui/badge.svelte";
    import StaffChip from "./staff-chip.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data = $bindable(),
        index
    } = $props();
    // let { detail, staff } = data;

    let service = getContext('SERVICE');
    let allStaff = getContext('STAFF');
    let locationStaff = $derived.by(() => {
        let staff = [ ...new Set(service.locations.filter(d => d.location === data.id).map(d => d.staff)) ];
        console.log('staff set', staff);
        return allStaff.filter(d => staff.indexOf(d.id) >= 0);
        // allStaff.filter(d => service.locations.map(l => l.location).includes(d.id))
    });
    console.log(`staff for location = ${data.id}`, locationStaff);
</script>

{JSON.stringify(service)}
<!-- {JSON.stringify(locationStaff)} -->

<div class="fl-service-location">
    <div class="header">
        <div class="icon"><MapPin size={16} /></div>
        <!-- <ChevronRight class="icon" size={16} /> -->
        <!-- Location #{index} -->
        <!-- <Dot size={16} /> -->
        <div class="title">
            <span class="name">{data.name || data.street_1}</span>
            <span class="address">{data.street_1}</span>
        </div>
    </div>
    <div class="contents">
        <!-- <span class="title">Staff:</span> -->
        <div class="staff">
            <!-- <button type="button" class="btn-all">All</button> -->
            {#each locationStaff as item}
                <StaffChip label={item.first_name} />
            {/each}
            <!-- <button type="button" class="btn-new"><Plus size={16} /></button> -->
        </div>
    </div>
    <!-- <div class="details"> -->
    <div class="actions">
        <!-- <button type="button"><Pencil size={16} /></button> -->
        <button type="button"><X size={16} /></button>
    </div>
    <!-- </div> -->
</div>

<style>
    .fl-service-location {
        /* padding: 0.5rem 0.5rem; */
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        align-items: center;
        /* flex-direction: column; */
        gap: 0.25rem;
        padding: 1rem 0.75rem;
        border-radius: 0.25rem;
    }
    .fl-service-location:hover {
        outline: 2px solid var(--primary);
        /* background-color: var(--lighter); */
    }
    /* .fl-service-location > .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    } */
    /* .fl-service-location > .header > .title { */
    /* .fl-service-location > .header { */
        /* font-style: italic; */
        /* font-weight: 300; */
    /* } */
    /* .fl-service-location > .header > .title { */
    .fl-service-location > .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
    }
    .fl-service-location > .header > .icon {
        background-color: var(--light);
        border: 0;
        border-radius: 0.25rem;
        outline: none;
        height: 2rem;
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-service-location > .header > .title {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }
    .fl-service-location > .header > .title > .name {
        font-size: 1rem;
        font-weight: 600;
    }
    .fl-service-location > .header > .title > .address {
        font-weight: 400;
        opacity: 0.7;
    }
    /* .fl-service-location > .header > .title > .name { */
    /* .fl-service-location > .title > .name {
        font-weight: 300;
    } */
    .fl-service-location > .actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    /* .fl-service-location > .header > .details > .actions > button { */
    .fl-service-location > .actions > button {
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
        height: 2rem;
        width: 2rem;
    }
    /* .fl-service-location > .header > .details > .actions > button:hover { */
    .fl-service-location > .actions > button:hover {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-service-location > .contents {
        /* margin-left: 1rem; */
        display: flex;
        align-items: first baseline;
        gap: 0.5rem;
    }
    .fl-service-location > .contents > .title {
        font-size: 0.875rem;
        font-weight: 300;
        /* margin-bottom: 0.5rem; */
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
