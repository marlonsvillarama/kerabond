<script>
    let {
        orientation = "horizontal"
    } = $props();
</script>

<div class="fl-separator"
    class:horizontal={orientation === 'horizontal'}
    class:vertical={orientation === 'vertical'}
></div>

<style>
    .fl-separator {
        background-color: var(--border);
    }
    .fl-separator::before {
        content: "";
    }
    :global(.fl-horizontal) {
        width: 100%;
        height: 1px;
    }
    :global(.fl-vertical) {
        height: 100%;
        width: 2px;
        border: 1px solid red;
    }
</style>
