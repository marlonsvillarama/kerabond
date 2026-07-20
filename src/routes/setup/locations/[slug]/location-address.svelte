<script>
    import Card from "$lib/components/ui/card.svelte";
    import FieldText from "$lib/components/ui/form/field-text.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        location = $bindable(),
        onupdate
    } = $props();
</script>

<Card title="Address"
    subtitle="Update the branch address below."
>
    <!-- <div class="fl-address-toggle">
        <Toggle id="active-{location.id}" bind:checked={location.is_active} ontoggle={() => onupdate('is_active')} />
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
    <FieldText id="loc-street_1" label="Street Address - Line 1" required={true}
        bind:value={location.street_1}
        errorMessage="Street Address - Line 1 is required."
        width="80%"
        onblur={() => onupdate('street_1')}
    />
    <FieldText id="loc-street_2" label="Street Address - Line 2"
        bind:value={location.street_2}
        width="80%"
        onblur={() => onupdate('street_2')}
    />
    <FieldText id="loc-city" label="City"
        bind:value={location.city}
        width="15rem"
        onblur={() => onupdate('city')}
    />
    <FieldText id="loc-region" label="Region"
        bind:value={location.region}
        width="15rem"
        onblur={() => onupdate('region')}
    />
</Card>


<style>
    .fl-address-toggle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
    }
    .fl-address-toggle > label {
        color: var(--dark);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 300;
    }
    .fl-address-toggle > label.inactive {
        opacity: 0.6;
    }
</style>
