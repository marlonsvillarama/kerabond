<script>
    import { ChevronRight, Clock, DollarSign, Dot, X } from "@lucide/svelte";
    // import ServiceLocation from "./service-location.svelte";

    let {
        data = $bindable(),
        index
    } = $props();
</script>

<div class="fl-service-variant">
    <!-- {JSON.stringify(data)} -->
    <!-- <div class="name"><ChevronRight class="icon" size={16} />{data.name || `${data.duration} minutes`}</div> -->
    <!-- <div class="header"> -->
    <div class="title">
        <ChevronRight class="icon" size={16} />
        Variant #{index}
        {#if data.name}
        <Dot size={16} /><span class="name">{data.name}</span>
        {/if}
    </div>
    <div class="details">
        <div class="field">
            <Clock size={16} />
            <input type="text" class="duration" inputmode="numeric" pattern="[0-9]*" bind:value={data.duration}>
            minutes
        </div>
        <div class="field">
            <DollarSign size={16} />
            <input type="text" class="price" inputmode="numeric" pattern="[0-9]*" bind:value={data.price}>
        </div>
        <div class="actions">
            <button type="button"><X size={16} /></button>
        </div>
    </div>
    <!-- </div> -->
</div>

<style>
    /* .fl-service-variant {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem 0;
    } */
    /* .fl-service-variant > .header { */
    .fl-service-variant {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.25rem 0.375rem;
    }
    .fl-service-variant:hover {
        border-radius: 0.25rem;
        outline: 2px solid var(--primary);
        /* background-color: var(--lighter); */
    }
    /* .fl-service-variant > .header > .title { */
    .fl-service-variant > .title {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
    }
    /* .fl-service-variant > .header > .title > .name { */
    .fl-service-variant > .title > .name {
        font-weight: 300;
    }
    /* :global(.fl-service-variant .icon) {
        background-color: var(--light);
    } */
    /* .fl-service-variant > .header > .details { */
    .fl-service-variant > .details {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        /* font-weight: 500; */
        gap: 3rem;
    }
    /* .fl-service-variant > .header > .details { */
    .fl-service-variant > .details {
        margin-left: 1rem;
        font-size: 0.875rem;
    }
    /* .fl-service-variant > .header > .details > .field { */
    .fl-service-variant > .details > .field {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--semi-dark);
        font-weight: 300;
    }
    /* .fl-service-variant > .header > .details > .field > input[type=text] { */
    .fl-service-variant > .details > .field > input[type=text] {
        background-color: var(--light);
        border: 0;
        /* border-bottom: 1px solid var(--semi-light); */
        text-align: center;
        font-weight: 600;
        padding: 0.25rem 0;
    }
    /* .fl-service-variant > .header > .details > .field > input[type=text].duration { */
    .fl-service-variant > .details > .field > input[type=text].duration {
        width: 2.5rem;
    }
    /* .fl-service-variant > .header > .details > .field > input[type=text].price { */
    .fl-service-variant > .details > .field > input[type=text].price {
        width: 3.5rem;
    }
    /* .fl-service-variant > .header > .details > .actions > button { */
    .fl-service-variant > .details > .actions > button {
        background-color: transparent;
        font-size: 0.75rem;
        color: var(--primary);
        cursor: pointer;
        border-radius: 0.25rem;
        border: 0;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
    }
    /* .fl-service-variant > .header > .details > .actions > button:hover { */
    .fl-service-variant > .details > .actions > button:hover {
        background-color: var(--primary);
        color: var(--white);
    }
    /* .fl-service-variant > .content {
        font-size: 0.875rem;
        margin-left: 1rem;
    } */
</style>
