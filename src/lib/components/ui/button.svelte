<script>
    let {
        accent = false,
        active = false,
        children,
        class: className,
        Icon,
        flat = false,
        onclick,
        tip = "Button"
    } = $props();
</script>

<button {onclick} data-tooltip={tip}
    class="fl-button flex-center {className}"
    class:flat={flat === true}
    class:fl-button-text={!!children === true && !!Icon === false}
    class:fl-button-active={active === true && accent === false}
    class:fl-button-accent-active={active === true && accent === true}
>
    {#if Icon}
        <Icon size={20} />
    {/if}
    {@render children?.()}
</button>

<style>
    .fl-button {
        background-color: var(--white);
        /* background-color: transparent; */
        border: 1px solid var(--border-semi-light);
        border-bottom: 3px solid var(--border-semi-light);
        /* border: none; */
        /* border-radius: var(--border-radius); */
        border-radius: 0.25rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        font-size: 0.75rem;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        position: relative;
        transition: all 100ms ease-in-out;
    }
    :global(.fl-button.fl-button-text) {
        padding: 0.5rem 1rem 0.5rem 1rem;
    }
    :global(.fl-button.flat) {
        /* background-color: var(--ivory); */
        background-color: transparent;
        box-shadow: none;
    }
    .fl-button-active {
        background-color: var(--dark) !important;
        /* border: 1px solid var(--primary-light);
        border-bottom: 3px solid var(--primary-light); */
        color: var(--white);
    }
    .fl-button-accent-active {
        background-color: var(--accent) !important;
        color: var(--white);
    }
    .fl-button:not(.fl-button-active):hover {
        background-color: var(--lighter) !important;
    }
    /* .fl-button:not(.fl-button-accactive):hover {
        background-color: var(--light) !important;
    } */
    /* .fl-button::before {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);

        background-color: var(--cream);
        font-size: 0.875rem;
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
    } */
    /* .fl-button:hover::before {
        opacity: 1;
    } */
    /* .fl-button:active {
        transform: translateY(1px);
    } */
</style>
