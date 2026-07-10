<script>
    import { getContext } from "svelte";
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
        <div>
        <div class="primary">
            <div class="title">{data.name}</div>
            <p class="desc">{data.description}</p>
        </div>
        <div class="controls">
            <!-- <div class="title">&nbsp;</div> -->
            controls
        </div>
        </div>

        <div>
        <div class="variants">
            <div class="title">&nbsp;</div>
            <div class="section-title title">
                <span class="section-header small">Variants</span>
                <div class="section-actions">
                    <button type="button">Delete</button>
                </div>
            </div>
            {#each serviceVariants as _, i}
                <ServiceVariant bind:data={serviceVariants[i]} />
            {/each}
        </div>
        <div class="staff">
            <div class="title">&nbsp;</div>
            staff
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
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 1.5rem;
    }
    /* .fl-service-card > .service-details > * {
        border: 1px solid red;
    } */
    .section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .section-title.title {
        font-size: 1.375rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    .section-header.small {
        font-size: 1rem;
    }
    .section-actions {}
    .fl-service-card > .service-details .desc {
        color: var(--semi-dark);
        font-size: 0.875rem;
        line-height: 1.375rem;
        font-weight: 400;
        opacity: 0.8;
    }
</style>
