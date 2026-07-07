<script>
    import { Check, Square, SquareCheckBig, SquareMinus } from "@lucide/svelte";
    import TableRow from "./table-row-staff.svelte";
    import { NZPhoneFormatter } from "$lib/components/global/formatters/phone";

    let {
        headers,
        rows,
    } = $props();

    // let sortedRows = sortByKey(rows, 'name');

    const editRow = (rowId) => {
        // alert(`edit rowId = ${rowId}`);
    };

    const toggleRow = (rowId) => {
        // alert(`toggle rowId = ${rowId}`);
    };

    let checkedRows = $state([]);
</script>

<div class="fl-table-controls">
    <div>
        <button type="button">Select All</button>
        <button type="button">Uncheck All</button>
    </div>
    <div>
        <span class="found">Found {rows.length} records</span>
    </div>
</div>

<table class="fl-table" cellpadding="0" cellspacing="0">
    <thead class="fl-table-headers">
        <tr>
            <th class="fl-table-header fl-table-id">
                <!-- <SquareCheckBig size={20} /> -->
            </th>
            {#each headers as header}
                <th class="fl-table-header">{header.label}</th>
            {/each}
            <th class="fl-table-header"></th>
            <th class="fl-table-header"></th>
        </tr>
    </thead>
    <tbody class="fl-table-body">
        {#each rows as row}
            <TableRow {row} {headers} onedit={editRow} ontoggle={toggleRow} />
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
        font-weight: 500;
    }
    :global(.fl-table-body > :nth-child(even)) {
        background-color: var(--lighter)
    }
    /* .fl-table-body > tr:hover > .fl-table-cell {
        background-color: var(--primary-lightest);
    } */
</style>
