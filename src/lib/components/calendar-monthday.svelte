<script>
    let {
        day = null,
        disabled = false
    } = $props();

    const isToday = $derived.by(() => {
        if (!day) {
            console.log('!day', 'isToday = false')
            return false;
        }

        let now = new Date();
        let output = day.date.toLocaleDateString('en-NZ') === now.toLocaleDateString('en-NZ');
        console.log(`isToday output = ${output}`);
        return output;
    });
</script>

<div class="slot{day && disabled === false ? '' : '-disabled'}">
    {#if day}
        <div class="slot-header {isToday ? 'today' : ''}">
            <div class="title">
                {day.date.getDate()}
            </div>

            {#if disabled === false}
                <button class="menu" title="Menu">
                    <i class="ph ph-gear-six"></i>
                </button>
            {/if}
        </div>

        <div class="slot-contents">
        </div>
    {/if}
</div>


<style>
    .slot,
    .slot-disabled {
        height: 10rem;
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
        position: relative;
        padding-top: 2.375rem;
    }
    .slot-header.today {
        background-color: var(--accent-light);
    }
    .title {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-weight: 500;
    }
    .menu {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        padding: 0.25rem 0.375rem 0.125rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: var(--transition);
    }
    .slot-header.today > .menu {
        background-color: white;
    }
    .menu i {
        font-size: 1.25rem;
    }
    .menu:hover {
        background-color: var(--border-lighter);
    }
    .slot-contents {
        border-top: 1px solid var(--border-lighter);
        background-color: white;
    }
</style>