<script>
    let {
        name = '',
        slot = '',
        // onclick
    } = $props();
    // console.log('data slot', slot);

    let slotDisplay = $derived.by(() => {
        let hour = slot ? parseInt(slot.slice(0, 2)) : '';
        let mins = slot.slice(2);
        let am_pm = hour >= 12 ? 'pm' : 'am';

        return `${hour > 12 ? hour - 12 : hour}:${mins} ${am_pm}`;
    });
</script>

<div class="fl-cell-data flex-center between">
    <span class="name">{name}</span>
    <span class="time">{slotDisplay}</span>
</div>

<style>
    .fl-cell-data {
        /* border: 1px solid red; */
        background-color: var(--border-light);
        border-radius: 0.125rem;
        cursor: pointer;
        font-size: 0.75rem;
        padding: 0.375rem 0.375rem;
        transition: all 100ms ease-in-out;
    }
    /* .fl-cell-data:hover {
        background-color: var(--accent-pale);
    } */
    .fl-cell-data > .name {
        opacity: 0.7;
        /* font-weight: 600; */
    }
    .fl-cell-data > .time {
        font-weight: 600;
    }
</style>
