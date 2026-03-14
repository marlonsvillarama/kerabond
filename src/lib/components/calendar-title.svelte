<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";

    let {
        date,
        mode = 'week',
        onrefresh
    } = $props();

    const calendar = createCalendarData();

    let title = $derived.by(() => {
        let output = '';
        // console.log('calendar.title derived', date);

        if (mode === 'week') {
            let startWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            startWeek.setDate(startWeek.getDate() - startWeek.getDay());
            // console.log('startWeek', startWeek);

            let endWeek = new Date(startWeek.getFullYear(), startWeek.getMonth(), startWeek.getDate());
            endWeek.setDate(startWeek.getDate() + 6);
            // console.log('endWeek', endWeek);

            if (startWeek.getMonth() !== endWeek.getMonth()) {
                output = `${startWeek.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric'})} - ${endWeek.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric'})}`;
            }
            else {
                output = ` ${startWeek.toLocaleDateString('en-NZ', { month: 'long' })} ${startWeek.getDate()} - ${endWeek.getDate()}, ${startWeek.getFullYear()}`;
            }
        }
        else {
            output += ` ${date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long' })}`;
        }

        return output;
    });

    const menuClick = () => {};

    const refreshClick = () => {
        console.log('calendarTitle refreshClick', date);
        // TODO Implement db fetch items
    };
</script>

<div class="title-container">
<!-- <button onclick={onrefresh} title="Click to Refresh"> -->
    <h1 class="title">{title}</h1>
    <!-- <i class="ph-fill ph-arrows-clockwise" size={32}></i> -->
<!-- </button> -->
    <!-- <div class="flex align-center gap-[0.5rem]">
            <button type="button" onclick={menuClick}>
                <i class="ph ph-list"></i>
            </button> -->
            <button type="button" onclick={refreshClick}>
                <i class="ph ph-arrows-clockwise"></i>
            </button>
    <!-- </div> -->
</div>



<style>
    .title-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    /* h1 {
        border: 1px solid red;
        padding: 0.25rem;
    } */
    button {
        align-items: center;
        border: 0px solid var(--accent-light);
        /* border-radius: 50%; */
        border-radius: 0.5rem;
        cursor: pointer;
        /* padding: 0.625rem; */
        padding: 0.5rem;
        display: flex;
        font-size: 1.25rem;
        gap: 1rem;
        /* justify-content: space-between; */
        transition: var(--transition);
    }
    button:hover {
        box-shadow: var(--shadow-sm);
        background-color: var(--accent-light);
    }
    .title {
        font-size: 1.125rem;
        font-weight: 600;
        /* margin-bottom: 0.5rem; */
        /* border: 1px solid red; */
    }
</style>