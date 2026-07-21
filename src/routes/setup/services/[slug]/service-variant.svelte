<script>
    import { getToastState } from "$lib/components/ui/toaster/toaster-state.svelte";
    import { ChevronRight, Clock, DollarSign, Dot, Pencil, X } from "@lucide/svelte";
    import FieldText from "$lib/components/ui/form/field-text.svelte";
    // import ServiceLocation from "./service-location.svelte";

    let {
        data = $bindable(),
        index,
        ondelete,
        onupdate
    } = $props();
    const toastState = getToastState();

    let isDirty = $state(false);
    const updateDirty = () => {};

    const updateVariant = (key) => {
        let fieldMap = {
            duration: 'Duration',
            name: 'Name',
            price: 'Price'
        };
        if (!data[key]) {
            toastState.add(`${fieldMap[key]} required.`, `You need to enter a ${key} for this variant.`);
            return;
        }

        if (isDirty === false) { return; }

        isDirty = false;
        onupdate(data.id, [key]);
    };
</script>

<div class="fl-service-variant" data-service-id={data.id}>
    <!-- {JSON.stringify(data)} -->
    <!-- <div class="name"><ChevronRight class="icon" size={16} />{data.name || `${data.duration} minutes`}</div> -->
    <!-- <div class="header"> -->
    <div class="title">
        <div class="icon"><ChevronRight size={16} /></div>
        <!-- Variant #{index} -->
        <!-- {#if data.name} -->
        <!-- <Dot size={16} /> -->
        <FieldText width="15rem"
            bind:value={data.name}
            onchange={() => isDirty = true}
            onblur={() => updateVariant('name')}
        />
        <!-- <input type="text" class="name" bind:value={data.name}
            onchange={() => isDirty = true}
            onblur={() => updateVariant('name')}
        /> -->
        <!-- {/if} -->
    </div>
    <div class="details">
        <div class="field">
            <Clock size={16} />
            <FieldText width="3.5rem" align="center"
                bind:value={data.duration}
                onchange={() => isDirty = true}
                onblur={() => updateVariant('duration')}
            /> minutes
            <!-- <input type="text" class="duration" inputmode="numeric" pattern="[0-9]*"
                bind:value={data.duration}
                onchange={() => isDirty = true}
                onblur={() => updateVariant('duration')}
            > -->
        </div>
        <div class="field">
            <DollarSign size={16} />
            <FieldText width="3.5rem" align="center"
                bind:value={data.price}
                onchange={() => isDirty = true}
                onblur={() => updateVariant('price')}
            />
            <!-- <input type="text" class="price" inputmode="numeric" pattern="[0-9]*"
                bind:value={data.price}
                onchange={() => isDirty = true}
                onblur={() => updateVariant('price')}
            > -->
        </div>
    </div>
    <div class="actions">
        <!-- <button type="button"><Pencil size={16} /></button> -->
        <button type="button" onclick={ondelete}><X size={16} /></button>
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
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: space-between; */
        /* padding: 0 0.5rem; */
        padding: 1rem 0.75rem;
        border-radius: 0.25rem;
    }
    .fl-service-variant:hover {
        outline: 2px solid var(--primary);
    }
    /* .fl-service-variant:hover { */
        /* background-color: var(--primary-lightest); */
        /* border-radius: 0.25rem;
        outline: 2px solid var(--primary); */
        /* background-color: var(--lighter); */
    /* } */
    /* .fl-service-variant > .header > .title { */
    .fl-service-variant > .title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
    }
    .fl-service-variant > .title > .icon {
        /* background-color: var(--light); */
        border: 0;
        border-radius: 0.25rem;
        outline: none;
        height: 2rem;
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* .fl-service-variant > .title > input[type=text] {
        background-color: var(--white);
        border: 1px solid var(--semi-light);
        border-radius: 0.25rem;
        color: var(--darker);
        padding: 0.5rem;
        width: 15rem;
    } */
    /* .fl-service-variant > .title > input[type=text]:focus {
        border-color: var(--primary);
        outline: 1px solid var(--primary);
    } */
    /* .fl-service-variant > .header > .title > .name { */
    /* .fl-service-variant > .title > .name {
        font-weight: 300;
    } */
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
        gap: 0.375rem;
        color: var(--semi-dark);
        font-weight: 300;
    }
    /* .fl-service-variant > .header > .details > .field > input[type=text] { */
    /* .fl-service-variant > .details > .field > input[type=text] {
        border: 1px solid var(--semi-light);
        border-radius: 0.25rem;
        text-align: center;
        font-weight: 600;
        padding: 0.5rem 0;
    } */
    /* .fl-service-variant > .header > .details > .field > input[type=text].duration { */
    /* .fl-service-variant > .details > .field > input[type=text].duration {
        width: 3rem;
    } */
    /* .fl-service-variant > .header > .details > .field > input[type=text].price { */
    /* .fl-service-variant > .details > .field > input[type=text].price {
        width: 3.5rem;
    } */
    /* .fl-service-variant > .details > .field > input[type=text]:focus { */
    /* .fl-service-variant > .details > .field > input[type=text].duration:focus,
    .fl-service-variant > .details > .field > input[type=text].price:focus { */
        /* border-color: var(--primary);
        outline: 1px solid var(--primary);
    } */
    /* .fl-service-variant > .details > .actions { */
    .fl-service-variant > .actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    /* .fl-service-variant > .details > .actions > button { */
    .fl-service-variant > .actions > button {
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
        height: 2rem;
        width: 2rem;
    }
    /* .fl-service-variant > .details > .actions > button:hover { */
    .fl-service-variant > .actions > button:hover {
        background-color: var(--primary);
        color: var(--white);
    }
    /* .fl-service-variant > .content {
        font-size: 0.875rem;
        margin-left: 1rem;
    } */
</style>
