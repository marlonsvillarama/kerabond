<script>
    import CalendarHeader from "./calendar-header.svelte";
    import CalendarMonthView from "./calendar-month-view.svelte";
</script>

<div class="fl-sub-wrapper">
    <CalendarHeader />
    <div class="fl-full-scrollable fl-cal">
        <!-- <div class="fl-cal-content">content</div> -->
        <CalendarMonthView />
    </div>
</div>

<style>
    .fl-cal {
        /* background-color: red; */
        /* border: 2px solid red; */
        /* display: grid; */
        flex: 1;
        /* margin: 1rem; */
        /* grid-template-rows: auto 1fr; */
        /* * flex-direction: column; * */
        /* height: 100%; */
    }
    /* .fl-cal-content-wrapper {
        * height: 100%; *
        overflow-y: auto;
    } */
    /* .fl-cal-content {
        height: 1000px;
    } */
</style>
