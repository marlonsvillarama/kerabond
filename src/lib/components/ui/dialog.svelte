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

<dialog bind:this={dialog} onclose={handleClose} oncancel={handleClose}
    onclick={(e) => e.target === dialog && handleClose()}
    class="fl-dlg-root"
>
    <!-- {#if open} -->
        <div class="fl-backdrop" transition:fade={{ duration: 300 }}></div>

        <div class="fl-dlg-content">
            {@render children?.()}
            <!-- {@render header?.()} -->
            <!-- {@render content?.()} -->
        </div>
    <!-- {/if} -->
</dialog>

<style>
    .fl-dlg-root {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        border: 0;
        outline: 0;
        border-radius: 0.375rem;
        /* box-shadow: var(--shadow); */
    }
    dialog.fl-dlg-root::backdrop {
        background-color: rgb(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        /* display: flex; */
    }
    .fl-dlg-content {
        display: flex;
        flex-direction: column;
        /* border: 1px solid red; */
    }
</style>
