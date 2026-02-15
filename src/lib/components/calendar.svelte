<script>
    import CalendarDay from "./calendar-day.svelte";
    let days = [
        { id: 1, name: 'Monday' },
        { id: 2, name: 'Tuesday' },
        { id: 3, name: 'Wednesday' },
        { id: 4, name: 'Thursday' },
        { id: 5, name: 'Friday' },
        { id: 6, name: 'Saturday' },
        { id: 7, name: 'Sunday' },
    ];
    const START_HOUR = 6;
    const END_HOUR = 19;
</script>

<!-- Wrapper -->
<div class="wrapper">
    <!-- Header -->
    <div class="header border-b border-(--border)">
        <div class="time-col border-r border-(--border)"></div>
        {#each days as day, i}
            <div class="week-day text-center {i < days.length - 1 ? 'border-r border-(--border)' : ''}">
                {day.name}
            </div>
        {/each}
    </div>
    
    <div class="calendar-contents">
        <div class="calendar-grid">
            <div class="time-col border-r border-(--border)"></div>
            {#each days as day, i}
                <!-- <div class="week-day {i < days.length - 1 ? 'border-r border-(--border)' : ''}">
                    {day.id}
                </div> -->
                <CalendarDay />
            {/each}
        </div>
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: auto 1fr;
    }
    /* .header h1 {
        font-family: var(--font-serif);
        font-size: 1.5rem;
        font-weight: 700;
    } */
    .calendar-contents {
        flex: 1;
        overflow-y: auto;
    }
    .header,
    .calendar-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
    }
    .calendar-grid {
        height: 1000px;
    }
</style>