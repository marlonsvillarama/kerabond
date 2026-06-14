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

    const closeDrawer = () => open = false;
</script>

{#if open}
    <div class="backdrop" transition:fade={{ duration:20 }} onclick={closeDrawer}></div>

    <div class="fl-drawer {placement}"
        transition:fly={{ ...getTransitionParams(), duration: 30 }}
    >
        {@render children?.()}
    </div>
{/if}

<style>
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
    .fl-drawer {
        position: fixed;
        background: var(--white);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
    }
    .left {
        top: 0;
		left: 0;
		width: 350px;
		height: 100vh;
    }
    .right {
		top: 0;
		right: 0;
		width: 350px;
		height: 100vh;
	}

	.top {
		top: 0;
		left: 0;
		width: 100vw;
		height: 300px;
	}

	.bottom {
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 300px;
	}
</style>
