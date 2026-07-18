<script>
    import { setContext } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { MapPin } from "@lucide/svelte";
    import BreadCrumbs from "$lib/components/ui/bread-crumbs.svelte";
    import FieldText from "$lib/components/ui/form/field-text.svelte";
    import LocationHours from "./location-hours.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data
    } = $props();

    setContext('GLOBAL', data.global);

    const updateActive = () => {
        console.log(`*** updateActive id = ${data.location.id}`, data.location.is_active);
        // await supabase.from('kb_locations').update({ is_active: data.})
        // .eq('id', data.location.id);
    };

    const logSchedule = () => {
        console.log('*** logSchedule', data.location.schedule);
    };
</script>

<!-- {JSON.stringify(data)} -->

<div class="fl-location wrapper">
    <BreadCrumbs items={[
        { link: '/locations', text: 'Locations' },
        { link: `/locations/${data.location.id}`, text: data.location.name },
    ]} />
    <!-- <div class="breadcrumbs">crumbs</div> -->
    
    <section class="fl-page-header">
        <div class="name">
            <MapPin size={24} />
            <input type="text" class="name" value={data.location.name} />
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
                bind:value={data.location.street_1}
                errorMessage="Street Address - Line 1 is required."
            />
            <FieldText id="loc-street_2" label="Street Address - Line 2"
                bind:value={data.location.street_2}
            />
            <!-- <div class="split-row"> -->
            <FieldText id="loc-city" label="City"
                bind:value={data.location.city}
                width="15rem"
            />
            <FieldText id="loc-region" label="Region"
                bind:value={data.location.region}
                width="15rem"
            />
            <!-- </div> -->
        </div>

        <div class="settings">
            <div class="toggle">
                <Toggle id="active-{data.location.id}" bind:checked={data.location.is_active} ontoggle={updateActive} />
                <label for="active-{data.location.id}"
                    class:inactive={data.location.is_active !== true}
                >
                    {#if data.location.is_active === true}
                        This location is open for bookings.
                    {:else}
                        This location is not open.
                    {/if}
                </label>
            </div>
            <!-- <div class="fl-location-hours"> -->
                <LocationHours bind:data={data.location.schedule} onchange={logSchedule} />
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
