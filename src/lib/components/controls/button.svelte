<script>
    let {
        children,
        restProps
    } = $props();
</script>

<button class="fl-button shadow" {...restProps}>
    {@render children?.()}
</button>

<style>
    .fl-button {
        background-color: var(--white);
        /* border: 1px solid var(--border); */
        border: 0;
        border-radius: 0.5rem;
        /* box-shadow: var(--shadow); */
        /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
        /* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; */
        cursor: pointer;
        /* display: block; */
        padding: 0.4rem 0.5rem 0.375rem 0.5rem;
        transition: all 100ms ease-in-out;
    }
    .fl-button:hover {
        /* border-color: 1px solid var(--purple); */
        background-color: var(--purple);
        color: var(--white);
    }
    .fl-button:active {
        transform: translateY(2px);
    }
</style>
