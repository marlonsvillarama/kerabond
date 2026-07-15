<script>
    import { MinusCircle, X } from "@lucide/svelte";

    let {
        label = 'Name'
    } = $props();
</script>

<button class="fl-staff-chip">{label}<X size={16} /></button>

<style>
    .fl-staff-chip {
        background-color: var(--lighter);
        border: 0;
        border-radius: 0.25rem;
        cursor: pointer;
        /* color: var(--dark); */
        font-size: 0.875rem;
        outline: 0;
        padding: 0.25rem 0.375rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .fl-staff-chip:hover {
        background-color: var(--light);
    }
</style>
