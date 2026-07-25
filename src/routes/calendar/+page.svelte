<script>
    import { setContext } from "svelte";
    import AppHeader from "$lib/components/global/app-header.svelte";
    import Calendar from "$lib/components/ui/calendar/calendar.svelte";

    let { data } = $props();
    setContext('LOCATIONS', data.locations);
    setContext('STAFF', data.staff);

    // let appointments = [
    //     { id: 1, date: '2026-06-15', slot: '1100', duration: 120, name: 'John' },
    //     { id: 2, date: '2026-06-15', slot: '1430', duration: 60, name: 'Apple' },
    //     { id: 3, date: '2026-06-15', slot: '1545', duration: 30, name: 'Mayey' },
    //     { id: 4, date: '2026-06-17', slot: '1015', duration: 90, name: 'Linda' },
    //     { id: 5, date: '2026-06-18', slot: '0930', duration: 60, name: 'Jheng' },
    //     { id: 6, date: '2026-06-18', slot: '1045', duration: 30, name: 'Ice' },
    //     { id: 7, date: '2026-06-18', slot: '1300', duration: 120, name: 'Marlong' },
    //     { id: 8, date: '2026-06-18', slot: '1300', duration: 120, name: 'fssgdfgdfg' },
    //     { id: 9, date: '2026-06-18', slot: '1300', duration: 120, name: 'aaaa' },
    //     { id: 10, date: '2026-06-18', slot: '1300', duration: 120, name: 'iksjngljsdbfglkjbsdfgjb' },
    // ];
</script>

<!-- <div class="fl-wrapper"> -->
    <!-- <AppHeader /> -->

    <!-- <div class="fl-content"> -->
        <Calendar data={data.appointments} />
    <!-- </div> -->
<!-- </div> -->

<style>
    /* .fl-wrapper {
        display: flex;
        * grid-template-rows: auto auto 1fr; *
        flex-direction: column;
        height: 100vh;
    } */
    /* .fl-wrapper > *:not(:last-child) {
        flex-shrink: 0;
    } */
    /* .fl-content {
        * border: 2px solid blue; *
        * height: 100%; *
        overflow-y: auto;
        flex: 1;
    } */
</style>
