<script>
    // import Sidebar from "$lib/components/controls/sidebar/sidebar.svelte";

    let {
        children
    } = $props();
</script>

<!-- <div class="fl-setup">
    <Sidebar />
    <div class="fl-content"> -->
        <div class="fl-sub-wrapper">
            <h2>Setup</h2>
            <!-- <CalendarHeader /> -->
            <div class="fl-full-scrollable">
                {@render children?.()}
                <!-- <div class="fl-cal-content">Sales content</div> -->
            </div>
        </div>
    <!-- </div>
</div> -->
<!-- <h2>Setup</h2>

<ul>
    <li>Staff</li>
    <li>Schedule</li>
    <li>Inventory</li>
</ul> -->

<style>
    /* .fl-setup {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
    } */
</style>
