<script>
    import CalendarHeader from "./calendar-header.svelte";
</script>

<div class="fl-sub-wrapper">
    <CalendarHeader />
    <div class="fl-full-scrollable">
        <div class="fl-cal-content">content</div>
    </div>
</div>

<style>
    /* .fl-cal {
        * border: 2px solid red; *
        display: grid;
        flex: 1;
        grid-template-rows: auto 1fr;
        * flex-direction: column; *
        height: 100%;
    } */
    /* .fl-cal-content-wrapper {
        * height: 100%; *
        overflow-y: auto;
    } */
    /* .fl-cal-content {
        height: 1000px;
    } */
</style>
