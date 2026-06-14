<script>
    import { Search } from "@lucide/svelte";
    import InputText from "./input-text.svelte";

    let {
        flat = false,
        id
    } = $props();
</script>

<div class="fl-search shadow" class:flat={flat === true}>
    <input type="text" {id} class="fl-search-input" flat={true} />
    <Search size={20} class="fl-search-icon" />
</div>

<style>
    .fl-search {
        background-color: var(--white);
        border-radius: var(--border-radius);
        display: block;
        padding: 0.625rem 1.5rem 0.625rem 1rem;
        position: relative;
    }
    :global(.fl-search-input) {
        border: 0;
        box-shadow: none;
        padding-right: 1rem;

        background-color: var(--white);
        /* border: 1px solid var(--border); */
        border-radius: var(--border-radius);
        /* display: block; */
        /* padding: 0.625rem 1.5rem 0.625rem 1rem; */
    }
    /* .fl-input-text {
        background-color: var(--white);
        border: 1px solid var(--border);
        border-radius: 0.375rem;
        display: block;
        padding: 0.625rem 1.5rem 0.625rem 1rem;
    } */
    :global(.fl-search-icon) {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateX(-60%) translateY(-50%);
    }
</style>
