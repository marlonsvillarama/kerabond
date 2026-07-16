<script>
    let {
        children,
        type = 'default'
    } = $props();
</script>

<div class="fl-badge"
    class:fl-badge-primary={type === 'primary'}
    class:fl-badge-alert={type === 'alert'}
    class:fl-badge-disabled={type === 'disabled'}
>
    {@render children?.()}
</div>

<style>
    .fl-badge {
        background-color: var(--light);
        color: var(--darker);
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.65rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    .fl-badge-primary {
        background-color: var(--primary);
        color: var(--white);
    }
    .fl-badge-alert {
        background-color: red;
        color: var(--white);
    }
    .fl-badge-disabled {
        background-color: var(--light);
        color: var(--semi-dark);
        /* opacity: 0.6; */
    }
</style>