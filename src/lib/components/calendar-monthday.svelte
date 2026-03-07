<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createServicesData } from "$lib/data/services.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";

    let {
        day = null,
        disabled = false,
        onitemclick,
        onaddclick,
        onviewclick
    } = $props();

    let calendar = createCalendarData();
    let services = createServicesData();
    let settings = createSettingsData();

    const isToday = $derived.by(() => {
        if (!day) {
            console.log('!day', 'isToday = false')
            return false;
        }

        let now = new Date();
        let output = day.date.toLocaleDateString('en-NZ') === now.toLocaleDateString('en-NZ');
        // console.log(`isToday output = ${output}`);
        return output;
    });

    let items = $derived.by(() => {
        // console.log('* monthday > day', day);
        if (!day) { return []; }
        
        let dateString = settings.parseDate(day.date);
        let dayItems = calendar.items
            .map(d => {
                return { ...d, epoch: (new Date(d.slot)).getTime() }
            })
            .filter(d => d.slot.indexOf(dateString) === 0);
            // d.epoch >= (new Date()).getTime()
        dayItems.sort((a, b) => a.epoch - b.epoch);
        // console.log('* monthday > dayItems', dayItems);
        return dayItems;
    });

    let nextItem = $derived.by(() => {
        // let arr = items.filter(d => d.epoch >= (new Date()).getTime());
        let arr = items; //.filter(d => d.epoch >= (new Date()).getTime());
        console.log('* monthday > arr', arr);
        return arr.length > 0 ? arr[0] : null;
    });

    const showDay = () => {
        alert(`showDay slot = ${settings.parseDate(day.date)}`);
    };

    const showBooking = (id) => {
        console.log(`showBooking ${id}`);
        calendar.getItemById(id)
        onitemclick();
    };

    const showAdd = () => {
        console.log(`showAdd slot = ${settings.parseDate(day.date)}`);
        onaddclick();
    };

    const showMenu = () => {
        console.log(`showMenu slot = ${settings.parseDate(day.date)}`);
        onviewclick();
    };
</script>

<div class="slot{day && disabled === false ? '' : '-disabled'} {isToday ? 'today' : ''}">
    {#if day}
        <div class="slot-header">
            <div class="title">
                <span>{day.date.getDate()}</span>
                {#if items.length > 0}
                <i class="ph-fill ph-dot-outline"></i>
                {/if}
            </div>

            {#if disabled === false}
                <div class="controls">
                    <button class="add" title="Add" onclick={showAdd}>
                        <i class="ph ph-plus"></i>
                    </button>
                    <button class="menu" title="Menu" onclick={showMenu}>
                        <i class="ph ph-eye"></i>
                    </button>
                </div>
            {/if}
        </div>

        <div class="slot-contents">
            <div class="contents-container">
            {#if disabled === false}
                {#each items as item}
                    <button class="next" onclick={() => showBooking(item.id)}>
                        <span class="time">{calendar.getTimeFromSlot(item.slot)}</span>
                        <div class="service">{services.getServiceName(item.service)}</div>
                        {#if item.customer}
                            <div class="customer">{item.customer}</div>
                        {/if}
                    </button>
                {/each}
            {/if}
            </div>
        </div>
    {/if}
</div>


<style>
    .slot,
    .slot-disabled {
        border: 2px solid transparent;
        height: 12rem;
        min-height: 12rem;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 0.5rem;
    }
    .slot-disabled {
        background-color: var(--lightest);
        cursor: not-allowed;
    }
    .slot,
    .slot-disabled {
        border-bottom: 1px solid var(--border);
    }
    .slot:not(:last-child),
    .slot-disabled:not(:last-child) {
        border-right: 1px solid var(--border);
    }
    .slot-header {
        /* position: relative; */
        padding: 0.25rem 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* .slot-header.today {
        background-color: var(--accent-light);
    } */
    .title {
        /* position: absolute; */
        /* top: 0.5rem;
        left: 0.5rem; */
        font-size: 1.25rem;
        font-weight: 500;
    }
    .title i {
        color: var(--accent);
    }
    .controls {
        display: flex;
        /* grid-template-columns: 1fr auto; */
        align-items: center;
        gap: 0.5rem;
        /* margin: 0.25rem 0.25rem 0.125rem; */
    }
    .controls > button {
        /* position: absolute; */
        /* top: 0.25rem;
        right: 0.25rem; */
        background-color: white;
        padding: 0.25rem 0.375rem 0.125rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        font-size: 1rem;
        transition: var(--transition);
    }
    .controls > button:hover {
        box-shadow: var(--shadow-sm);
        /* background-color: var(--accent-lighter); */
    }
    /* .slot-header.today > .menu {
        background-color: white;
    } */
    /* .menu i {
        font-size: 1.25rem;
    } */
    .slot-contents {
        /* border-top: 1px solid var(--border-lighter); */
        background-color: white;
        display: grid;
        gap: 0.25rem;
        overflow-y: auto;
        margin-bottom: 0.5rem;
    }
    .slot-contents button {
        cursor: pointer;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        transition: var(--transition);
    }
    .slot-contents .summary {
        /* border: 1px solid red; */
        background-color: var(--border-lighter);
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--medium);
        font-size: 0.75rem;
    }
    .slot-contents .summary > .count {
        color: var(--darker);
        font-size: 1rem;
        font-weight: 600;
    }
    .slot-contents > .contents-container {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        /* height: 30rem; */
        /* margin-bottom: 0.5rem; */
    }
    .slot-disabled > .slot-contents > .contents-container {
        background-color: var(--border-lighter);
    }
    .slot-contents .add {
        border: 0;
    }
    .slot-contents .add:hover {
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
    }
    .slot-contents .next {
        margin: 0 0.25rem 0.375rem;
        padding: 0.25rem 0.5rem 0.375rem;
        display: grid;
        background-color: var(--accent-lightest);
        border-left: 3px solid var(--accent-lighter);
        border-radius: 0.5rem;
        color: var(--medium);
        font-size: 0.75rem;
        text-align: left;
        overflow-x: hidden;
    }
    .next > div:not(:first-child) {
        padding-left: 0.75rem;
    }
    .next > .time {
        color: var(--dark);
        font-size: 0.875rem;
    }
    .next > .service {
        color: var(--dark);
        font-weight: 600;
    }
    .slot.today {
        border: 2px solid var(--accent);
    }
</style>