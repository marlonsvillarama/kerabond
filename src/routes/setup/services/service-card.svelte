<script>
    import { getContext } from "svelte";
    import { Pencil, Plus, Trash } from "@lucide/svelte";
    import ServiceVariant from "./service-variant.svelte";

    let {
        data = $bindable(),
        onedit,
        ondelete,
        onselect,
    } = $props();

    let allVariants = getContext('VARIANTS');
    let serviceVariants = $state(allVariants.filter(d => d.service === d.id));
    console.log('serviceVariants', serviceVariants);
    const toggleActive = async () => {
        console.log(`toggle row ${data.id}`, data.is_active);
        const { data, error } = await supabase.from('kb_services').update({ is_active: data.is_active }).eq('id', data.id).select();
        if (error) {
            console.error(error);
        }
    }
</script>

<div class="fl-service-card">
    <div class="service-img"></div>
    <div class="service-details">
        <div class="card-title">{data.name}</div>
        <div class="card-details">
            <div class="primary">
                <div class="controls">
                    <!-- <div class="title">&nbsp;</div> -->
                    <!-- controls -->
                    <button type="button"><Pencil size={20} />Edit</button>
                    <button type="button"><Trash size={20} />Delete</button>
                </div>
                <p class="desc">{data.description}</p>
                <div class="variants">
                    <div class="section-title">
                        <span>Variants</span>
                        <!-- <span class="section-header small">Variants</span> -->
                        <div class="section-actions">
                            <button type="button">Add variant</button>
                        </div>
                    </div>
                    {#each serviceVariants as _, i}
                        <ServiceVariant bind:data={serviceVariants[i]} />
                    {/each}
                </div>
            </div>
            <div class="secondary">
                <div class="staff">
                    staff
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .fl-service-card {
        background-color: var(--lighter);
        border: 1px solid var(--light);
        border-radius: 0.5rem;
        /* padding: 1.5rem 1.5rem; */
        outline: none;
        display: grid;
        grid-template-columns: 12rem auto;
        /* gap: 1.5rem; */
        margin: 0.25rem;
        /* width: min(50rem, 100%); */
        min-width: 23rem;
        position: relative;
    }
    .fl-service-card > .service-img {
        background-image: url('/images/spa-concept-001.jpg');
        background-size: cover;
        background-position: left;
        min-height: 12rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }
    .fl-service-card > .service-details {
        padding: 1rem 1.25rem;
        position: relative;
    }
    .service-details > .card-title {
        font-size: 1.375rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    .service-details > .card-details {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 1.5rem;
    }
    .card-details > .primary {
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        /* gap: 1rem; */
    }
    .primary > .controls {
    /* .service-details > .controls { */
        /* border: 1px solid red; */
        /* position: absolute;
        top: 0;
        right: 0; */
        display: flex;
        align-items: center;
        /* gap: 1px; */
        gap: 0.25rem;
        margin-bottom: 1rem;
    }
    .primary > .controls > button {
    /* .service-details > .controls > button { */
        /* background-color: transparent; */
        background-color: var(--primary-lighter);
        border: 0;
        border-radius: 0.25rem;
        /* border-bottom: 1px solid transparent; */
        color: var(--primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.5rem;
    }
    /* .service-details > .controls > button:last-child {
        border-top-right-radius: 0.5rem;
    } */
    .primary > .controls > button:hover {
    /* .service-details > .controls > button:hover { */
        background-color: var(--primary-light);
        /* border-bottom: 1px solid var(--primary); */
    }
    .primary > .desc {
        color: var(--semi-dark);
        font-size: 0.875rem;
        line-height: 1.375rem;
        font-weight: 400;
        opacity: 0.8;
        margin-bottom: 1rem;
    }
    /* .fl-service-card > .service-details > * {
        border: 1px solid red;
    } */
    .card-details .section-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        /* justify-content: space-between; */
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
    }
    .section-actions > button {
        background-color: var(--primary);
        border: 0;
        border-radius: 0.25rem;
        color: var(--white);
        cursor: pointer;
        font-size: 0.75rem;
        outline: none;
        padding: 0.25rem 0.625rem;
    }
    /* .section-header.small {
        font-size: 1rem;
    } */
    /* .section-actions {} */
    /* .fl-service-card > .service-details .desc {
        color: var(--semi-dark);
        font-size: 0.875rem;
        line-height: 1.375rem;
        font-weight: 400;
        opacity: 0.8;
    } */
</style>
