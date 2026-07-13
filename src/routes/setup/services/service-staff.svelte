<script>
    import { Pencil, X } from "@lucide/svelte";
    let {
        data = $bindable()
    } = $props();
</script>

<div class="fl-service-variant">
    <div class="name">
        <span>{data.staff.first_name}</span>
        <!-- <span>${data.price}</span> -->
    </div>
    <div class="controls">
        <!-- <button type="button" command="show-popover" commandfor="fl-dlg-variant">
            <Pencil size={16} />
        </button> -->
        <button type="button"><X size={16} /></button>
    </div>
</div>

<div id="fl-dlg-variant" popover>
    {data.id} {data.duration}
</div>

<style>
    .fl-service-variant {
        font-size: 0.875rem;
        /* background-color: var(--white); */
        /* border: 1px solid var(--light); */
        /* border-radius: 0.25rem; */
        /* padding: 0.25rem; */
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.25rem;
        border-bottom: 1px solid var(--lighter);
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
    .fl-service-variant > .controls {
        display: flex;
        gap: 0.25rem;
    }
    .fl-service-variant > .controls > button {
        background-color: transparent;
        border: 0;
        /* border: 1px solid var(--lighter); */
        border-radius: 0.25rem;
        color: var(--semi-dark);
        cursor: pointer;
        outline: none;
        height: 1.75rem;
        width: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fl-service-variant > .controls > button:hover {
        background-color: var(--primary-lighter);
    }
</style>
