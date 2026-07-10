<script>
    import Toggle from "$lib/components/ui/toggle.svelte";
</script>

<div>
    <Toggle id="toggle-{data.id}-{loc.id}" bind:checked={loc.is_active} />
    <label for="toggle-{data.id}-{loc.id}">{loc.name || loc.street_1}</label>
</div>

<style></style>
