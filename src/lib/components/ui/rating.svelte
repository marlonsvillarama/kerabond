<script>
    import { Star, StarHalf } from "@lucide/svelte";

    let {
        value = 0
    } = $props();
    let decimal = $derived(parseFloat(value.toString().slice(value.toString().indexOf('.'))));
</script>

{#if !!value}
    <div class="fl-rating">
        <span>{value}</span>
        <div class="stars">
            {#each { length: Math.floor(value) } as _, i}
                <Star size={16} fill="#ffdf10" />
            {/each}
            {#if decimal >= 0.5}
                <StarHalf size={16} fill="#ffdf10" />
            {/if}
        </div>
    </div>
{:else}
    <span>No reviews yet</span>
{/if}

<style>
    .fl-rating {
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }
    :global(.fl-rating > .star) {
        background-color: yellow;
    }
    .fl-rating > span {
        font-size: 0.875rem;
        font-weight: 600;
    }
    .fl-rating > .stars {
        display: flex;
        align-items: center;
        gap: 0;
    }
</style>
