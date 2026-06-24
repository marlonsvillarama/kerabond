<script>
    let {
        name = '',
        slot = '',
        staff = '',
        onclick
    } = $props();
    // console.log('data slot', slot);

    let slotDisplay = $derived.by(() => {
        let hour = slot ? parseInt(slot.slice(0, 2)) : '';
        let mins = slot.slice(2);
        let am_pm = hour >= 12 ? 'pm' : 'am';

        return `${hour > 12 ? hour - 12 : hour}:${mins} ${am_pm}`;
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fl-cell-data flex-center between" {onclick}>
    <span class="staff">{staff}</span>
    <span class="name">{name}</span>
    <span class="time">{slotDisplay}</span>
</div>

<style>
    .fl-cell-data {
        /* border: 1px solid red; */
        background-color: var(--border-light);
        border-radius: 0.125rem;
        cursor: pointer;
        display: grid;
        grid-template-columns: auto 1fr 35%;
        font-size: 0.75rem;
        margin: 0.25rem;
        transition: all 100ms ease-in-out;
        z-index: 2;
    }
    /* .fl-cell-data:hover {
        box-shadow: var(--shadow);
    } */
    .fl-cell-data:not(:last-of-type) {
        margin-bottom: 0.25rem;
    }
    /* .fl-cell-data:hover {
        background-color: var(--accent-pale);
    } */
    .fl-cell-data > .staff {
        text-align: center;
        background-color: var(--accent-pale);
        border-radius: 0.125rem;
        font-weight: 600;
        margin-right: 0.375rem;
        min-width: 1.5rem;
        padding: 0.375rem 0.375rem;
    }
    .fl-cell-data > .name {
        opacity: 0.7;
        /* max-width: 60%; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /* border: 1px solid red; */
        /* font-weight: 600; */
    }
    .fl-cell-data > .time {
        font-weight: 600;
        text-align: right;
        padding-right: 0.375rem;
    }
</style>
