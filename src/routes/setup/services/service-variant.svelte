<script>
    let {
        data = $bindable()
    } = $props();
</script>

<div class="fl-service-variant">
    <div class="name">
        {data.name || `${data.duration} minutes`}
    </div>
</div>

<style>
    .fl-service-variant {
        font-size: 0.875rem;
        background-color: var(--white);
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        /* padding: 0.25rem; */
    }
    .fl-service-variant > .name {
        padding: 0.25rem 0.375rem;
    }
</style>
