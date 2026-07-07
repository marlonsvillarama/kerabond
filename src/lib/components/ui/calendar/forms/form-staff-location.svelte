<script>
    import { Check, Dot } from "@lucide/svelte";
    // import FormCheckbox from "./form-checkbox.svelte";
    import FormCheckboxPill from "./form-checkbox-pill.svelte";

    let {
        id = 0,
        label = 'Label'
    } = $props();

    let checked = $state(false);
</script>

<div data-location={id} class="fl-staff-loc"
    class:fl-staff-loc-selected={checked === true}
>
    <span>
        <input type="checkbox" name="staff-location-{id}" id="staff-location-{id}" bind:checked />
        {#if checked}
            <Check size={20} />
        {:else}
            <Dot size={20} />
        {/if}
        <label for="staff-location-{id}"
        >{label}</label>
    </span>
    <!-- <FormCheckboxPill id="fl-staff-loc-{id}" {label} /> -->

    {#if checked}
    <span>test</span>
    {/if}
</div>

<style>
    .fl-staff-loc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--lighter);
        border: 0;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        outline: none;
    }
    .fl-staff-loc > * {
        padding: 0 1rem;
    }
    .fl-staff-loc > :first-child {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        cursor: pointer;
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
    }
    .fl-staff-loc > :first-child > label {
        /* border: 1px solid red; */
        cursor: pointer;
        flex: 1;
        padding: 0.75rem 1rem;
        user-select: none;
    }
    .fl-staff-loc > :first-child > input[type=checkbox] {
        top: -9999px;
        left: -9999px;
        position: absolute;
    }
    /* .fl-staff-loc > *:hover {
        background-color: var(--primary-lighter);
    } */
    .fl-staff-loc-selected {
        background-color: var(--primary-lightest);
        outline: 2px solid var(--primary-light);
    }
</style>
