<script>
    import { Check, Square, SquareCheckBig, SquareMinus } from "@lucide/svelte";
    import TableRow from "./table-row-staff.svelte";
    import { NZPhoneFormatter } from "$lib/modules/phone";
  import { supabase } from "$lib/supabaseClient";

    let {
        headers,
        rows,
    } = $props();

    // let sortedRows = sortByKey(rows, 'name');

    let tableRows = $state(rows);
    const toggleAll = (add) => {
        console.log('toggleAll', add === true);
        for (let i = 0, count = tableRows.length; i < count; i++) {
            tableRows[i].selected = (add === true);
        }
        tableRows = tableRows;
        console.log(`toggleAll (${add === true}) tableRows`, tableRows);
    };

    let selectedCount = $derived(tableRows.filter(d => d.selected === true).length);
    const toggleRows = () => {
        toggleAll(selectedCount < tableRows.length);
    };

    const deleteRows = async () => {
        if (confirm('Are you sure you want to delete the selected rows?') === false) { return; }

        let rowsToDelete = tableRows.filter(d => d.selected === true).map(d => d.id);
        const { data, error } = await supabase.from('kb_staff').delete().in('id', rowsToDelete);
        tableRows = tableRows.filter(d => rowsToDelete.indexOf(d.id) < 0);
    };
</script>

<div class="fl-table-controls">
    <div>
        <button type="button" onclick={() => toggleAll(true)}>Select all</button>
        <button type="button" onclick={() => toggleAll(false)}>Uncheck all</button>

        {#if selectedCount > 0}
            <button type="button" onclick={deleteRows}
                class="fl-btn-alert"
            >Delete {selectedCount} row{selectedCount === 1 ? '' : 's'}</button>
        {/if}
    </div>
    <div>
        <span class="found">Found {tableRows.length} records</span>
    </div>
</div>

<table class="fl-table" cellpadding="0" cellspacing="0">
    <thead class="fl-table-headers">
        <tr>
            <th class="fl-table-header fl-table-id"
                onclick={() => toggleAll(selectedCount < tableRows.length)}
            >
                {#if selectedCount === tableRows.length}
                    <SquareCheckBig size={20} />
                {:else if selectedCount === 0}
                    <Square size={20} />
                {:else}
                    <SquareMinus size={20} />
                {/if}
            </th>
            {#each headers as header}
                <th class="fl-table-header">{header.label}</th>
            {/each}
            <th class="fl-table-header"></th>
            <th class="fl-table-header"></th>
        </tr>
    </thead>
    <tbody class="fl-table-body">
        {#each tableRows as _, index (tableRows[index].id)}
            <TableRow bind:row={tableRows[index]} {headers} onedit={() => {}} />
        {/each}
    </tbody>
</table>

<style>
    .fl-table-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 0.875rem;
    }
    .fl-table-controls button {
        background-color: var(--light);
        border: 0;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.875rem;
        outline: none;
        padding: 0.5rem 1rem;
        margin-right: 0.25rem;
    }
    .fl-table {
        border: 1px solid var(--light);
        border-radius: 0.25rem;
        font-size: 0.875rem;
        width: 100%;
    }
    .fl-table-headers {
        padding: 0;
        /* background-color: var(--light); */
        /* display: grid;
        align-items: center; */
    }
    .fl-table-header {
        padding: 1rem;
        text-align: left;
    }
    .fl-table-header {
        background-color: var(--primary);
        color: var(--white);
        font-size: 1rem;
        font-weight: 500;
    }
    .fl-table-id {
        cursor: pointer;
    }
    :global(.fl-table-body > :nth-child(even)) {
        background-color: var(--lighter)
    }
    /* .fl-table-body > tr:hover > .fl-table-cell {
        background-color: var(--primary-lightest);
    } */
    .fl-btn-alert {
        background-color: var(--alert) !important;
        color: var(--white);
    }
</style>
