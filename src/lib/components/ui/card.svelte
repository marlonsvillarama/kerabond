<script>
    let {
        accent = false,
        children,
        class: className,
        header,
        title = '',
        subtitle = '',
    } = $props();
</script>

<div class="fl-card"
    class:fl-card-accent={accent === true}
>
    {#if title || header}
    <div class="header">
        {#if title}
            <span class="title">{title}</span>
            {#if subtitle}
                <span class="subtitle">{subtitle}</span>
            {/if}
        {:else if header}
            {@render header?.()}
        {/if}
    </div>
    {/if}

    <div class="content">
        {@render children?.()}
    </div>
</div>

<style>
    .fl-card {
        display: flex;
        flex-direction: column;
        background-color: var(--lightest);
        border: 1px solid var(--semi-light);
        border-top: 4px solid var(--semi-light);
        border-radius: 0.375rem;
        /* box-shadow: var(--shadow); */
    }
    .fl-card.fl-card-accent {
        border-color: var(--primary);
    }
    .fl-card > .header {
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        /* padding: 1rem 1.5rem; */
        padding: 1rem 2rem;
        border-bottom: 1px solid var(--semi-light);
    }
    .fl-card > .header > .title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--darker);
        letter-spacing: -0.25px;
    }
    .fl-card > .header > .subtitle {
        font-size: 0.875rem;
        /* font-weight: 600; */
        color: var(--darker);
        opacity: 0.6;
    }
    .fl-card > .content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        /* padding: 1.5rem 1.5rem; */
        padding: 2rem;
    }
</style>
