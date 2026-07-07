<script>
    let {
        id = 'fld',
        label = 'Field',
        required = false,
        subtext = ''
    } = $props();
</script>

<div class="fl-fld">
    <label for={id}>{label}</label>
    {#if subtext}
        <span class="fl-fld-subtext">{subtext}</span>
    {/if}
    {@render children?.()}
</div>

<style>
    .fl-fld {
        display: flex;
        align-items: left;
        flex-direction: column;
        gap: 2px;
    }
    .fl-fld > label {
        color: var(--dark);
        font-size: 0.875rem;
        font-weight: 500;
    }
    .fl-fld-subtext {
        color: var(--dark);
        font-size: 0.625rem;
        font-weight: 500;
        opacity: 0.5;
    }
    :global(.fl-fld > input[type=phone]),
    :global(.fl-fld > input[type=text]) {
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }
    :global(.fl-fld > input[type=phone]) {
        width: 8rem;
    }
</style>
