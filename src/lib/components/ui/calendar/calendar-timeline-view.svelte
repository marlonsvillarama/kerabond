<script>
    const interval = 15;
    const startHour = 8;
    const endHour = 21;
    
    let timeSlots = $derived.by(() => {
        let output = [];
        let now = new Date();
        let dt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour);

        let i = 0;
        do {
            output.push({
                id: `${dt.getHours().toString().padStart(2, '0')}${dt.getMinutes().toString().padStart(2, '0')}`,
                slot: dt.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true }),
                hourStart: dt.getMinutes() === 0
            });
            dt.setMinutes(dt.getMinutes() + interval);
            dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes());
            i++;
        } while (dt.getHours() < endHour);

        return output;
    });

    let timelineStaff = [
        { id: 1, name: 'John', initials: 'JF' },
        { id: 2, name: 'Apple', initials: 'AV' },
        { id: 3, name: 'Marlong', initials: 'MV' },
    ];

    // let timelineHeaders = $state();
    // let timelineHeaders = document.getElementById('timelineHeaders');
    // console.log('timelineHeaders', timelineHeaders);
    // timelineHeaders.style.setProperty('--staff-columns', timelineStaff.length);
</script>

<div class="fl-cal-timeline">
    <!-- <Sidebar root="/setup" items={sidebarItems} onselect={updateSetup} /> -->
    <div class="fl-sidebar">
        timeline sidebar
    </div>

    <div class="fl-content fl-page">
        <div class="fl-timeline-header">
            <div class="fl-timeline-corner"></div>
            <div class="fl-timeline-staff">
                {#each timelineStaff as staff}
                    <div class="fl-timeline-staff-header">
                        <div class="fl-staff-avatar">{staff.initials}</div>
                        {staff.name}
                    </div>
                {/each}
            </div>
        </div>

        <div class="fl-timeline-grid fl-full-scrollable">
            {#each timeSlots as slot}
                <div class="fl-timeline-row" class:fl-slot-hour-start={slot.hourStart === true}>
                    <div class="fl-timeline-slot-header">
                        {#if slot.hourStart}
                        <span>{slot.slot}</span>
                        {/if}
                    </div>
                    <div class="fl-timeline-slot" class:fl-slot-hour-start={slot.hourStart === true}>
                        {#each timelineStaff as staff}
                            <div class="fl-staff-slot"></div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .fl-cal-timeline {
        background-color: var(--white);
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        margin: 1rem;
        margin-top: 0;
        overflow-y: auto;
    }
    .fl-sidebar {
        width: 13rem;
        padding: 0.5rem;
    }
    :global(.fl-sidebar > *) {
        flex: 1;
        width: 100%;
    }
    :global(.fl-sidebar > *:not(:last-child)) {
        margin-bottom: 0.5rem;
    }
    .fl-cal-timeline > .fl-page {
        border-left: 1px solid var(--border);
        flex: 1;
        display: grid;
        grid-template-rows: auto 1fr;
        overflow-y: auto;
    }
    .fl-timeline-header {
        display: grid;
        grid-template-columns: auto 1fr;
    }
    .fl-timeline-staff {
        --staff-columns: 3;
        display: grid;
        grid-template-columns: repeat(var(--staff-columns), 1fr);
        border-bottom: 3px solid var(--accent-border);
    }
    .fl-timeline-staff-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid var(--accent-border);
    }
    .fl-timeline-row {
        display: flex;
    }
    .fl-timeline-corner,
    .fl-timeline-slot-header {
        width: 6rem;
    }
    .fl-timeline-corner {
        background-color: var(--border);
        border-bottom: 3px solid var(--accent-border);
    }
    .fl-timeline-slot-header > span {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0 0.5rem;
        text-align: center;
    }
    .fl-timeline-slot {
        flex: 1;
        border-top: 1px solid var(--border-light);
        height: 1.5rem;
        --staff-columns: 3;
        display: grid;
        grid-template-columns: repeat(var(--staff-columns), 1fr);
    }
    .fl-timeline-row.fl-slot-hour-start {
        border-top: 1px solid var(--accent-border);
    }
    .fl-timeline-slot.fl-slot-hour-start {
        border-top: none;
    }
    .fl-staff-slot {
        border-left: 1px solid var(--accent-border);
    }
</style>
