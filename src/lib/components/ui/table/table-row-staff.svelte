<script>
    import { Square, SquareCheckBig, Check, CalendarRange } from "@lucide/svelte";
    import { NZPhoneFormatter } from "$lib/components/global/formatters/phone";
    import Toggle from "../toggle.svelte";

    let {
        headers,
        row,
        onedit,
        ontoggle,
    } = $props();

    const narrowColumns = [ 'id', 'is_active' ];
    let isChecked = $state(false);
    let isActive = $derived(row.is_active);

    const editRow = () => {
        // alert(`row id = ${id}; checked = ${isChecked}`);
        onedit(row.id);
    };

    const toggleRow = () => {
        isChecked = !isChecked;
        ontoggle(row.id);
    }
</script>

<tr>
    <td class="fl-table-cell fl-cell-select fl-cell-narrow"
        class:fl-table-cell-selected={isChecked === true}
        onclick={toggleRow}
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
            class:fl-table-cell-name={header.id === 'name'}
            class:fl-cell-narrow={narrowColumns.indexOf(header.id) >= 0}
        >
            {#if header.id === 'is_active'}
                <Toggle />
            {:else if header.id === 'phone'}
                {NZPhoneFormatter(row[header.id])}
                <!-- {#if row[header.id] === true}
                    <Check size={20} />
                {:else}
                    &nbsp;
                {/if} -->
            {:else if header.id === 'name'}
                <span class="fl-name">{row.name}</span>
            {:else}
                {row[header.id]}
            {/if}
        </td>
    {/each}
    <td class="fl-table-cell fl-cell-narrow"
        class:fl-table-cell-selected={isChecked === true}
    >
        <button type="button" data-row-id={row.id}
            title="Schedule"
            class="fl-row-edit"
            onclick={() => onedit(row.id)}
        >
            <CalendarRange size={20} />
        </button>
    </td>
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
        /* cursor: pointer; */
        /* display: flex; */
        /* flex-direction: row; */
        padding: 1rem;
        text-align: left;
    }
    /* .fl-cell-select, */
    .fl-cell-narrow {
        /* display: flex;
        align-items: center;
        gap: 0.5rem; */
        white-space: nowrap;
        width: 1px;
    }
    .fl-cell-select {
        /* border: 1px solid red; */
        cursor: pointer;
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
    .fl-table-cell-name {
        display: grid;
    }
    .fl-name {
        /* font-size: 1rem; */
        font-weight: 500;
        letter-spacing: 0.25px;
    }
    .fl-row-edit {
        background-color: transparent;
        border: none;
        color: var(--primary);
        cursor: pointer;
        outline: none;
    }
</style>
