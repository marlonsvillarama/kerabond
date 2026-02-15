<script>
    let days = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
    ];
</script>

<div class="calendar-grid">
    <div class="time-col border-r border-var(--border-light)"></div>
    {#each days as day, i}
        <div class="week-day {i < days.length - 1 ? 'border-r border-var(--border-light)' : ''}">
            {day.id}
        </div>
    {/each}
</div>

<style>
    .calendar-grid {
        width: 100%;
        height: 1000px;
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
    }
</style>