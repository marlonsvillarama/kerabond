<script>
    let {
        count = 75
    } = $props();

    const PAGE_SIZE = 20;
</script>

<div class="fl-table-paginator"></div>

<style>
    .fl-table-paginator {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
</style>
