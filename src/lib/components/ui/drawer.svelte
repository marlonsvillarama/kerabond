<script>
    import { fly, fade } from "svelte/transition";

    let {
        open = $bindable(),
        placement = "right",
        children
    } = $props();

    const getTransitionParams = () => {
        if (placement === 'left') return { x: -300 };
        if (placement === 'right') return { x: 300 };
        if (placement === 'top') return { y: -300 };
        if (placement === 'bottom') return { y: 300 };
    };

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

    const handleCancel = (e) => {
        if (confirm('Are you sure?') !== true) {
            e.preventDefault();
            return;
        }

        open = false;
    };

    const handleClose = () => {
        open = false;
    };
</script>

<dialog bind:this={dialog} onclose={handleClose} oncancel={handleCancel}
    onclick={(e) => e.target === dialog && handleClose()}
    class="fl-drawer-root fl-placement-{placement}"
>
    {#if open}
        <div class="fl-backdrop" transition:fade={{ duration:100 }}></div>

        <div class="fl-drawer-content" transition:fly={{ x: 400, duration: 300 }}>
            {@render children?.()}
        </div>
    {/if}
</dialog>

<style>
    dialog.fl-drawer-root {
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        max-height: 100vh;
        max-width: 100vw;
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 100;
        display: none;
    }
    dialog.fl-drawer-root[open] {
        display: flex;
    }
    dialog.fl-drawer-root::backdrop {
        display: flex;
    }
    .fl-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        z-index: 888;
    }
    .fl-drawer-content {
        position: fixed;
        background: var(--white);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
    }
    .fl-placement-right .fl-drawer-content {
        top: 0;
        right: 0;
        bottom: 0;
        width: 400px;
        /* height: 90%; */
        transform: translateX(0);
    }
    dialog.fl-drawer-root:not([open]).placement-right .fl-drawer-content {
        transform: translateX(100%);
    }

    /* .placement-left {
        top: 0;
		left: 0;
		width: 350px;
		height: 100vh;
    }
    .placement-right {
		top: 0;
		right: 0;
		width: 350px;
		height: 100vh;
	}

	.placement-top {
		top: 0;
		left: 0;
		width: 100vw;
		height: 300px;
	}

	.placement-bottom {
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 300px;
	} */
</style>
