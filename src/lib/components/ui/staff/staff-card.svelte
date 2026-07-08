<script>
    import { NZPhoneFormatter } from "$lib/modules/phone";
    import { Mail, Phone, Rows, Star, StarHalf } from "@lucide/svelte";

    let {
        data
    } = $props();
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
                No reviews yet for this staff.
            {/if}
        </div>
    </div>
</div>

<style>
    .fl-staff-card {
        border: 1px solid var(--light);
        border-radius: 0.5rem;
        padding: 1.5rem 1.75rem;
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
        gap: 0.75rem;
        font-size: 0.75rem;
        font-weight: 300;
    }
    .fl-staff-details > .rating-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.75rem;
        color: var(--dark);
    }
</style>