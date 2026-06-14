<script>
    let {
        flat = false
    } = $props();
</script>

<input type="text" class="fl-input-text shadow" class:flat={flat === true}>

<style>
    .fl-input-text {
        background-color: var(--white);
        border: 1px solid var(--border);
        border-radius: var(--border-radius);
        display: block;
        padding: 0.625rem 1.5rem 0.625rem 1rem;
    }
</style>
