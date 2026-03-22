<script>
    import { createCalendarData } from "$lib/data/calendar.svelte";
    import { createSettingsData } from "$lib/data/settings.svelte";

    let {
        onclose,
        onsave
    } = $props();

    const calendar = createCalendarData();
    const settings = createSettingsData();

    let hasNewRow = $state(false);
    let newBlock = $state(null);

    let blocks = $derived.by(() => {
        return calendar.blocks.map(d => {
            return {
                ...d,
                allday: true
            };
        });
    });

    const addRow = () => {
        let now = new Date();
        newBlock = {
            id: now.getTime(),
            date: settings.parseDate(now),
            allday: true
        };
        // calendar.blocks.push(newBlock);
        hasNewRow = true;
    };

    const closeForm = () => {
        onclose();
    };

    const saveBlock = () => {
        if (hasNewRow === false) { return; }

        // newBlock = calendar.blocks.find(b => !!b.id === false);
        if (!newBlock) { return; }
        console.log('newBlock', newBlock);

        let now = new Date(settings.parseDate(new Date()));
        let blockDate = new Date(newBlock.date);
        if (blockDate < now) {
            alert('Please select a future date.');
            return;
        }

        // let validate = false;
        let sameDates = calendar.blocks.filter(b => b.date === newBlock.date && b.id);
        console.log('sameDates', sameDates);
        if (newBlock.allday && sameDates.length > 0) {
            alert('You already have one or more blocks for the same date. Click OK to return.');
            // hasNewRow = false;
            return;
        }
        else {
            // check each block on the same date
        }
        
        calendar.blocks.push(newBlock);
        hasNewRow = false;
        alert('Successfully added new calendar block!');
    };

    const toggleAllDay = (id) => {
        // let selectedBlock = {};
        let block = null;
        if (id === newBlock.id) {
            block = newBlock;
        }
        else {
            block = calendar.blocks.find(b => b.id === id);
            if (!block) { return; }
        }

        block.allday = !block.allday;
        if (block.allday !== true) {
            block.start = settings.parseStringAsTime(settings.startShift);
            block.end = settings.parseStringAsTime(settings.endShift);
        }
    };
</script>

<div class="dlg-container">
    <div class="dlg-header">
        <div class="dlg-title">
                <span>Closed Dates</span>
            <button class="dlg-close" onclick={closeForm}>
                Close
            </button>
        </div>
        <span class="dlg-desc">Manage your closed dates/times here</span>
    </div>
    <!-- <div class="dlg-contents"> -->
        <!-- <div class="blocks-header">
            <div>Date</div>
            <div>Times</div>
            <div>&nbsp;</div>
        </div> -->
    <table class="tbl-contents">
        <thead>
            <tr>
                <th class="col-date">Date</th>
                <th class="col-time">Times</th>
                <th class="col-actions">All Day</th>
            </tr>
        </thead>
        <tbody>
            {#each calendar.blocks as block}
                <tr class={block.id ? '' : 'row-new'}>
                    <td>
                        <input type="date" value={block.date}>
                    </td>
                    <td>
                        {#if block.allday === true}
                            <span>All day</span>
                        {:else}
                            <input type="time" value={block.start}>
                            <input type="time" value={block.end}>
                        {/if}
                    </td>
                    <td class="actions">
                        <button class="btn btn-allday" onclick={() => toggleAllDay(block.id)}>
                            <i class="ph ph-{block.allday === true ? 'check' : 'timer'}"></i>
                        </button>
                        <button class="btn btn-delete">
                            <i class="ph ph-trash"></i>
                        </button>
                    </td>
                </tr>
            {/each}
            {#if hasNewRow === true && newBlock}
                <tr class="row-new">
                    <td>
                        <input type="date" value={newBlock.date}>
                    </td>
                    <td>
                        {#if newBlock.allday === true}
                            <span>All day</span>
                        {:else}
                            <input type="time" value={newBlock.start}>
                            <input type="time" value={newBlock.end}>
                        {/if}
                    </td>
                    <td class="actions">
                        <button class="btn btn-allday" onclick={() => toggleAllDay(newBlock.id)}>
                            <i class="ph ph-{newBlock.allday === true ? 'check' : 'timer'}"></i>
                        </button>
                        <button class="btn btn-delete">
                            <i class="ph ph-trash"></i>
                        </button>
                    </td>
                </tr>
            {/if}
            <tr>
                <td class="row-add" colspan="3">
                    {#if hasNewRow === true}
                        <button type="button" class="btn btn-save" onclick={saveBlock}>
                            <i class="ph ph-floppy-disk"></i>
                            Save
                        </button>
                    {:else}
                        <button type="button" class="btn" onclick={addRow}>
                            <i class="ph ph-plus"></i>
                            Add block
                        </button>
                    {/if}
                </td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    .dlg-container {
        padding: 1rem 1.5rem 1.5rem;
        /* border: 1px solid var(--border-light); */
        border-radius: 0.5rem;
        outline: 0;
        width: 100%;
    }
    .dlg-header {
        display: grid;
        gap: 0rem;
        margin-bottom: 1rem;
    }
    .dlg-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .dlg-title > span {
        font-size: 1rem;
        font-weight: 600;
    }
    .dlg-close {
        border: 1px solid var(--border-light);
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
    .dlg-close:hover {
        box-shadow: var(--shadow-sm);
    }
    .dlg-desc {
        color: var(--medium);
    }

    .tbl-contents {
        width: 100%;
        border: 0;
        font-size: 0.875rem;
    }
    .tbl-contents thead {
        margin-bottom: 0.125rem;
    }
    .tbl-contents thead th {
        border-bottom: 1px solid var(--border-light);
        font-weight: 500;
        padding: 0.25rem;
        text-align: left;
    }
    .tbl-contents tbody td {
        padding: 0.25rem;
    }
    .tbl-contents tbody .row-new > td {
        background-color: var(--accent-lightest);
    }
    .tbl-contents input[type=date],
    .tbl-contents input[type=time] {
        font-size: 0.875rem;
    }
    .tbl-contents .col-date {
        width: 35%;
    }
    .tbl-contents .col-time {
        width: 48%;
    }
    




    .dlg-contents {
        display: grid;
        gap: 0.25rem;
    }
    .dlg-contents > div {
        display: grid;
        grid-template-columns: 1fr 2fr auto;
        width: 100%;
    }
    .dlg-contents > div > * {
        border: 1px solid var(--border-light);
    }
    .blocks-header {
        display: grid;
        /* grid-template-columns: 10rem 2fr auto; */
        border-bottom: 1px solid var(--border-light);
    }
    .blocks-header > * {
        /* border-left: 1px solid var(--border-light); */
        font-weight: 700;
    }
    .blocks-row,
    .row-date,
    .row-actions {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        align-items: center;
    }
    .row-date {
        gap: 0.5rem;
    }
    input[type=date],
    input[type=time] {
        border: 1px solid var(--border-light);
        border-radius: 0.375rem;
        padding: 0.375rem 0.75rem;
        /* width: 100%; */
    }
    /* input[type=date] {
        width: 60%;
    } */
    /* input[type=time] {
        width: 40%;
    } */
    .tbl-contents .actions,
    .row-actions {
        /* display: flex;
        align-items: center;
        justify-content: space-between; */
        padding-top: 0.25rem;
        /* gap: 0.5rem; */
        /* vertical-align: middle; */
        /* border: 1px solid red; */
    }
    /* .row-actions > * { */
        /* border: 1px solid red; */
    /* } */
    .tbl-contents .btn,
    .row-actions > button {
        font-size: 1rem;
        padding: 0.125rem 0.375rem;
        /* background-color: aliceblue; */
        /* border: 1px solid var(--lightest); */
        border: 0px solid transparent;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        /* box-shadow: var(--shadow-sm); */
        transition: var(--transition);
    }
    .tbl-contents .actions > .btn {
        box-shadow: none;
        margin-left: 0.5rem;
    }
    .tbl-contents .btn:hover,
    .row-actions > button:hover {
        background-color: var(--accent-light);
        box-shadow: var(--shadow-sm);
    }
    .tbl-contents .row-add {
        padding-top: 0.5rem;
        text-align: center;
    }
    .tbl-contents .row-add > button {
        font-size: 0.875rem !important;
        padding: 0.375rem 0.75rem;
        /* background-color: aliceblue; */
        /* border: 1px solid var(--lightest); */
        border: 0px solid transparent;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        /* box-shadow: var(--shadow-sm); */
        transition: var(--transition);
    }
    .btn-save {
        margin-left: 1rem;
    }
</style>