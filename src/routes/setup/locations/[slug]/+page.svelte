<script>
    import { setContext } from "svelte";
    import { MapPin } from "@lucide/svelte";


    let {
        data
    } = $props();
</script>

<!-- {JSON.stringify(data)} -->

<div class="fl-location wrapper">
    <div class="breadcrumbs">crumbs</div>
    
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

    <section class="fl-location-address">
        address
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
        gap: 2rem;
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
</style>
