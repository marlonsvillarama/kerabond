<script>
    import AppHeader from "$lib/components/global/app-header.svelte";
    // import CommanddHeader from "$lib/components/global/cmd-header.svelte";
    import Calendar from "$lib/components/controls/calendar/calendar.svelte";
</script>

<!-- <div class="fl-wrapper"> -->
    <!-- <AppHeader /> -->

    <div class="fl-content">
        <Calendar />
    </div>
<!-- </div> -->

<style>
    .fl-wrapper {
        display: flex;
        /* grid-template-rows: auto auto 1fr; */
        flex-direction: column;
        height: 100vh;
    }
    .fl-wrapper > *:not(:last-child) {
        flex-shrink: 0;
    }
    .fl-content {
        /* border: 2px solid blue; */
        /* height: 100%; */
        overflow-y: auto;
        flex: 1;
    }
</style>
