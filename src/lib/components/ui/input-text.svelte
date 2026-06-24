<script>
    let {
        flat = false,
        id = 'fld-input',
        material = false
    } = $props();
</script>

<input type="text" {id} class="fl-input-text shadow"
    class:flat={flat === true}
    class:material={material === true}
>

<style>
    .fl-input-text {
        background-color: var(--white);
        border: none;
        border-radius: var(--border-radius);
        display: block;
        font-size: 0.875rem;
        padding: 0.625rem 1.5rem 0.625rem 1rem;
    }
    .fl-input-text:hover {
        box-shadow: var(--shadow);
    }
    .fl-input-text.material {
        border-radius: 0;
        border-bottom: 2px solid var(--accent-pale);
        box-shadow: none;
    }
</style>
