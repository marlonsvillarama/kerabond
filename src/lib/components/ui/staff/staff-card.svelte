<script>
    import { getContext } from "svelte";
    import { NZPhoneFormatter } from "$lib/modules/phone";
    import { Calendar, Mail, Pencil, Phone, Rows, Star, StarHalf, Trash } from "@lucide/svelte";
    import Toggle from "../toggle.svelte";

    let {
        data = $bindable(),
        onedit,
        ontoggle,
    } = $props();

    let allLocations = getContext('LOCATIONS');
    let staffLocationMap = getContext('STAFF_LOCATIONS').find(d => d.staff === data.id);
    let staffLocations = $state();

    const editRow = () => {
        onedit(data.id);
    };

    const toggleActive = async () => {
        console.log(`toggle row ${data.id}`, data.is_active);
        const { data, error } = await supabase.from('kb_staff').update({ is_active: data.is_active }).eq('id', data.id).select();
        if (error) {
            console.error(error);
        }
    }
</script>

<div class="fl-staff-card">
    <div class="fl-staff-profile">
        <div class="avatar">{data.first_name[0]}</div>
        <span class="name">{data.first_name}</span>
    </div>
    <div class="fl-staff-details">
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
                No reviews yet.
            {/if}
        </div>
        <!-- <div class="active-info">
            <Toggle id="toggle-{data.id}" bind:checked={data.is_active} ontoggle={toggleActive} />
            <label for="toggle-{data.id}">
            {#if data.is_active}
                {data.first_name} is active and bookable.
            {:else}
                {data.first_name} is not active.
            {/if}
            </label>
        </div> -->
        <!-- <div class="locations-info">
            <span class="title">Staff locations</span>
            <div class="list">
            {#each locations as loc}
                <div>
                    <Toggle id="toggle-{data.id}-{loc.id}" bind:checked={loc.is_active} />
                    <label for="toggle-{data.id}-{loc.id}">{loc.name || loc.street_1}</label>
                </div>
            {/each}
            </div>
        </div> -->
        <div class="staff-details-actions">
            <button type="button" class="staff-details-btn" title="View Schedules">
                <Calendar size={16} />
                Edit Schedules
            </button>
        </div>
    </div>
    <div class="fl-staff-actions">
        <button type="button" title="Edit" onclick={editRow}><Pencil size={16} /></button>
        <button type="button" title="Delete" onclick={deleteRow}><Trash size={16} /></button>
    </div>
</div>

<style>
    .fl-staff-card {
        background-color: var(--lighter);
        border: 1px solid var(--light);
        border-radius: 0.5rem;
        padding: 1.5rem 1.5rem;
        outline: none;
        display: flex;
        gap: 1.5rem;
        min-width: 20rem;
        position: relative;
    }
    .fl-staff-profile {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
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
        gap: 1.5rem;
        /* text-align: center; */
    }
    .fl-staff-details > .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        color: var(--dark);
    }
    .fl-staff-details > .contact-info > span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        /* font-weight: 300; */
    }
    .fl-staff-details > .rating-info,
    .fl-staff-details > .active-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: var(--dark);
    }
    .fl-staff-details > .active-info > label {
        cursor: pointer;
    }
    .fl-staff-actions {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
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
        display: flex;
        gap: 0.5rem;
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

    .fl-staff-actions > button {
        background-color: var(--primary);
        border: 0;
        color: var(--white);
        cursor: pointer;
        outline: none;
        padding: 0.5rem 0.625rem;
    }
    .fl-staff-actions > button:not(:last-child) {
        border-right: 1px solid var(--primary-dark);
        /* border-top-right-radius: 0.5rem; */
    }
    .fl-staff-actions > button:last-child {
        border-top-right-radius: 0.5rem;
    }
</style>