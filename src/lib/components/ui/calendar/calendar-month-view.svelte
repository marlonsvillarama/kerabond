<script>
    let {
        date = $bindable(new Date())
    } = $props();

    let year = $derived(date.getMonth());
    let month = $derived(date.getMonth());
    let day = $derived(date.getDate());
    let dayOfWeek = $derived(date.getDay());

    let monthDates = $derived.by(() => {
        let output = [];

        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let dayOfWeek = date.getDay();
        let startOfMonth = new Date(year, month, 1);
        let startOfMonthDay = startOfMonth.getDay();
        console.log(`startOfMonth (day = ${startOfMonthDay})`, startOfMonth);

        for (let i = 0; i < startOfMonthDay; i++) {
            let dt = new Date(year, month, 1);
            dt.setDate(dt.getDate() - (startOfMonthDay - i));
            output.push({
                date: dt.getDate(),
                inMonth: false
            });
        }
        
        let nextMonth = new Date(year, month + 1, 1);
        nextMonth.setDate(nextMonth.getDate() - 1);
        let dayCount = nextMonth.getDate();

        for (let i = 0; i < dayCount; i++) {
            let dt = new Date(year, month, 1);
            dt.setDate(dt.getDate() + i);
            output.push({
                date: dt.getDate()
            });
        }
        
        return output;
    });
</script>

<div class="fl-cal-month">
    <div class="fl-cal-month-headers">
    </div>
    <div class="fl-cal-month-cells">
        {#each monthDates as day}
            <div class="fl-cell" class:fl-out-of-month={day.inMonth === false}>
                <span class="fl-cell-header">{day.date}</span>
            </div>
        {/each}
        <!-- <div class="fl-cell">1</div>
        <div class="fl-cell">2</div>
        <div class="fl-cell">3</div>
        <div class="fl-cell">4</div>
        <div class="fl-cell">5</div>
        <div class="fl-cell">6</div>
        <div class="fl-cell">7</div>
        <div class="fl-cell">8</div>
        <div class="fl-cell">9</div>
        <div class="fl-cell">10</div>
        <div class="fl-cell">11</div>
        <div class="fl-cell">12</div>
        <div class="fl-cell">13</div>
        <div class="fl-cell">14</div>
        <div class="fl-cell">15</div>
        <div class="fl-cell">1</div>
        <div class="fl-cell">2</div>
        <div class="fl-cell">3</div>
        <div class="fl-cell">4</div>
        <div class="fl-cell">5</div>
        <div class="fl-cell">6</div>
        <div class="fl-cell">7</div>
        <div class="fl-cell">8</div>
        <div class="fl-cell">9</div>
        <div class="fl-cell">10</div>
        <div class="fl-cell">11</div>
        <div class="fl-cell">12</div>
        <div class="fl-cell">13</div>
        <div class="fl-cell">14</div>
        <div class="fl-cell">15</div> -->
    </div>
</div>

<style>
    .fl-cal-month {
        display: grid;
        grid-template-columns: auto 1fr;
        margin: 1rem;
    }
    .fl-cal-month-cells {
        border-left: 1px solid var(--border);
        border-top: 1px solid var(--border);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: auto;
    }
    .fl-cal-month-cells > .fl-cell {
        border-right: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        min-height: 8rem;
        padding: 0.25rem;
    }
    .fl-cell-header {
        /* border: 1px solid red; */
        display: block;
        font-weight: 500;
        text-align: right;
    }
    .fl-cell.fl-out-of-month {
        background-color: var(--border);
    }
    .fl-cell.fl-out-of-month > .fl-cell-header {
        opacity: 0.5;
    }
</style>
