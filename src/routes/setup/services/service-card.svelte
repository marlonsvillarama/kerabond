<script>
    import { getContext } from "svelte";
    import { IdCard, Pencil, Plus, Scissors, Trash } from "@lucide/svelte";
    import ServiceStaff from "./service-staff.svelte";
    import ServiceVariant from "./service-variant.svelte";

    let {
        data = $bindable(),
        onedit,
        ondelete,
        onselect,
    } = $props();

    let allVariants = getContext('VARIANTS');
    let serviceVariants = $derived(allVariants.filter(d => d.service === data.id));

    let allStaff = getContext('STAFF');
    console.log('allStaff', allStaff);
    let allStaffServices = getContext('STAFF_SERVICES')
    let staffServices = $derived.by(() => {
        return allStaffServices.filter(d => d.service === data.id)
            .map(d => {
                return {
                    ...d,
                    staff: allStaff.find(s => s.id === d.staff)
                }
            });
    });
    console.log('staffServices', staffServices);
    
    const toggleActive = async () => {
        const { data, error } = await supabase.from('kb_services').update({ is_active: data.is_active }).eq('id', data.id).select();
        if (error) {
            console.error(error);
        }
    }
</script>

<div class="fl-service-card">
    <!-- <div class="service-img"></div> -->
    <!-- <div class="service-details"> -->
        <input type="text" class="card-title" value={data.name} />
        <div class="card-details">
            <div class="primary">
                <!-- <div class="controls"> -->
                    <!-- <div class="title">&nbsp;</div> -->
                    <!-- controls -->
                    <!-- <button type="button"><Pencil size={20} />Edit</button> -->
                    <!-- <button type="button"><Trash size={20} />Delete</button> -->
                <!-- </div> -->
                <textarea class="desc">{data.description}</textarea>
                <div class="service-details">
                    <div class="variants">
                        <div class="section-title">
                            <span>Variants</span>
                            <!-- <span class="section-header small">Variants</span> -->
                            <div class="section-actions">
                                <button type="button">Add variant</button>
                            </div>
                        </div>
                        {#if serviceVariants.length > 0}
                            <div>
                                {#each serviceVariants as _, i}
                                    <ServiceVariant bind:data={serviceVariants[i]} />
                                {/each}
                            </div>
                        {:else}
                            <div class="empty">
                                <Scissors size={20} />
                                <span>No variants yet for this service.</span>
                            </div>
                        {/if}
                    </div>
                <!-- </div> -->
                    <div class="staff">
                        <div class="section-title">
                            <span>Staff</span>
                            <!-- <span class="section-header small">Variants</span> -->
                            <div class="section-actions">
                                <button type="button">Assign staff</button>
                            </div>
                        </div>
                        {#if staffServices.length > 0}
                        {#each staffServices as _, i}
                            <ServiceStaff bind:data={staffServices[i]} />
                        {/each}
                        {:else}
                            <div class="empty">
                                <IdCard size={20} />
                                <span>No staff assigned yet.</span>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="secondary">
                <div class="thumb">
                    <span>Upload image</span>
                </div>
                <div class="thumb">
                    <span>Upload image</span>
                </div>
            </div>
        </div>
</div>

<style>
    .fl-service-card {
        background-color: var(--white);
        border: 1px solid var(--light);
        border-left: 4px solid var(--primary);
        border-radius: 0.5rem;
        display: grid;
        /* gap: 1.5rem; */
        margin: 0.25rem;
        min-width: max(23rem, calc(100% - 0.5rem));
        outline: none;
        padding: 1rem 1.25rem;
        /* padding: 1.5rem 1.5rem; */
        position: relative;
        /* width: min(50rem, 100%); */
    }
    /* @media (min-width: 60rem) {
        .fl-service-card {
            grid-template-columns: 14rem auto;
        }
    } */
    /* .service-img {
        background-image: url('/images/spa-concept-001.jpg');
        background-size: cover;
        background-position: left;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        min-height: 12rem;
    } */
    /* @media (min-width: 60rem) {
        .fl-service-card > .service-img {
            display: block;
        }
    } */
    /* .fl-service-card > .service-details { */
    .service-details {
        /* padding: 1rem 1.25rem; */
        position: relative;
        display: grid;
        gap: 1.5rem;
    }
    @media (min-width: 60rem) {
        .service-details {
            grid-template-columns: 3fr 2fr;
            gap: 3rem;
        }
    }
    /* .service-details > .card-title { */
    .card-title {
        /* background-color: var(--lighter); */
        /* border: 1px solid var(--light); */
        border-radius: 0.25rem;
        outline: none;
        color: var(--dark);
        /* font-size: 0.875rem; */
        /* line-height: 1.375rem; */
        /* font-family: var(--font-default); */
        /* font-weight: 400; */
        /* margin-bottom: 2rem; */
        /* opacity: 0.8; */
        padding: 0.25rem 0.375rem;
        font-size: 1.375rem;
        font-weight: 600;
        width: calc(60% - 1rem);
        margin-bottom: 0.5rem;
    }
    .card-title:hover {
        outline: 1px solid var(--primary-light);
    }
    .card-title:focus {
        background-color: var(--white);
        outline: 2px solid var(--primary);
    }
    /* .service-details > .card-details { */
    .card-details {
        display: grid;
        /* grid-template-columns: 3fr 2fr; */
        gap: 1.5rem;
    }
    @media (min-width: 80rem) {
        /* .service-details > .card-details { */
        .card-details {
            grid-template-columns: 3fr 2fr;
        }
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
        margin-bottom: 2rem;
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
        background-color: var(--lighter);
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        outline: none;
        color: var(--dark);
        font-size: 0.875rem;
        line-height: 1.375rem;
        font-family: var(--font-default);
        font-weight: 400;
        margin-bottom: 2rem;
        opacity: 0.8;
        padding: 0.25rem 0.375rem;
        resize: none;
    }
    /* .primary > .desc:focus, */
    .primary > .desc:hover {
        outline: 1px solid var(--primary-light);
    }
    .primary > .desc:focus {
        background-color: var(--white);
        outline: 2px solid var(--primary);
    }
    /* .fl-service-card > .service-details > * {
        border: 1px solid red;
    } */
    .card-details .section-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: space-between;
        font-size: 1rem;
        font-weight: 500;
        padding-bottom: 0.25rem;
        border-bottom: 1px solid var(--primary);
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
        padding: 0.5rem 0.625rem;
    }
    .empty {
        padding: 1.5rem;
        background-color: var(--lighter);
        border: 3px dashed var(--border);
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: var(--semi-dark);
    }
    .empty > span {
        font-size: 0.875rem;
        font-style: italic;
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
