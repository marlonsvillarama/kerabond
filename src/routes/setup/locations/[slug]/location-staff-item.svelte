<script>
    import { Mail, Phone, Star, StarHalf } from "@lucide/svelte";
    import { NZPhoneFormatter } from "$lib/modules/phone";
    import Rating from "$lib/components/ui/rating.svelte";

    let {
        data
    } = $props();

    let details = data.details;
</script>

<!-- {JSON.stringify(data)} -->
<div class="fl-loc-staff-item" data-staff={details.id}>
    <div class="fl-staff-profile">
        <div class="avatar">{details.first_name[0]}</div>
    </div>
    <div class="fl-staff-details">
        <span class="name">{details.first_name}</span>
        <div class="contact-info">
            <span><Phone size={16} /><span>{NZPhoneFormatter(details.phone)}</span></span>
            <span><Mail size={16} /><span>{details.email}</span></span>
        </div>
        <div class="rating-info">
            {#if details.review_count}
                <Rating value={details.rating_ave} />
                <span>{details.rating_ave} from {details.review_count} reviews</span>
            {:else}
                <Rating value={0} />
                <span>No reviews yet.</span>
            {/if}
        </div>
    </div>
</div>

<style>
    .fl-loc-staff-item {
        border: 1px solid var(--light);
        border-radius: 0.5rem;
        padding: 1rem;
        display: flex;
        gap: 1.5rem;
    }
    .fl-staff-profile {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
        position: relative;
    }
    .fl-staff-profile > .avatar {
        height: 5rem;
        width: 5rem;
        border: none;
        outline: none;
        border-radius: 50%;
        background-color: var(--primary-lighter);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: var(--dark);
    }
    .fl-staff-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
    }
    .fl-staff-details > .name {
        font-weight: 600;
    }
    .fl-staff-details > .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .fl-staff-details > .contact-info > * {
        display: flex;
        align-items: center;
        font-size: 0.75rem;
        gap: 0.5rem;
    }
    .fl-staff-details > .rating-info {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
</style>
