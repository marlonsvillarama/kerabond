<script>
    import { Check, CircleX, Info, X } from "@lucide/svelte";
    let {
        toast
    } = $props();

    let toastType = $derived((toast.type || 'info').toLowerCase());
</script>

<div class="fl-toast"
    class:fl-toast-error={toastType === 'error'}
>
    <div>
        {#if toastType === 'error'}
            <CircleX size={16} />
        {:else if toastType === 'success'}
            <Check size={16} />
        {:else}
            <Info size={16} />
        {/if}
        <span class="title">{toast.title}</span>
    </div>
    {#if toast.message}
    <div>
        <span></span>
        <span class="message">{toast.message}</span>
    </div>
    {/if}
    <!-- <div class="message">{toast.message}</div> -->
    <button type="button">
        <X size={16} />
    </button>
</div>

<style>
    .fl-toast {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.125rem;
        /* height: 4rem; */
        width: 20rem;
        background-color: var(--lightest);
        /* background-color: var(--primary); */
        /* border: 1px solid var(--semi-light); */
        border-radius: 0.375rem;
        box-shadow: var(--shadow);
        /* color: var(--white); */
        color: var(--dark);
        opacity: 1;
        padding: 0.75rem 1rem;

        @starting-style {
            opacity: 0.5;
            transform: opacity 500ms ease-in-out;
        }
    }
    .fl-toast > div {
        display: grid;
        grid-template-columns: 1.5rem 1fr;
        /* gap: 0.5rem; */
    }
    .fl-toast > div > .title {
        color: var(--darker);
        font-size: 0.875rem;
        font-weight: 600;
    }
    .fl-toast > div > .message {
        color: var(--dark);
        font-size: 0.75rem;
        opacity: 0.6;
    }
    .fl-toast > button {
        position: absolute;
        top: 0.125rem;
        right: 0.125rem;
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 0;
        outline: none;
    }
</style>
