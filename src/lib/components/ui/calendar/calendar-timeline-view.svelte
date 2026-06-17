<script>
    import { Check, Eye, EyeClosed } from "@lucide/svelte";
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

    const sortByKey = (list, key) => {
        if (key) {
            list.sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (b[key] < a[key]) return 1;
                return 0;
            });
        }
        else {
            list.sort((a, b) => {
                if (a < b) return -1;
                if (b < a) return 1;
                return 0;
            });
        }

        list = list;
        return list;
    };

    let allStaff = $state([
        { id: 1, name: 'John', initials: 'JF' },
        { id: 2, name: 'Apple', initials: 'AV' },
        { id: 3, name: 'Marlong2', initials: 'MV' },
        { id: 4, name: 'Marlong', initials: 'MV' },
    ]);
    allStaff = allStaff.map(d => {
        return {
            ...d, checked: true
        };
    })
    allStaff = sortByKey(allStaff, 'name');

    let timelineStaff = $derived(sortByKey(allStaff.filter(d => d.checked === true), 'name'));

    const updateTimelineStaff = (id) => {
        let staff = allStaff.find(d => d.id === id);
        let index = timelineStaff.findIndex(d => d.id === id);

        if (index >= 0) {
            timelineStaff.splice(index, 1);
            timelineStaff = sortByKey(timelineStaff, 'name');
            return;
        }

        timelineStaff.push(staff);
        timelineStaff = sortByKey(timelineStaff, 'name');
    }
</script>

<div class="fl-cal-timeline">
    <!-- <Sidebar root="/setup" items={sidebarItems} onselect={updateSetup} /> -->
    <div class="fl-sidebar">
        <div class="fl-staff-list">
            {#each allStaff as staff}
            <div class="fl-staff-toggle">
                <input type="checkbox" name="staff-{staff.id}" id="staff-{staff.id}"
                    bind:checked={staff.checked}
                    onchange={() => updateTimelineStaff(staff.id)}>
                <label for="staff-{staff.id}" class="flex-center between">
                    <span>{staff.name}</span>
                    {#if staff.checked}
                    <Eye size={16} />
                    {:else}
                    <EyeClosed size={16} />
                    {/if}
                </label>
            </div>
            {/each}
        </div>
    </div>

    <div class="fl-content fl-page">
        <div class="fl-timeline-header">
            <div class="fl-timeline-corner"></div>
            <div class="fl-timeline-staff" style="grid-template-columns: repeat({timelineStaff.length}, 1fr);">
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
                    <div class="fl-timeline-slot" class:fl-slot-hour-start={slot.hourStart === true} style="grid-template-columns: repeat({timelineStaff.length}, 1fr);">
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
        display: grid;
    }
    .fl-timeline-row.fl-slot-hour-start {
        border-top: 1px solid var(--accent-border);
    }
    .fl-timeline-slot.fl-slot-hour-start {
        border-top: none;
    }
    .fl-staff-slot {
        /* background-color: red; */
        border-left: 1px solid var(--accent-border);
    }
    .fl-staff-list {
        /* border: 1px solid red; */
        display: grid;
        gap: 0.5rem;
    }
    .fl-staff-toggle {
        position: relative;
        /* border: 1px solid red; */
    }
    .fl-staff-toggle input[type=checkbox] {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }
    .fl-staff-toggle label {
        padding: 0.5rem 0.75rem;
        background-color: var(--border-light);
        /* border: 1.5px solid var(--border-light); */
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 100ms ease-in-out;
    }
    .fl-staff-toggle label:hover {
        /* background-color: var(--accent-border); */
        /* border: 1.5px solid var(--accent-border); */
        box-shadow: var(--shadow);
    }
    .fl-staff-toggle input[type=checkbox]:checked + label {
        background-color: var(--accent-border);
        /* border-color: var(--accent); */
    }
</style>
