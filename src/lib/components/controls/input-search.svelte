<script>
    import { Search } from "@lucide/svelte";
    import InputText from "./input-text.svelte";

    let {
        id
    } = $props();
</script>

<div class="fl-search shadow">
    <InputText {id} class="fl-search-input" />
    <Search size={20} class="fl-search-icon" />
</div>

<style>
    .fl-search {
        /* border: 1px solid var(--border); */
        border-radius: 0.375rem;
        /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
        /* box-shadow: var(--shadow); */
        display: block;
        padding: 0.625rem 1.5rem 0.625rem 1rem;
        position: relative;
    }
    :global(.fl-search-input) {
        border: 0;
        box-shadow: none;
        padding-right: 1rem;
    }
    :global(.fl-search-icon) {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateX(-60%) translateY(-50%);
    }
</style>
