<script>
    import { setContext } from "svelte";
    import { Scissors } from "@lucide/svelte";
    import BreadCrumbs from "$lib/components/ui/bread-crumbs.svelte";
    import Card from "$lib/components/ui/card.svelte";
    import ServiceLocations from "./service-locations.svelte";
    import ServiceVariants from "./service-variants.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data
    } = $props();
    let service = $state(data.service);
    setContext('SERVICE', data.service);
    setContext('LOCATIONS', data.locations);
    setContext('STAFF', data.staff);

    const clickActive = (e) => {
        if (service.is_active === true && confirm('Are you sure you want to inactivate this service?') === false) {
            e.preventDefault();
        }
    };

    const clickOnline = (e) => {
        if (service.is_online === true && confirm('Are you sure you want to take this service offline?') === false) {
            e.preventDefault();
        }
    };

    const clickHasVariants = (e) => {
        if (service.has_variants === true && confirm('Are you sure you want to inactivate all variants for this service?') === false) {
            e.preventDefault();
        }
    }

    let revenue = $derived.by(() => {
        if (service.revenue_total > 1000000) {
            return `$${(service.revenue_total / 1000000).toFixed(1)}M`
        }
        else if (service.revenue_total > 1000) {
            return `$${(service.revenue_total / 1000).toFixed(1)}K`
        }
        else {
            return `$${service.revenue_total.toFixed(0)}`
        }
    });
</script>

<!-- {JSON.stringify(data)} -->

<div class="fl-service wrapper">
    <BreadCrumbs items={[
        { link: '/services', text: 'Services' },
        { link: `/services/${service.id}`, text: service.name },
    ]} />
    
    <section class="fl-page-header">
        <div class="name">
            <Scissors size={24} />
            <input type="text" class="name" value={service.name} />
        </div>
        <textarea>{service.description}</textarea>
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

    <section class="fl-summary">
        <div class="kpi">
            <span class="title">Total Revenue Generated</span>
            <div class="value">{revenue}</div>
            <span class="detail">Down 10% from last month</span>
        </div>
        <div class="kpi">
            <span class="title">Average Rating</span>
            <div class="value">{service.rating_ave}</div>
            <span class="detail">From {service.review_count} customer reviews</span>
        </div>
        <div class="kpi">
            <span class="title">Average Rating</span>
            <div class="value">{service.rating_ave}</div>
            <span class="detail">From {service.review_count} customer reviews</span>
        </div>
    </section>

    <section class="fl-settings mb">
        <div class="toggle">
            <Toggle id="online-{service.id}" bind:checked={service.is_online} onclick={(e) => clickOnline(e)} />
            <label for="online-{service.id}"
                class:inactive={service.is_online !== true}
            >
                {#if service.is_online === true}
                    This service can be booked online.
                {:else}
                    This service is not bookable online.
                {/if}
            </label>
        </div>
    </section>
    <!-- <section class="fl-page-controls">
    </section> -->

    <Card>
    <!-- <section class="fl-variants mb"> -->
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
            <ServiceVariants bind:data={service.variants} />
        <!-- {/if} -->
    <!-- </section> -->
    </Card>

    <section class="fl-locations mb">
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
        gap: 1rem;
    }
    .fl-service > section {
        /* margin-bottom: 1rem; */
        display: flex;
        flex-direction: column;
    }
    .fl-service > section.mb {
        margin-bottom: 2rem;
    }
    /* .fl-page-header {
        margin-bottom: 1rem;
    } */
    /* .fl-page-header {
        margin-top: 1.25rem;
    } */
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
    .fl-page-header > .name > input[type=text]:focus {
        border: 1px solid var(--primary);
        outline: 1px solid var(--primary);
        /* outline-offset: 1px; */
    }
    .fl-page-header > textarea {
        background-color: var(--white);
        border: 1px solid var(--semi-light);
        border-radius: 0.25rem;
        color: var(--darker);
        font-family: var(--font-default);
        font-size: 0.875rem;
        font-weight: 300;
        height: 4rem;
        outline: none;
        padding: 0.375rem 0.5rem;
        resize: none;
        /* width: calc(100% - 0.25rem); */
    }
    .fl-page-header > textarea:focus {
        border: 1px solid var(--primary);
        outline: 1px solid var(--primary);
        /* outline-offset: 1px; */
    }
    section.fl-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin: 1rem 0;
    }
    section.fl-summary > .kpi {
        padding: 1rem;
        background-color: var(--white);
        border: 1px solid var(--light);
        border-left: 4px solid var(--primary);
        border-radius: 0.5rem;
        text-align: center;
        /* box-shadow: var(--shadow); */
        /* display: grid;
        grid-template-columns: 35% 65%; */
    }
    section.fl-summary > .kpi > .title {
        color: var(--dark);
        opacity: 0.8;
    }
    section.fl-summary > .kpi > .value {
        color: var(--darkest);
        font-size: 3rem;
        font-weight: bold;
        margin: 0.5rem 0;
    }
    section.fl-summary > .kpi > .detail {
        /* color: var(--dark); */
        font-size: 0.875rem;
        font-weight: 300;
        opacity: 0.6;
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
