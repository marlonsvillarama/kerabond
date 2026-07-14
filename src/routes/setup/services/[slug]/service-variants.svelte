<script>
    import { Plus } from "@lucide/svelte";
    import ServiceVariant from "./service-variant.svelte";

    let {
        data = $bindable()
    } = $props();
</script>

<div class="fl-service-variants">
    <!-- {JSON.stringify(data)} -->
    <div class="header">
        <span class="title">Variants</span>
        <span class="badge">{data.length}</span>
        <button type="button" class="btn-add"><Plus size={10} />Add variant</button>
    </div>

    <div class="content">
    {#each data as _, i}
        <ServiceVariant index={i+1} bind:data={data[i]} />
    {/each}
    </div>
</div>

<style>
    .fl-service-variants {
        margin-top: 1rem;
    }
    .fl-service-variants > .header {
        /* border: 1px solid */
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
    }
    /* .fl-service-variants > .header > .icon {
        background-color: var(--light);
        border: 0;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
    } */
    .fl-service-variants > .header > .title {
        color: var(--darker);
        font-weight: 500;
    }
    .fl-service-variants > .header > .badge {
        background-color: var(--semi-light);
        border-radius: 50%;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.375rem;
        width: 1.375rem;
    }
    .fl-service-variants > .header > button {
        background-color: var(--primary);
        font-size: 0.75rem;
        color: var(--white);
        cursor: pointer;
        border: 0;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.375rem;
        /* width: 1.25rem; */
        padding: 0 0.5rem;
    }
    .fl-service-variants > .content {
        margin: 0 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        /* border: 1px solid red; */
    }
    /* :global(.fl-service-variants > .content > *:hover) {
        background-color: var(--lighter);
    } */
    /* :global(.fl-service-variants > .content > *:not(:last-child)) {
        border-bottom: 1px solid var(--lighter);
        margin-bottom: 0.5rem;
    } */
</style>
