<script>
    import { getContext, onMount, setContext } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { MapPin } from "@lucide/svelte";
    import BreadCrumbs from "$lib/components/ui/bread-crumbs.svelte";
    import Card from "$lib/components/ui/card.svelte";
    import FieldText from "$lib/components/ui/form/field-text.svelte";

    import LocationAddress from "./location-address.svelte";
    import LocationHours from "./location-hours.svelte";
    
    import Tabs from "$lib/components/ui/tabs/tabs.svelte";
    import TabsList from "$lib/components/ui/tabs/tabs-list.svelte";
    import TabsTrigger from "$lib/components/ui/tabs/tabs-trigger.svelte";
    import TabsContent from "$lib/components/ui/tabs/tabs-content.svelte";

    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data
    } = $props();

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
    };

    const logSchedule = () => {
        updateLocation('schedule')
    };
</script>

<!-- {JSON.stringify(location)} -->
<!-- <Toaster /> -->
<div class="fl-location wrapper">
    <BreadCrumbs items={[
        { link: '/locations', text: 'Branches' },
        { link: `/locations/${location.id}`, text: location.name },
    ]} />
    
    <section class="fl-page-header">
        <div class="name">
            <MapPin size={24} />
            <input type="text" class="name" bind:value={location.name} onblur={() => updateLocation('name')} />
        </div>
    </section>

    <Tabs orientation="vertical">
        <TabsList orientation="vertical">
            <TabsTrigger>Address</TabsTrigger>
            <TabsTrigger>Business Hours</TabsTrigger>
            <TabsTrigger>Staff</TabsTrigger>
            <TabsTrigger>Settings</TabsTrigger>
        </TabsList>
        <TabsContent>content</TabsContent>
    </Tabs>
    <!-- <div class="fl-sidebar-layout">
        <div class="sidebar"></div>
        <div class="content">
            content
        </div>
    </div> -->

    <section class="fl-location-details split-row">
        <!-- <div class="address">
            <div class="toggle">
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
            <FieldText id="loc-street_1" label="Street Address - Line 1" required={true}
                bind:value={location.street_1}
                errorMessage="Street Address - Line 1 is required."
                onblur={() => updateLocation('street_1')}
            />
            <FieldText id="loc-street_2" label="Street Address - Line 2"
                bind:value={location.street_2}
                onblur={() => updateLocation('street_2')}
            />
            <FieldText id="loc-city" label="City"
                bind:value={location.city}
                width="15rem"
                onblur={() => updateLocation('city')}
            />
            <FieldText id="loc-region" label="Region"
                bind:value={location.region}
                width="15rem"
                onblur={() => updateLocation('region')}
            />
        </div> -->
        <!-- <Card title="Address"
            subtitle="Update the branch address below."
            accent={true}
        >
            <div class="fl-address-toggle">
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
            <FieldText id="loc-street_1" label="Street Address - Line 1" required={true}
                bind:value={location.street_1}
                errorMessage="Street Address - Line 1 is required."
                onblur={() => updateLocation('street_1')}
            />
            <FieldText id="loc-street_2" label="Street Address - Line 2"
                bind:value={location.street_2}
                onblur={() => updateLocation('street_2')}
            />
            <FieldText id="loc-city" label="City"
                bind:value={location.city}
                width="15rem"
                onblur={() => updateLocation('city')}
            />
            <FieldText id="loc-region" label="Region"
                bind:value={location.region}
                width="15rem"
                onblur={() => updateLocation('region')}
            />
        </Card> -->

        <LocationAddress bind:location={location} onupdate={updateLocation} />
        <Card title="Business Hours"
            subtitle="Choose your business days and open hours."
        >
        <!-- <div class="settings"> -->
            <!-- <div class="toggle">
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
            </div> -->
            <!-- <div class="fl-location-hours"> -->
            <!-- {JSON.stringify(location.schedule)} -->
            <LocationHours bind:data={location.schedule} onchange={logSchedule} />
            <!-- </div> -->
        <!-- </div> -->
        </Card>
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
        /* width: calc(100% - 0.25rem); */
    }
    .fl-page-header > .name > input[type=text] {
        background-color: var(--white);
        border: 1px solid var(--semi-light);
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
        align-items: flex-start;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    /* .fl-location-details > .address {
        border: 1px solid var(--primary);
        border-left: 4px solid var(--primary);
        border-radius: 0.5rem;
        padding: 1.75rem 1.75rem 2rem;
        display: grid;
        gap: 2rem;
    } */
    /* .fl-location-details > .settings {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    } */
    .fl-sidebar-layout {
        display: flex;
        align-items: flex-start;
        gap: 4rem;
    }
    .fl-sidebar-layout > .sidebar {
        width: 15rem;
        border: 1px solid red;
    }
</style>
