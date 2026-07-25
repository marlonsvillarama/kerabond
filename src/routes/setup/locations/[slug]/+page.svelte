<script>
    import { getContext, onMount, setContext } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { MapPin } from "@lucide/svelte";
    import { getToastState } from "$lib/components/ui/toaster/toaster-state.svelte";
    import BreadCrumbs from "$lib/components/ui/bread-crumbs.svelte";
    import Card from "$lib/components/ui/card.svelte";
    import FieldText from "$lib/components/ui/form/field-text.svelte";

    import LocationAddress from "./location-address.svelte";
    import LocationHours from "./location-hours.svelte";
    import LocationStaff from "./location-staff.svelte";

    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data
    } = $props();
    const toastState = getToastState();

    setContext('GLOBAL', data.global);
    let location = $state(data.location);

    const updateLocation = async (key) => {
        const { error } = await supabase.from('kb_locations')
            .update({ [key]: location[key] })
            .eq('id', location.id);
        if (error) {
            console.error('updateActive', error);
            // toast.error('An error has occurred. Please try again.');
            return;
        }

        toastState.add('Update successful', `${key} successfully updated!`);
    };

    const logSchedule = () => {
        updateLocation('schedule')
    };
</script>

<svelte:head>
    <title>Edit Branch - {location.name}</title>
</svelte:head>

<div class="fl-location wrapper">

    <BreadCrumbs items={[
        { link: '/setup', text: 'Setup' },
        { link: '/setup/locations', text: 'Branches' },
        { link: `/setup/locations/${location.id}`, text: location.name },
    ]} />
    
    <section class="fl-page-header">
        <div class="name">
            <MapPin size={24} />
            <input type="text" class="name" bind:value={location.name} onblur={() => updateLocation('name')} />
        </div>
    </section>

    <div class="fl-page-details">
        <section class="fl-location-details split-row">
            <Card title="Branch Settings"
                subtitle="Update your branch settings below."
            >
                <!-- <div class="fl-toggle"> -->
                <Toggle id="active-{location.id}" label="This location is open for bookings."
                    bind:checked={location.is_active}
                    ontoggle={() => updateLocation('is_active')}
                />
                    <!-- <label for="active-{location.id}"
                        class:inactive={location.is_active !== true}
                    > -->
                        <!-- This location is open for bookings. -->
                        <!-- {#if location.is_active === true}
                        {:else}
                            This location is not open.
                        {/if} -->
                    <!-- </label> -->
                <!-- </div> -->
                <!-- <div class="fl-toggle"> -->
                <Toggle id="primary-{location.is_primary}" label="This is your primary branch."
                    bind:checked={location.is_primary}
                    ontoggle={() => updateLocation('is_primary')}
                />
                    <!-- <label for="primary-{location.id}"
                        class:inactive={location.is_primary !== true}
                    > -->
                        <!-- This is your primary location. -->
                        <!-- {#if location.is_primary === true}
                        {:else}
                            NOT your primary location.
                        {/if} -->
                    <!-- </label> -->
                <!-- </div> -->
                <FieldText id="loc-ird" label="IRD"
                    bind:value={location.ird}
                    width="10rem"
                    onblur={() => onupdate('ird')}
                />
            </Card>

            <LocationAddress bind:location={location} onupdate={updateLocation} />
        </section>

        <Card title="Business Hours"
            subtitle="Choose your business days and open hours."
        >
            <LocationHours bind:data={location.schedule} onupdate={updateLocation} />
        </Card>

        <LocationStaff items={location.staff.map(d => { return { ...d.details, selected: true }})} {location} />
    </div>
</div>

<style>
    .fl-location {
        color: var(--dark);
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .fl-location > section {
        display: flex;
        flex-direction: column;
    }
    .fl-page-header {
        margin: 1.5rem 0;
    }
    .fl-page-header > .name {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .fl-page-header > .name > input[type=text] {
        background-color: var(--white);
        border: 1px solid var(--semi-light);
        border-radius: 0.25rem;
        color: var(--darkest);
        font-size: 1.5rem;
        gap: 0.5rem;
        font-weight: 500;
        padding: 0.375rem 0.75rem;
        flex: 1;
    }
    .fl-page-header > .name > input[type=text]:hover {
        border: 1px solid var(--light);
    }
    .fl-page-details {
        display: grid;
        gap: 1.5rem;
    }
    .fl-page-details > .fl-location-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: flex-start;
        gap: 1.5rem;
    }
    .fl-toggle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border: 1px solid red;
    }
    .fl-toggle > label {
        font-size: 0.875rem;
    }
</style>
