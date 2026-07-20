<script>
    import { getContext } from "svelte";
    import { NZPhoneFormatter } from "$lib/modules/phone";
    import { Calendar, Check, IdCard, Mail, Pencil, Phone, Rows, Star, StarHalf, Trash, X } from "@lucide/svelte";
    import ListItem from "$lib/components/global/list-item.svelte";
    import Rating from "$lib/components/ui/rating.svelte";
    import Toggle from "$lib/components/ui/toggle.svelte";

    let {
        data = $bindable(),
        onedit,
        ondelete,
        onselect,
    } = $props();

    let allLocations = getContext('LOCATIONS');
    // let staffLocationMap = getContext('STAFF_LOCATIONS').find(d => d.staff === data.id);
    // let staffLocations = $state();

    const toggleActive = async () => {
        console.log(`toggle row ${data.id}`, data.is_active);
        const { data, error } = await supabase.from('kb_staff').update({ is_active: data.is_active }).eq('id', data.id).select();
        if (error) {
            console.error(error);
        }
    }

    const toggleAssign = async () => {
        data.selected = !data.selected;
    };
</script>

<ListItem Icon={IdCard} active={data.selected}>
    {#snippet details()}
        <div class="fl-staff-item"
            class:fl-staff-item-selected={data.selected === true}
            class:fl-staff-item-disabled={data.is_active === false}
        >
            <div class="header">
                <span class="title">{data.first_name} {data.last_name}</span>
                <div class="rating">
                    {#if data.review_count > 0}
                        <Rating value={data.rating_ave} />
                        <span class="review_count">{data.review_count} reviews</span>
                    {:else}
                        <span class="review_count">No reviews yet.</span>
                    {/if}
                </div>
            </div>
            <div class="contact-info">
                <div>
                    <Phone size={16} />
                    <span>{NZPhoneFormatter(data.phone)}</span>
                </div>
                <div>
                    <Mail size={16} />
                    <span>{data.email}</span>
                </div>
            </div>
        </div>
    {/snippet}

    {#snippet controls()}
        <div class="fl-staff-item-controls">
            <!-- <a href="./locations/{data.id}"><Pencil size={16} /></a> -->
            <button type="button" class:fl-control-selected={data.selected === true}
                onclick={toggleAssign}
            >
                {#if data.selected}
                    <span>Remove</span>
                {:else}
                    <span>Assign</span>
                {/if}
            </button>
        </div>
    <!-- </div> -->
    {/snippet}
</ListItem>

<!-- <div class="fl-staff-card"
    class:fl-staff-card-selected={data.selected === true}
>
    <div class="fl-staff-profile">
        <div class="avatar">{data.first_name[0]}</div>
        <span class="name">{data.first_name}</span>
        <div class="fl-staff-actions">
            <button type="button" title="Edit" onclick={() => onedit(data.id)}><Pencil size={16} /></button>
            <button type="button" title="Delete" onclick={() => ondelete(data.id)}><Trash size={16} /></button>
        </div>
    </div>
    <div class="fl-staff-details">
        <div>
            <div class="contact-info">
                <span><Phone size={16} /><span>{NZPhoneFormatter(data.phone)}</span></span>
                <span><Mail size={16} /><span>{data.email}</span></span>
            </div>
            <div class="rating-info">
                {#if data.review_count}
                    <div class="stars">
                        {#each {length : 5} as _, i}
                            <Star size={16} fill="#ff0" />
                        {/each}
                    </div>
                    <span>{data.rating_ave} from {data.review_count} reviews</span>
                {:else}
                    <span>No reviews yet.</span>
                {/if}
            </div>
        </div>
        <div class="staff-details-actions">
            <button type="button" class="staff-details-btn" title="View Schedules">
                <Calendar size={16} />
                Edit Schedules
            </button>
        </div>
    </div>
    <button type="button" class="fl-select"
        class:fl-select-selected={data.selected === true}
        onclick={() => onselect(data.id)}
    >
        {#if data.selected}
            <Check size={20} />
        {:else}
            Select
        {/if}
    </button>
</div> -->

<style>
    .fl-staff-item {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        gap: 1rem;
        /* cursor: pointer; */
        /* background-color: var(--white);
        border: 1px solid var(--light);
        border-radius: 0.5rem;
        padding: 1.5rem 1.5rem;
        outline: none;
        display: flex;
        gap: 1.5rem;
        margin: 0.25rem;
        width: min(23rem, 100%);
        min-width: 23rem;
        position: relative; */
    }
    /* .fl-staff-item-selected {
        border: 1px solid var(--primary);
        background-color: var(--primary-lighter)
    } */
    .fl-staff-item-disabled {
        opacity: 0.4;
    }
    .fl-staff-item > .header {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }
    .fl-staff-item > .header > .title {
        font-weight: 600;
    }
    .fl-staff-item > .header > .rating > .review_count {
        opacity: 0.3;
        font-size: 0.875rem;
    }
    .fl-staff-item > .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .fl-staff-item > .contact-info > div {
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }
    .fl-staff-item > .contact-info > div > span {
        font-size: 0.875rem;
    }
    .fl-staff-item-controls {
        margin-right: 1rem;
    }
    .fl-staff-item-controls > button {
        cursor: pointer;
        background-color: var(--primary);
        color: var(--white);
        padding: 0.25rem 0.625rem;
        border: 0;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 300;
        transition: all 50ms ease-in-out;
    }
    .fl-staff-item-controls > .fl-control-selected {
        background-color: var(--semi-light);
        color: var(--dark);
    }
    .fl-staff-item-controls > button:not(.fl-control-selected):hover {
        background-color: var(--semi-dark);
        color: var(--white);
    }





    .fl-staff-card-selected {
        border-color: var(--primary-light);
        outline: 3px solid var(--primary);
        outline-offset: 1px;
    }
    .fl-staff-profile {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
        position: relative;
    }
    .fl-staff-profile > .avatar {
        height: 6rem;
        width: 6rem;
        border: none;
        outline: none;
        border-radius: 50%;
        background-color: var(--primary-lighter);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: var(--dark);
    }
    .fl-staff-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1.5rem;
        /* text-align: center; */
    }
    .fl-staff-details > :first-child {
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .fl-staff-details .contact-info,
    .fl-staff-details .rating-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        color: var(--dark);
    }
    .fl-staff-details .contact-info > span,
    .fl-staff-details .rating-info > span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        /* font-weight: 300; */
    }
    /* .fl-staff-details > .rating-info,
    .fl-staff-details > .active-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: var(--dark);
    } */
    /* .fl-staff-details > .active-info > label {
        cursor: pointer;
    } */
    .fl-staff-actions {
        /* position: absolute;
        top: 0;
        right: 0; */
        /* border: 1px solid red; */
        flex: 1;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
    }
    .fl-staff-actions > button {
        background-color: transparent;
        border: 0;
        color: var(--primary);
        cursor: pointer;
        font-weight: 500;
        outline: none;
        /* padding: 0.25rem 0.375rem; */
        height: 32px;
        width: 32px;
        border-radius: 50%;
    }
    .fl-staff-actions > button:hover {
        background-color: var(--semi-light);
    }

    .fl-staff-details > .locations-info {
        border-top: 1px solid var(--primary-light);
        padding-top: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: var(--dark);
    }
    .fl-staff-details > .locations-info > .title {
        /* background-color: var(--primary-lighter); */
        /* padding: 0.25rem 0.375rem; */
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--darker);
    }
    .fl-staff-details > .locations-info > .list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .fl-staff-details > .locations-info > .list > div {
        display: flex;
        /* flex-direction: row; */
        align-items: center;
        gap: 0.75rem;
        padding: 0.25rem;
        /* border: 1px solid var(--light); */
        background-color: var(--white);
    }
    .staff-details-actions {
        /* border: 1px solid red; */
        display: flex;
        gap: 0.5rem;
        padding: 0.375rem 0;
    }
    .staff-details-actions > button {
        /* border: 1px solid var(--light); */
        /* border-radius: 0.25rem; */
        /* background-color: var(--white); */
        background-color: transparent;
        border: 0;
        outline: 0;
        color: var(--primary);
        cursor: pointer;
        font-size: 0.75rem;
        font-weight: 500;
        /* padding: 0.375rem 0.625rem; */
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }
    /* .staff-details-actions > button:hover {
        border-bottom: 1px solid var(--primary);
    } */

    /* .fl-staff-actions > button:not(:last-child) {
        border-right: 1px solid var(--primary-dark);
        border-top-right-radius: 0.5rem;
    } */
    /* .fl-staff-actions > button:last-child {
        border-top-right-radius: 0.5rem;
    } */
    .fl-select {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.25rem 0.25rem;
        border: 0;
        border-top-right-radius: 0.5rem;
        cursor: pointer;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--primary-lighter);
        /* color: var(--white); */
    }
    .fl-select-selected {
        background-color: var(--primary);
        color: var(--white);
    }
</style>