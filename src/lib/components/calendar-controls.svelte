<script>
    let {
        mode = 'week',
        onnext = () => {},
        onprevious = () => {}
    } = $props();

    // const runPrevious = () => {};
</script>

<div class="controls-container">
    <button onclick={onprevious} title="Previous">
        <i class="ph ph-caret-double-left"></i>
        Previous {mode}
    </button>
    <button onclick={onnext} title="Next">
        Next {mode}
        <i class="ph ph-caret-double-right"></i>
    </button>
</div>

<style>
    .controls-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        /* border: 1px solid red; */
        margin-bottom: 0.5rem;
    }
    button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1.5rem;
        /* background-color: aliceblue; */
        border-radius: 0.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-sm);
        transition: all 100ms ease-in-out;
    }
    button:hover {
        background-color: var(--lightest);
    }
    button:active {
        background-color: var(--lightest);
        box-shadow: none;
        transform: translateY(2px);
    }
</style>