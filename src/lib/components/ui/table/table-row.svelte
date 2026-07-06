<script>
    import { Square, SquareCheckBig, Check } from "@lucide/svelte";
    import { NZPhoneFormatter } from "$lib/components/global/formatters/phone";
    import Toggle from "../toggle.svelte";

    let {
        headers,
        row,
        onedit
    } = $props();

    const narrowColumns = [ 'id', 'active' ];
    let isChecked = $state(false);
    let isActive = $derived(row.is_active);

    const editRow = (id) => {
        // alert(`row id = ${id}; checked = ${isChecked}`);
        onedit(id);
    };
</script>

<tr>
    <td class="fl-table-cell fl-cell-select fl-cell-narrow"
        class:fl-table-cell-selected={isChecked === true}
        onclick={() => isChecked = !isChecked}
    >
        <input type="checkbox" data-row-id={row.id} bind:checked={isChecked}>
        {#if isChecked === true}
            <SquareCheckBig size={20} />
        {:else}
            <Square size={20} />
        {/if}
    </td>
    {#each headers as header}
        <td class="fl-table-cell"
            class:fl-table-cell-selected={isChecked === true}
            class:fl-cell-narrow={narrowColumns.indexOf(header.id) >= 0}
        >
            {#if header.id === 'phone'}
                {NZPhoneFormatter(row[header.id])}
            {:else if header.id === 'is_active'}
                <Toggle />
                <!-- {#if row[header.id] === true}
                    <Check size={20} />
                {:else}
                    &nbsp;
                {/if} -->
            {:else}
                {row[header.id]}
            {/if}
        </td>
    {/each}
    <td class="fl-table-cell fl-cell-narrow"
        class:fl-table-cell-selected={isChecked === true}
    >
        <button type="button" data-row-id={row.id}
            class="fl-row-edit"
            onclick={() => onedit(row.id)}
        >Edit</button>
    </td>
</tr>

<style>
    .fl-table-cell {
        cursor: pointer;
        padding: 0.75rem 0.625rem;
        text-align: left;
    }
    /* .fl-cell-select, */
    .fl-cell-narrow {
        white-space: nowrap;
        width: 1px;
    }
    .fl-cell-select {
        /* border: 1px solid red; */
        position: relative;
    }
    .fl-cell-select input[type=checkbox] {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }
    .fl-table-cell-selected {
        background-color: var(--primary-lightest);
    }
    .fl-row-edit {
        background-color: transparent;
        border: none;
        color: var(--primary);
        cursor: pointer;
        outline: none;
    }
</style>
