<script>
    import Calendar from "$lib/components/calendar.svelte";
</script>

<main>
    <div class="controls">
        Controls
    </div>
    <div class="content">
        <Calendar />
    </div>
</main>

<style>
    main {
        height: 100%;
        /* border: 4px solid green; */
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
        padding: 0.5rem 0.75rem;
    }
    .controls {
        border-bottom: 1px solid var(--border-light);
    }
    .content {
        flex: 1;
        overflow-y: auto;
    }
</style>