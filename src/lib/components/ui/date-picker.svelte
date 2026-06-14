<script>
    import DatePickerMonth from "./date-picker-month.svelte";

    let { value } = $props();
</script>

<div class="fl-date-picker">
    <DatePickerMonth {value} />
</div>

<style>

</style>
