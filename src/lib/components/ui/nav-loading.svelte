<script>
    import { onMount } from "svelte";

    let progress = 0;
    onMount(() => {
        const interval = setInterval(() => {
            if (progress < 85) {
                progress += Math.random() * 15;
            }
            else if (progress < 98) {
                progress += 0.5;
            }
        }, 100);

        return () => clearInterval(interval);
    });
</script>

<div class="fl-loading-wrapper">
    <div class="fl-loading" style="width: {progress}%;"></div>
</div>

<style>
    .fl-loading-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 999;
        background: transparent;
        pointer-events: none;
    }
    .fl-loading {
        background: var(--accent);
        box-shadow: var(--shadow);
        transition: width 0.2s ease-out;
    }
</style>
