<script>
    import { getContext, onMount, setContext } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { MapPin } from "@lucide/svelte";
    import BreadCrumbs from "$lib/components/ui/bread-crumbs.svelte";
    import FieldText from "$lib/components/ui/form/field-text.svelte";
    import LocationHours from "./location-hours.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data
    } = $props();

    // onMount(() => {
        //     location = data.location;
    setContext('GLOBAL', data.global);
    let location = $state(data.location);

    const updateLocation = async (key) => {
        console.log(`*** updateLocation id = ${location.id}`, location);
        const { error } = await supabase.from('kb_locations')
            .update({ [key]: location[key] })
            .eq('id', location.id);
        if (error) {
            console.error('updateActive', error);
        }
    };

    const logSchedule = () => {
        console.log('*** logSchedule', location.schedule);
        updateLocation('schedule')
    };
</script>

{JSON.stringify(location)}

<div class="fl-location wrapper">
    <BreadCrumbs items={[
        { link: '/locations', text: 'Locations' },
        { link: `/locations/${location.id}`, text: location.name },
    ]} />
    <!-- <div class="breadcrumbs">crumbs</div> -->
    
    <section class="fl-page-header">
        <div class="name">
            <MapPin size={24} />
            <input type="text" class="name" bind:value={location.name} onblur={() => updateLocation('name')} />
        </div>
        <!-- <textarea>{service.description}</textarea> -->
        <!-- <div class="toggle">
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
        </div> -->
    </section>

    <section class="fl-location-details split-row">
        <div class="address">
            <FieldText id="loc-street_1" label="Street Address - Line 1" required={true}
                bind:value={location.street_1}
                errorMessage="Street Address - Line 1 is required."
            />
            <FieldText id="loc-street_2" label="Street Address - Line 2"
                bind:value={location.street_2}
            />
            <!-- <div class="split-row"> -->
            <FieldText id="loc-city" label="City"
                bind:value={location.city}
                width="15rem"
            />
            <FieldText id="loc-region" label="Region"
                bind:value={location.region}
                width="15rem"
            />
            <!-- </div> -->
        </div>

        <div class="settings">
            <div class="toggle">
                <!-- <input type="checkbox" bind:checked={location.is_active} /> -->
                <Toggle id="active-{location.id}" bind:checked={location.is_active} ontoggle={() => updateLocation('is_active')} />
                <label for="active-{location.id}"
                    class:inactive={location.is_active !== true}
                >
                    {#if location.is_active === true}
                        This location is open for bookings.
                    {:else}
                        This location is not open.
                    {/if}
                </label>
            </div>
            <!-- <div class="fl-location-hours"> -->
                <LocationHours bind:data={location.schedule} onchange={logSchedule} />
            <!-- </div> -->
        </div>
    </section>

    <section class="fl-location-staff">
        staff
    </section>

    <section class="fl-location-staff">
        schedule
    </section>
</div>

<style>
    .fl-location {
        color: var(--dark);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .fl-location > section {
        /* margin-bottom: 1rem; */
        display: flex;
        flex-direction: column;
    }
    .fl-page-header > .name {
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        width: calc(100% - 0.25rem);
    }
    .fl-page-header > .name > input[type=text] {
        border: 1px solid transparent;
        border-radius: 0.25rem;
        color: var(--darkest);
        font-size: 1.5rem;
        gap: 0.5rem;
        font-weight: 500;
        padding: 0.25rem 0.375rem;
        flex: 1;
    }
    .fl-page-header > .name > input[type=text]:hover {
        border: 1px solid var(--light);
    }
    .fl-location > .fl-location-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        /* align-items: flex-start; */
        gap: 2rem;
        margin-bottom: 2rem;
    }
    .fl-location-details > .address {
        border: 1px solid var(--primary);
        border-left: 4px solid var(--primary);
        border-radius: 0.5rem;
        padding: 1.75rem 1.75rem 2rem;
        display: grid;
        gap: 2rem;
    }
    .fl-location-details > .settings {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* border: 1px solid red; */
        /* gap: 2rem; */
    }
    .fl-location-details > .settings > .toggle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
    }
    .fl-location-details > .settings > .toggle > label {
        color: var(--dark);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 300;
    }
    .fl-location-details > .settings > .toggle > label.inactive {
        /* color: var(--semi-dark); */
        opacity: 0.6;
    }
</style>
