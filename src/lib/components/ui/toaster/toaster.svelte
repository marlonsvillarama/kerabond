<script>
    import { getToastState } from "./toaster-state.svelte";
    import Toast from "./toast.svelte";

    const toastState = getToastState();
</script>

<div class="fl-toaster">
    {#each toastState.toasts as toast}
        <Toast {toast} />
    {/each}
</div>

<style>
    .fl-toaster {
        /* border: 1px solid red; */
        position: absolute;
        right: 1rem;
        top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 999;
    }
</style>
