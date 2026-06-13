<script>
    let {
        ...restProps
    } = $props();
</script>

<input type="text" class="fl-input-text shadow" {...restProps}>

<style>
    .fl-input-text {
        border: 1px solid var(--border);
        border-radius: 0.375rem;
        /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
        /* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; */
        /* box-shadow: var(--shadow); */
        display: block;
        padding: 0.625rem 1.5rem 0.625rem 1rem;
    }
</style>
