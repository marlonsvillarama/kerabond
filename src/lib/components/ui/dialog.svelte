<script>
    import { X } from "@lucide/svelte";
    import { fade } from "svelte/transition";

    let {
        children,
        content,
        full = false,
        header,
        open = $bindable(),
    } = $props();
    
    let dialog = $state();
    const closeDrawer = () => open = false;

    $effect(() => {
        if (!dialog) return;
        if (open) {
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        }
        else {
            dialog.close();
            document.body.style.overflow = '';
        }
    });

    const handleClose = (e) => {
        if (confirm('Are you sure?') !== true) {
            e.preventDefault();
            return;
        }

        open = false;
    };
</script>

<dialog bind:this={dialog} oncancel={handleClose}
    onclick={(e) => e.target === dialog && handleClose()}
    class="fl-dlg-root"
>
    <!-- {#if open} -->
        <div class="fl-backdrop" transition:fade={{ duration: 300 }}></div>

        <div class="fl-dlg-content" transition:fly={{}}>
            {@render children?.()}
        </div>
    <!-- {/if} -->
</dialog>

<style>
    .fl-dlg-root {
        /* position: absolute; */
        border: 0;
        outline: 0;
        box-sizing: border-box;
        border-radius: 0.375rem;
        /* box-shadow: var(--shadow); */
        padding: 0;
        margin: 0.5rem;
        height: 100%;
        max-height: calc(100vh - 1rem);
        /* max-width: 100vw; */
        width: 25rem;
        position: fixed;
        /* bottom: 0.5rem; */
        right: 0.5rem;
        /* left: 200px; */
        /* height: 100%; */
        /* bottom: 0.5rem; */
        transform: translateX(100vw);
        z-index: 100;
        /* display: none; */
    }
    dialog.fl-dlg-root::backdrop {
        background-color: rgb(0, 0, 0, 0.2);
        backdrop-filter: blur(2px);
    }
    .fl-dlg-content {
        display: flex;
        flex-direction: column;
        /* border: 1px solid red; */
    }
</style>
