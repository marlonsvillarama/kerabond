<script>
    import { Pencil, Trash } from "@lucide/svelte";
    let {
        data = $bindable()
    } = $props();
</script>

<div class="fl-service-variant">
    <div class="name">
        <span>{data.name || `${data.duration} minutes`}</span>
        <span>${data.price}</span>
    </div>
    <div class="controls">
        <button type="button"><Pencil size={16} /></button>
        <button type="button"><Trash size={16} /></button>
    </div>
</div>

<style>
    .fl-service-variant {
        font-size: 0.875rem;
        background-color: var(--white);
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        /* padding: 0.25rem; */
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .fl-service-variant > .name {
        padding: 0.25rem 0.375rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .fl-service-variant > .name > :first-child {
        font-weight: 600;
    }
</style>
