<script>
    import { Star, StarHalf } from "@lucide/svelte";

    let { value = 4 } = $props();
</script>

<div class="fl-rating">
    {#each { length: value } as _, i}
    <Star size={20} fill="#ffdf10" />
    {/each}
</div>

<style>
    .fl-rating {
        display: flex;
        align-items: center;
        gap: 0.125rem;
    }
    :global(.fl-rating > .star) {
        background-color: yellow;
    }
</style>
