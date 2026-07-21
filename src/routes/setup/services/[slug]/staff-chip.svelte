<script>
    import { Check, Dot, MinusCircle, Plus, X } from "@lucide/svelte";

    let {
        label = 'Name',
        // selected = true
    } = $props();

    let selected = $state(true);
</script>

<span class="fl-staff-chip"
    // class:fl-staff-chip-selected={selected === true}
    // onclick={() => selected = !selected}
>
    {label}
    <!-- {#if selected}
    <Check size={16} />
    {:else}
    <Plus size={16} />
    {/if} -->
</span>

<style>
    .fl-staff-chip {
        background-color: var(--light);
        border: 0;
        border-radius: 0.25rem;
        /* cursor: pointer; */
        /* color: var(--dark); */
        font-size: 0.875rem;
        outline: 0;
        padding: 0.375rem 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    /* .fl-staff-chip:not(.fl-staff-chip-selected):hover {
        background-color: var(--border);
    } */
    /* .fl-staff-chip-selected {
        background-color: var(--primary);
        color: var(--white);
    } */
</style>
